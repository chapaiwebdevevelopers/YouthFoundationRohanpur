'use client'
import { format } from "date-fns";
import {
      CalendarIcon,
      ChevronDownIcon,
      CircleCheckIcon,
      CircleIcon,
      FileTextIcon,
      ImageIcon,
      MapPinIcon,
      TagIcon,
      TypeIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
      Card,
      CardContent,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
} from "@/components/ui/card";
import {
      Field,
      FieldGroup,
      FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
      Popover,
      PopoverContent,
      PopoverTrigger,
} from "@/components/ui/popover";
import {
      Select,
      SelectContent,
      SelectGroup,
      SelectItem,
      SelectTrigger,
      SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";


const EventLiveCard = ({form}) => {
          const updateField =
            (key: keyof typeof form) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                  const value = e.target.value;
                  setForm((current) => ({ ...current, [key]: value }));
            };
    return (
                               <aside className="space-y-4 lg:sticky lg:top-6">
                              <div className="space-y-3">
                                    <h2 className="text-sm font-medium">Live preview</h2>

                                    <Card className="overflow-hidden [--card-spacing:1rem]">
                                          <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                                                {form.thumbnail ? (
                                                      <div
                                                            role="img"
                                                            aria-label="Event thumbnail preview"
                                                            className="h-full w-full bg-cover bg-center"
                                                            style={{
                                                                  backgroundImage: `url("${form.thumbnail}")`,
                                                            }}
                                                      />
                                                ) : (
                                                      <div className="flex h-full items-center justify-center text-muted-foreground">
                                                            <ImageIcon className="size-8" />
                                                      </div>
                                                )}
                                                <Badge
                                                      variant="secondary"
                                                      className="absolute top-3 left-3"
                                                >
                                                      {categoryLabel ?? "Category"}
                                                </Badge>
                                          </div>

                                          <CardHeader>
                                                <CardTitle className="line-clamp-2 text-lg">
                                                      {form.title || "Your event title"}
                                                </CardTitle>
                                                <CardDescription className="flex flex-col gap-1.5 pt-1">
                                                      <span className="flex items-center gap-1.5">
                                                            <CalendarIcon className="size-3.5" />
                                                            {date ? format(date, "PPP") : "Date not set"}
                                                      </span>
                                                      <span className="flex items-center gap-1.5">
                                                            <MapPinIcon className="size-3.5 shrink-0" />
                                                            <span className="line-clamp-1">
                                                                  {form.location || "Location not set"}
                                                            </span>
                                                      </span>
                                                </CardDescription>
                                          </CardHeader>

                                          {form.description && (
                                                <CardContent>
                                                      <p className="line-clamp-3 text-sm text-muted-foreground">
                                                            {form.description}
                                                      </p>
                                                </CardContent>
                                          )}
                                    </Card>
                              </div>

                              <Card className="[--card-spacing:1.25rem]">
                                    <CardHeader>
                                          <CardTitle className="text-sm">Ready to publish?</CardTitle>
                                          <CardDescription>
                                                {completed} of {checklist.length} details completed.
                                          </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                                                <div
                                                      className="h-full rounded-full bg-primary transition-all"
                                                      style={{
                                                            width: `${(completed / checklist.length) * 100}%`,
                                                      }}
                                                />
                                          </div>
                                          <ul className="space-y-2">
                                                {checklist.map((item) => (
                                                      <li
                                                            key={item.label}
                                                            className="flex items-center gap-2 text-sm"
                                                      >
                                                            {item.done ? (
                                                                  <CircleCheckIcon className="size-4 text-primary" />
                                                            ) : (
                                                                  <CircleIcon className="size-4 text-muted-foreground/50" />
                                                            )}
                                                            <span
                                                                  className={
                                                                        item.done
                                                                              ? "text-foreground"
                                                                              : "text-muted-foreground"
                                                                  }
                                                            >
                                                                  {item.label}
                                                            </span>
                                                      </li>
                                                ))}
                                          </ul>
                                    </CardContent>
                              </Card>
                        </aside>
    );
};

export default EventLiveCard;