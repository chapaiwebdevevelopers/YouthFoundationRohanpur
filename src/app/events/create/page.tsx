'use client'
import * as React from "react";
import { redirect, useRouter } from "next/navigation";
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

import {
      Breadcrumb,
      BreadcrumbItem,
      BreadcrumbLink,
      BreadcrumbList,
      BreadcrumbPage,
      BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
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
import { authClient } from "@/lib/auth-client";
import { projectEntrypointsSubscribe } from "next/dist/build/swc/generated-native";
import { toast } from "@/components/ui/toast";
import { refresh } from "next/cache";



const eventCategories = [
  { label: "Food Distribution", value: "food-distribution" },
  { label: "Poor & Needy Support", value: "poor-needy-support" },
  { label: "Zakat & Sadaqah", value: "zakat-sadaqah" },
  { label: "Islamic Education", value: "islamic-education" },
  { label: "Orphan Support", value: "orphan-support" },
  { label: "Medical & Healthcare Aid", value: "medical-healthcare-aid" },
  { label: "Ramadan & Iftar Distribution", value: "ramadan-iftar" },
  { label: "Winter Clothing Distribution", value: "winter-clothing" },
  { label: "Qurbani Meat Distribution", value: "qurbani-meat-distribution" },
  { label: "Mosque & Madrasa Support", value: "mosque-madrasa-support" },
  { label: "Islamic Awareness Programs", value: "islamic-awareness" },
  { label: "Community Welfare", value: "community-welfare" },
  { label: "Emergency Relief", value: "emergency-relief" },
  { label: "Marriage & Family Support", value: "marriage-family-support" },
  { label: "Fundraising & Donations", value: "fundraising-donations" },
  { label: "Other", value: "other" },
];

export  default  function  CreateEventPage() {
      const [date, setDate] = React.useState<Date>();
      const [form, setForm] = React.useState({
            title: "",
            category: "",
            location: "",
            thumbnail: "",
            description: "",
      });

      const updateField =
            (key: keyof typeof form) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                  const value = e.target.value;
                  setForm((current) => ({ ...current, [key]: value }));
            };

      const categoryLabel = eventCategories.find(
            (category) => category.value === form.category
      )?.label;

      const checklist = [
            { label: "Event title added", done: form.title.trim().length > 0 },
            { label: "Date selected", done: Boolean(date) },
            { label: "Category chosen", done: form.category.length > 0 },
            { label: "Location added", done: form.location.trim().length > 0 },
            { label: "Thumbnail added", done: form.thumbnail.trim().length > 0 },
      ];
      const completed = checklist.filter((item) => item.done).length;

      const handleSubmitEvents =async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const eventData = new FormData(e.currentTarget);
            const data = Object.fromEntries(eventData.entries());
            console.log("Event Data before Submitting:", data);
            
       const { data: session } = await authClient.getSession()
       const userId = session?.user?.id; // Assuming the user ID is stored in the session object
       const userEmail = session?.user?.email // Assuming the user ID is stored in the session object
      console.log("Session Data:", userId);
      const eventDataWithUserId = { ...data, userEmail,userId,date}; // Add the user ID to the event data

            const response = await fetch(`http://localhost:8000/events`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventDataWithUserId)
                
                
            })
            console.log("Event Data after Submitting:", response)
            if(response.ok){
                  
                  toast.add({
                    title: "Event created successfully!",
                    description: ` event Date : ${date} at ${data.location}`,
                  });
                  redirect(`/events`);
            }else{
                  alert("Failed to create event.");
            }
        }
        
      return (
            <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
                  <Breadcrumb>
                        <BreadcrumbList>
                              <BreadcrumbItem>
                                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                              </BreadcrumbItem>
                              <BreadcrumbSeparator />
                              <BreadcrumbItem>
                                    <BreadcrumbLink href="/events">Events</BreadcrumbLink>
                              </BreadcrumbItem>
                              <BreadcrumbSeparator />
                              <BreadcrumbItem>
                                    <BreadcrumbPage>Create</BreadcrumbPage>
                              </BreadcrumbItem>
                        </BreadcrumbList>
                  </Breadcrumb>

                  <header className="mt-6">
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                              Create a Charity Event
                        </h1>
                  </header>

                  <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
                        <Card className="[--card-spacing:1.5rem]">
                              <CardContent>
                                    <form id="create-event-form" onSubmit={handleSubmitEvents}>
                                          <FieldGroup>
                                                <Field>
                                                      <FieldLabel htmlFor="event-title">
                                                            <TypeIcon className="size-4 text-muted-foreground" />
                                                            Event Title *
                                                      </FieldLabel>
                                                      <Input
                                                            id="event-title"
                                                            name="title"
                                                            value={form.title}
                                                            onChange={updateField("title")}
                                                            placeholder="Ramadan Food Distribution for Needy Families"
                                                            required
                                                      />
                                                </Field>

                                                <div className="grid gap-4 sm:grid-cols-2">
                                                      <Field>
                                                            <FieldLabel htmlFor="event-date">
                                                                  <CalendarIcon className="size-4 text-muted-foreground" />
                                                                  Event Date *
                                                            </FieldLabel>
                                                            <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            data-empty={!date}
            className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
          />
        }
      >
        <CalendarIcon />
        {date ? format(date, "PPP") : <span>Pick a date</span>}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
                                                      </Field>

                                                      <Field>
                                                            <FieldLabel htmlFor="event-category">
                                                                  <TagIcon className="size-4 text-muted-foreground" />
                                                                  Event Category *
                                                            </FieldLabel>
                                                            <Select
                                                                  id="event-category"
                                                                  name="category"
                                                                  items={eventCategories}
                                                                  value={form.category || null}
                                                                  onValueChange={(value) =>
                                                                        setForm((current) => ({
                                                                              ...current,
                                                                              category: value ?? "",
                                                                        }))
                                                                  }
                                                                  required
                                                            >
                                                                  <SelectTrigger className="w-full">
                                                                        <SelectValue placeholder="Select a category" />
                                                                  </SelectTrigger>
                                                                  <SelectContent>
                                                                        <SelectGroup>
                                                                              {eventCategories.map((category) => (
                                                                                    <SelectItem
                                                                                          key={category.value}
                                                                                          value={category.value}
                                                                                    >
                                                                                          {category.label}
                                                                                    </SelectItem>
                                                                              ))}
                                                                        </SelectGroup>
                                                                  </SelectContent>
                                                            </Select>
                                                      </Field>
                                                </div>

                                                <Field>
                                                      <FieldLabel htmlFor="event-location">
                                                            <MapPinIcon className="size-4 text-muted-foreground" />
                                                            Location / Venue *
                                                      </FieldLabel>
                                                      <Input
                                                            id="event-location"
                                                            name="location"
                                                            value={form.location}
                                                            onChange={updateField("location")}
                                                            placeholder="Railway Station Bajar Mosque, Rohanpur, Bangladesh"
                                                            required
                                                      />
                                                </Field>

                                                <Field>
                                                      <FieldLabel htmlFor="event-thumbnail">
                                                            <ImageIcon className="size-4 text-muted-foreground" />
                                                            Thumbnail Image URL *
                                                      </FieldLabel>
                                                      <Input
                                                            id="event-thumbnail"
                                                            name="thumbnail"
                                                            type="url"
                                                            value={form.thumbnail}
                                                            onChange={updateField("thumbnail")}
                                                            placeholder="https://www.example.com/image.jpg"
                                                            required
                                                      />
                                                </Field>

                                                <Field>
                                                      <FieldLabel htmlFor="event-description">
                                                            <FileTextIcon className="size-4 text-muted-foreground" />
                                                            Description
                                                      </FieldLabel>
                                                      <Textarea
                                                            id="event-description"
                                                            name="description"
                                                            value={form.description}
                                                            onChange={updateField("description")}
                                                            className="min-h-32 resize-none"
                                                            placeholder="Add description about the event, including its purpose, activities, and any other relevant information."
                                                      />
                                                </Field>
                                          </FieldGroup>
                                    </form>
                              </CardContent>

                              <CardFooter className="justify-end gap-2">
                                    <Button variant="outline" type="button">
                                          Cancel
                                    </Button>
                                    <Button type="submit" form="create-event-form">
                                          Submit
                                    </Button>
                              </CardFooter>
                        </Card>

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

                       
                  </div>
            </div>
      );
}
