"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Image as ImageIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/* ============================== types ============================== */

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

/** Gallery adds likes on top of EventItem — no schema change needed */
type GalleryItem = EventItem & { likes?: number };

/* ============================== data =============================== */

const galleryItems: GalleryItem[] = [
  /* ---------- Your real events ---------- */
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
    likes: 64,
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
    likes: 89,
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
    likes: 52,
  },

  /* ---------- Sample filler — delete once you have 6 real events ---------- */
  {
    _id: "4",
    eventTitle: "Winter Clothes Drive",
    eventType: "Winter Relief",
    eventDate: "2026-12-05",
    location: "Rohanpur Bazar, Gomastapur",
    thumbnailImage:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80",
    description:
      "Collecting and distributing warm clothes for families in need this winter.",
    organizerEmail: "organizer@example.com",
    createdAt: "2026-10-23T08:00:00.000Z",
    status: "published",
    likes: 71,
  },
  {
    _id: "5",
    eventTitle: "Volunteer Meetup",
    eventType: "Education",
    eventDate: "2026-12-12",
    location: "Rohanpur Community Hall, Rajshahi",
    thumbnailImage:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    description:
      "Monthly volunteer meetup to plan upcoming drives and share stories.",
    organizerEmail: "organizer@example.com",
    createdAt: "2026-10-24T14:00:00.000Z",
    status: "published",
    likes: 43,
  },
  {
    _id: "6",
    eventTitle: "Ramadan Food Packs",
    eventType: "Food Drive",
    eventDate: "2026-03-20",
    location: "Rohanpur High School Ground, Gomastapur",
    thumbnailImage:
      "https://images.unsplash.com/photo-1526976668912-1a811878dd37?auto=format&fit=crop&w=800&q=80",
    description:
      "Assembling and distributing food packs for families during Ramadan.",
    organizerEmail: "organizer@example.com",
    createdAt: "2026-10-25T10:00:00.000Z",
    status: "published",
    likes: 97,
  },
];

/* ============================ helpers ============================== */

/** "Rohanpur Union Parishad, Gomastapur" → "Gomastapur" */
function getCity(location: string): string {
  const parts = location.split(",");
  return parts[parts.length - 1].trim();
}

/* ========================== gallery card =========================== */

function GalleryCard({ item }: { item: GalleryItem }) {
  const [imgFailed, setImgFailed] = useState(false);
  const [like, setLike] = useState({
    count: item.likes ?? 0,
    liked: false,
  });

  const toggleLike = () =>
    setLike((s) => ({
      liked: !s.liked,
      count: s.liked ? s.count - 1 : s.count + 1,
    }));

  return (
    <figure className="group relative">
      {/* image wrapper */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
        {/* fallback layer (visible when image fails) */}
        <div className="absolute inset-0 grid place-items-center text-muted-foreground/30">
          <ImageIcon className="h-12 w-12" strokeWidth={1.2} />
        </div>

        {!imgFailed && (
          <Image
            src={item.thumbnailImage}
            alt={item.eventTitle}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgFailed(true)}
          />
        )}

        {/* hover gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* like button — top-right */}
        <button
          type="button"
          onClick={toggleLike}
          aria-pressed={like.liked}
          aria-label={like.liked ? "Unlike this photo" : "Like this photo"}
          className={cn(
            "absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold tabular-nums backdrop-blur transition-colors",
            like.liked
              ? "text-red-500"
              : "text-muted-foreground hover:text-red-500"
          )}
        >
          <Heart
            className={cn("h-3.5 w-3.5", like.liked && "fill-current")}
          />
          {like.count}
        </button>

        {/* caption — overlays the image, fades in on hover */}
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 z-10 translate-y-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="line-clamp-1 text-sm font-semibold leading-tight text-white drop-shadow">
            {item.eventTitle}
          </p>
          <p className="mt-0.5 text-xs text-white/80">
            {getCity(item.location)}
          </p>
        </figcaption>
      </div>
    </figure>
  );
}

/* ============================= section ============================= */

export default function Gallery() {
  return (
    <section id="gallery" className="py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        {/* header */}
        <div className="mx-auto max-w-2xl text-center">
          <Badge
            variant="secondary"
            className="rounded-full px-3 py-1 text-xs font-medium"
          >
            Moments
          </Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-5xl">
            Glimpses from our community
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            Real volunteers, real smiles — hover any photo to like it.
          </p>
        </div>

        {/* grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {galleryItems.map((item) => (
            <GalleryCard
              key={item._id ?? item.eventTitle}
              item={item}
            />
          ))}
        </div>
      </div>
    </section>
  );
}