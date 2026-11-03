"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  Heart,
  HeartPulse,
  MapPin,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type EventItem = {
  _id?: string;
  title: string;
  category: string;
  location: string;
  thumbnail?: string;
  description?: string;
  userId?: string;
  userEmail?: string;
  date?: string;
  likes?: number;
  attendees?: number;
};

function categoryLabel(category: string) {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatDate(date?: string) {
  if (!date) return "Date to be announced";

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return "Date to be announced";

  return parsedDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(date?: string) {
  if (!date) return null;

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return null;

  return parsedDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

const EventCard = ({ event }: { event: EventItem }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(event.likes ?? 0);

  const time = formatTime(event.date);
  const imageUrl = event.thumbnail?.trim();
  const eventUrl = event._id ? `/events/${event._id}` : "/events";

  const toggleLike = () => {
    setLiked((currentLiked) => {
      setLikeCount((currentCount) => currentCount + (currentLiked ? -1 : 1));
      return !currentLiked;
    });
  };

  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-2xl border-border/60 py-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {!imageFailed && imageUrl ? (
          <Image
            src={imageUrl}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="grid h-full place-items-center text-primary/40">
            <HeartPulse className="size-14" strokeWidth={1.2} />
          </div>
        )}

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <Badge className="gap-1.5 rounded-full bg-background/90 text-foreground backdrop-blur">
            <HeartPulse className="size-3.5 text-primary" />
            {categoryLabel(event.category)}
          </Badge>
          <div className="rounded-lg bg-background/90 px-2.5 py-1.5 text-xs font-medium text-foreground backdrop-blur">
            <CalendarDays className="mr-1 inline size-3.5 text-primary" />
            {event.date ? formatDate(event.date) : "Date TBD"}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="line-clamp-2 text-xl font-semibold leading-snug">
            {event.title}
          </h3>
          {event.description && (
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {event.description}
            </p>
          )}
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="flex items-start gap-2">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>{event.location}</span>
          </p>
          <p className="flex items-center gap-2">
            <Clock3 className="size-4 shrink-0 text-primary" />
            <span>{formatDate(event.date)}{time ? ` · ${time}` : ""}</span>
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-4">
          <button
            type="button"
            onClick={toggleLike}
            aria-label={liked ? "Unlike this event" : "Like this event"}
            aria-pressed={liked}
            className={cn(
              "flex items-center gap-1.5 text-sm transition-colors",
              liked
                ? "text-red-500"
                : "text-muted-foreground hover:text-red-500"
            )}
          >
            <Heart className={cn("size-4", liked && "fill-current")} />
            <span>{likeCount}</span>
          </button>

          <Button
            size="sm"
            className="rounded-full px-5"
            nativeButton={false}
            render={<Link href={eventUrl} />}
          >
            View event
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EventCard;
