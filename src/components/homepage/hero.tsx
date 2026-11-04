"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Compass,
  PlusCircle,
  Users,
  HandHeart,
  Heart,
  PackageCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const stats = [
  { value: "240+", label: "Events Hosted" },
  { value: "6.5K+", label: "Volunteers" },
  { value: "18", label: "Villages Served" },
  { value: "12K+", label: "❤ Likes Given" },
];



type FloatCardProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  className?: string;
};

function FloatCard({ icon, title, subtitle, className }: FloatCardProps) {
  return (
    <Card
      className={cn(
        "absolute hidden w-52 rounded-xl border-border/60 bg-background/90 py-0 shadow-xl backdrop-blur-md sm:block",
        "animate-[float_6s_ease-in-out_infinite]",
        className
      )}
    >
      <CardContent className="flex items-center gap-3 p-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
          {icon}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold leading-tight">{title}</p>
          <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Hero() {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section id="home" className="relative overflow-hidden py-16 md:py-24">
      {/* soft background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_80%_20%,var(--tint-primary-2),transparent_70%)]"
      />

      <div className="container mx-auto grid max-w-7xl items-center gap-14 px-4 lg:grid-cols-2 lg:gap-10">
        {/* ---------- Left: content ---------- */}
        <div className="max-w-xl">
          <Badge
            variant="secondary"
            className="gap-2 rounded-full px-3 py-1 text-xs font-medium"
          >
            <MapPin className="h-3.5 w-3.5 text-primary" />
            Rohanpur, Gomastapur, Rajshahi
          </Badge>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-balance md:text-5xl lg:text-6xl">
            Small hands, big &nbsp;
             <span className="text-primary">barakah</span> for our community
          </h1>

          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            Youth Foundation Rohanpur is a youth-led platform where neighbours
            become volunteers. Create a social service event, invite your
            community, and track every life you touch — from winter clothes
            drives to Fajr gift campaigns.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/events" />}
              className="rounded-full px-6"
            >
              <Compass className="mr-2 h-4 w-4" />
              Browse Events
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/events/create" />}
              className="rounded-full px-6"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </div>

          {/* stats */}
          <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="text-2xl font-bold tracking-tight md:text-3xl">
                    {s.value}
                  </span>
                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                    {s.label}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ---------- Right: visual ---------- */}
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border/60 bg-muted shadow-2xl sm:aspect-[5/6]">
            {/* fallback (shows if image fails) */}
            <div className="absolute inset-0 grid place-items-center text-muted-foreground/40">
              <PackageCheck className="h-24 w-24" strokeWidth={1.2} />
            </div>

            {!imgFailed && (
              <Image
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=900&q=80"
                alt="Volunteers distributing supplies"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
                onError={() => setImgFailed(true)}
              />
            )}

            {/* subtle gradient at bottom for text contrast */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          {/* floating cards */}
          <FloatCard
            icon={<Users className="h-4 w-4" />}
            title="1,240 joined"
            subtitle="this month"
            className="-left-6 top-10 [animation-delay:0s]"
          />
          <FloatCard
            icon={<HandHeart className="h-4 w-4" />}
            title="Blanket Drive"
            subtitle="Rohanpur · 22 Dec"
            className="-right-6 top-1/2 [animation-delay:1.5s]"
          />
          <FloatCard
            icon={<Heart className="h-4 w-4" />}
            title="3.2K likes"
            subtitle="on top event"
            className="-left-4 bottom-10 [animation-delay:3s]"
          />
        </div>
      </div>
    </section>
  );
}