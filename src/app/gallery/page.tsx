

// import { useState } from "react";
// import Image from "next/image";
// import { Heart, Image as ImageIcon } from "lucide-react";

import GalleryCard from "@/components/galleryCard";
import { Badge } from "@/components/ui/badge";
import { IEventItem } from "@/type/event";
// import { cn } from "@/lib/utils";


export default async function GalleryPage() {
  const response = await fetch(`http://localhost:8000/events`)
  const events =await  response.json()
  console.log("event from gallery",events)
  return (
    <section id="gallery" className="py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        {/* header */}
        <div className=" max-w-2xl">
          <Badge
            variant="secondary"
            className="rounded-full px-3 py-1 text-xs font-medium"
          >
            Memorable Moment
          </Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-5xl">
            Join Us & Create Lasting Memories
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            Come together for meaningful events, share beautiful moments, and make a positive impact on the lives of others.
          </p>
        </div>

        {/* grid */}
        <div className="mt-12 grid grid-cols-1  md:grid-cols-2 gap-4 lg:grid-cols-3">
          {events.map((event:IEventItem) => (
            <GalleryCard  key={event._id}
              event={event}></GalleryCard>
          ))}
        </div>
      </div>
    </section>
    
  );
}