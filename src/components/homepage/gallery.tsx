

// import { useState } from "react";
// import Image from "next/image";
// import { Heart, Image as ImageIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import GalleryCard from "../galleryCard";
import { IEventItem } from "@/type/event";
// import { cn } from "@/lib/utils";


export default async function Gallery() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/events`)
  const events =await  response.json()
  console.log("event from gallery",events)
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
        <div className="mt-12 grid grid-cols-1  md:grid-cols-2 gap-4 lg:grid-cols-3">
          {events.slice(0,8).map((event:IEventItem) => (
            <GalleryCard  key={event._id}
              event={event}></GalleryCard>
          ))}
        </div>
      </div>
    </section>
    
  );
}