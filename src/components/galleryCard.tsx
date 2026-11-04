'use client'

import { useState } from "react";
import Image from "next/image";
import { Heart, CalendarDays, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { IEventItem } from "@/type/event";
import { cn } from "@/lib/utils";

interface GalleryCardProps {
    event: IEventItem;
}

const GalleryCard = ({ event }: GalleryCardProps) => {
    const [liked, setLiked] = useState(false);

    const eventDate = new Date(event.date);

    const formattedDate = eventDate.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    const formattedTime = eventDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <Card className="group relative w-full max-w-sm cursor-pointer overflow-hidden rounded-2xl border-0 p-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative aspect-[7/6] w-full overflow-hidden">
                {/* Thumbnail */}
                <Image
                    src={event.thumbnail}
                    alt={event.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 384px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient overlay — fades in on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Category badge — always visible */}
                <Badge className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md hover:bg-black/50">
                    {event.category.replace(/-/g, " ")}
                </Badge>

                {/* Like button — always visible */}
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        setLiked((prev) => !prev);
                    }}
                    aria-label="Like event"
                    className={cn(
                        "absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60",
                        liked && "text-red-500"
                    )}
                >
                    <Heart className={cn("size-4 transition", liked && "fill-red-500")} />
                </button>

                {/* Overlay info — hidden, slides up + fades in on hover */}
                <CardContent className="absolute inset-x-0 bottom-0 space-y-2 p-5 text-white opacity-0 transition-all duration-300 ease-out group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                    <h3 className="line-clamp-2 text-lg font-bold leading-snug tracking-tight drop-shadow-sm">
                        {event.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/85">
                        <span className="inline-flex items-center gap-1.5">
                            <CalendarDays className="size-3.5 shrink-0" />
                            {formattedDate} · {formattedTime}
                        </span>

                        <span className="inline-flex min-w-0 items-center gap-1.5">
                            <MapPin className="size-3.5 shrink-0" />
                            <span className="truncate">{event.location}</span>
                        </span>
                    </div>
                </CardContent>
            </div>
        </Card>
    );
};

export default GalleryCard;