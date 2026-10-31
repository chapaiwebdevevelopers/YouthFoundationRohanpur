"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  HandHeart,
  Heart,
  HeartPulse,
  MapPin,
  Shirt,
  ShoppingBasket,
  Sparkles,
  Sprout,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/* ------------------------------ types ------------------------------ */

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
  eventDate: string; // ISO string, e.g. "2024-12-22T10:00:00Z"
  eventTime?: string; // optional, e.g. "10:00 AM – 2:00 PM"
  location: string;
  thumbnailImage: string;
  description: string;
  organizerEmail: string;
  createdAt?: string;
  status?: "published" | "draft";
  // UI-derived fields (returned by API / aggregated)
  likes?: number;
  attendees?: number;
};

/* --------------------------- icon map ------------------------------ */

// FIX: `Category` → `EventType`, and every union member must be a key.
const categoryIcon: Record<EventType, LucideIcon> = {
  Donation: HandHeart,
  Cleanup: Sparkles,
  Plantation: Sprout,
  "Winter Relief": Shirt,
  "Food Drive": ShoppingBasket,
  "Health Camp": HeartPulse,
  Education: BookOpen,
};

/* --------------------------- helpers ------------------------------- */

function splitDate(iso: string): { day: string; month: string } {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return { day: "--", month: "---" };
  return {
    day: String(d.getDate()).padStart(2, "0"),
    month: d.toLocaleString("en-US", { month: "short" }),
  };
}

/* ------------------------- event card ------------------------------ */

const EventCard = ({ event }: { event: EventItem }) => {
  const [imgFailed, setImgFailed] = useState(false);

  // FIX: event.likes doesn't exist on EventItem → fallback to 0
  const [likes, setLikes] = useState({
    count: event.likes ?? 0,
    liked: false,
  });

  // FIX: event.category → event.eventType
  const CategoryIcon = categoryIcon[event.eventType] ?? HandHeart;

  // FIX: event.date (object) → parsed from event.eventDate (string)
  const { day, month } = useMemo(
    () => splitDate(event.eventDate),
    [event.eventDate]
  );

  const toggleLike = () =>
    setLikes((s) => ({
      liked: !s.liked,
      count: s.liked ? s.count - 1 : s.count + 1,
    }));

  return (
    <Card className="group flex flex-col overflow-hidden rounded-2xl border-border/60 py-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* --- thumbnail --- */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <div className="absolute inset-0 grid place-items-center text-muted-foreground/30">
          <CategoryIcon className="h-16 w-16" strokeWidth={1.2} />
        </div>

        {!imgFailed && (
          <Image
            // FIX: event.image → event.thumbnailImage
            src={event.thumbnailImage}
            // FIX: event.title → event.eventTitle
            alt={event.eventTitle}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgFailed(true)}
          />
        )}

        {/* category badge — FIX: event.category → event.eventType */}
        <Badge
          variant="secondary"
          className="absolute left-3 top-3 gap-1.5 rounded-full bg-background/90 text-xs font-medium text-foreground backdrop-blur"
        >
          <CategoryIcon className="h-3.5 w-3.5 text-primary" />
          {event.eventType}
        </Badge>

        {/* date chip — FIX: uses parsed day/month */}
        <div className="absolute right-3 top-3 flex w-11 flex-col items-center rounded-lg bg-background/90 px-2 py-1 backdrop-blur">
          <span className="text-sm font-bold leading-none">{day}</span>
          <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            {month}
          </span>
        </div>
      </div>

      {/* --- body --- */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="line-clamp-2 text-lg font-semibold leading-snug">
          {/* FIX: event.title → event.eventTitle */}
          {event.eventTitle}
        </h3>

        <div className="space-y-1.5 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-primary/70" />
            <span className="truncate">{event.location}</span>
          </p>
          <p className="flex items-center gap-2">
            <Clock className="h-4 w-4 shrink-0 text-primary/70" />
            {/* FIX: event.time → event.eventTime ?? fallback */}
            <span className="truncate">{event.eventTime ?? "Time TBD"}</span>
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-3">
          <div className="flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="h-4 w-4" />
              {/* FIX: event.attendees may be undefined */}
              {event.attendees ?? 0}
            </span>

            <button
              type="button"
              onClick={toggleLike}
              aria-pressed={likes.liked}
              aria-label={likes.liked ? "Unlike this event" : "Like this event"}
              className={cn(
                "flex items-center gap-1.5 transition-colors",
                likes.liked
                  ? "text-red-500"
                  : "text-muted-foreground hover:text-red-500"
              )}
            >
              <Heart
                className={cn("h-4 w-4", likes.liked && "fill-current")}
              />
              <span className="tabular-nums">{likes.count}</span>
            </button>
          </div>

          <Button asChild size="sm" className="rounded-full px-4">
            {/* FIX: event.id → event._id */}
            <Link href={`/events/${event._id ?? ""}`}>View</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EventCard;