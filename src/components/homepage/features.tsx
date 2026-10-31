import {
  CalendarPlus,
  HandFist,
  Heart,
  ShieldCog,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: CalendarPlus,
    title: "Create in Minutes",
    description:
      "Publish a donation drive, cleanup or Islamic program with a thumbnail, location and future date — in under two minutes.",
  },
  {
    icon: HandFist,
    title: "Join with One Click",
    description:
      "Browse nearby events in Rohanpur and Gomastapur, and secure your spot instantly. No forms, no waiting.",
  },
  {
    icon: Heart,
    title: "Like & Support",
    description:
      "Show love for events and volunteers with one tap. Most-liked events rise to our Community Favorites.",
  },
  {
    icon: ShieldCog,
    title: "Trusted Community",
    description:
      "Only the organiser can edit or delete their event. Your data stays yours, protected end to end.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        {/* ---------- Section header ---------- */}
        <div className="mx-auto max-w-2xl text-center">
          <Badge
            variant="secondary"
            className="rounded-full px-3 py-1 text-xs font-medium"
          >
            Why Join Us
          </Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-5xl">
            Everything you need to organise service
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            A simple toolkit built for volunteers, not for paperwork. Create,
            join and manage social service events in minutes.
          </p>
        </div>

        {/* ---------- Feature grid ---------- */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <Card
              key={title}
              className="group h-full rounded-2xl border-border/60 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <CardHeader>
                <div className="mb-2 grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}