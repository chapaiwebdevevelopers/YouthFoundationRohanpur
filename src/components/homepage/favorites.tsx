"use client";


import Link from "next/link";
import {ArrowRight} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import EventCard from "../sharedComponent/EventCard";

/* ------------------------------ data ------------------------------ */

export type EventType =
  | "Donation"
  | "Cleanup"
  | "Plantation"
  | "Winter Relief"
  | "Food Drive"
  | "Health Camp"
  | "Education";

export type EventItem = {
  _id?: string;
  eventTitle: string;
  eventType: EventType;
  eventDate: string;
  location: string;
  thumbnailImage: string;
  description: string;
  organizerEmail: string;
  createdAt?: string;
  status?: "published" | "draft";
};

export const events: EventItem[] = [
  {
    _id: "1",
    eventTitle: "Blanket Distribution for the Needy",
    eventType: "Winter Relief",
    eventDate: "2026-12-22",
    location: "Rohanpur Union Parishad, Gomastapur",
    thumbnailImage:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
    description:
      "Join us to distribute warm blankets to underprivileged families and elderly people during the winter season. Volunteers are welcome.",
    organizerEmail: "organizer@example.com",
    createdAt: "2026-10-20T10:00:00.000Z",
    status: "published",
  },
  {
    _id: "2",
    eventTitle: "Community Tree Plantation Drive",
    eventType: "Plantation",
    eventDate: "2026-11-15",
    location: "Rohanpur High School Ground, Gomastapur",
    thumbnailImage:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80",
    description:
      "Let's make our community greener by planting trees around schools, roads, and public spaces. Bring your friends and help protect the environment.",
    organizerEmail: "organizer@example.com",
    createdAt: "2026-10-21T09:00:00.000Z",
    status: "published",
  },
  {
    _id: "3",
    eventTitle: "Free Medical Health Camp",
    eventType: "Health Camp",
    eventDate: "2026-11-25",
    location: "Gomastapur Community Centre, Rajshahi",
    thumbnailImage:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    description:
      "A free health camp offering basic medical check-ups, blood pressure testing, health consultations, and healthcare awareness for local residents.",
    organizerEmail: "organizer@example.com",
    createdAt: "2026-10-22T11:30:00.000Z",
    status: "published",
  },
 
];
/* ---------------------------- section ---------------------------- */

export default function Favorites() {
  return (
    <section id="favorites" className="py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        {/* header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Badge
              variant="secondary"
              className="rounded-full px-3 py-1 text-xs font-medium"
            >
              Community Favorites
            </Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-5xl">
              Most liked events this month
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              The events our community loves most — tap the heart to show your
              support.
            </p>
          </div>

          <Button
            
            variant="ghost"
            className="group gap-2 rounded-full font-semibold text-primary hover:text-primary"
          >
            <Link href="/events?sort=likes">
              See full ranking
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event,index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}