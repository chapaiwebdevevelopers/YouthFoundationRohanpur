
import Newsletter from '@/components/homepage/newsletter';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import JoinEventButton from '@/components/event/JoinEventButton';
import { CalendarDays, Clock, Heart, MapPin, Share2 } from 'lucide-react';
import Image from 'next/image';
import { Suspense } from 'react';

const SingleEventClient = async ({ id }:{ id: string} ) => {
   
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/events/${id}`);
    const event = await response.json();
    // console.log(event);
       const eventDate = new Date(event.date);

  const formattedDate = eventDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = eventDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

    return (
         <main className="min-h-screen bg-gray-50 pb-16 container mx-auto">
      {/* ---------- Hero Image ---------- */}
      <div className="relative h-[320px] w-full overflow-hidden md:h-[480px]">
        <Image
          src={event.thumbnail}
          alt={event.title}
          fill
          priority
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Hero overlay content */}
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 pb-8 md:pb-12">
          <Badge className="mb-3 rounded-full border-white/20 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
            {event.category.replaceAll("-", " ")}
          </Badge>

          <h1 className="max-w-3xl text-2xl font-bold leading-tight text-white drop-shadow-md md:text-4xl lg:text-5xl">
            {event.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/85">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="size-4" />
              {formattedDate}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="size-4" />
              {formattedTime}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4" />
              {event.location}
            </span>
          </div>
        </div>
      </div>

      {/* ---------- Content ---------- */}
      <div className="mx-auto mt-10 max-w-6xl px-4">
        <div>

        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* -------- Left: Main content -------- */}
          <div className="lg:col-span-2">
              <div className="space-y-8 p-6 md:p-10">
                {/* About */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-900">
                    About This Event
                  </h2>
                  <p className="mt-3 leading-7 text-gray-600">
                    {event.description}
                  </p>
                </section>

                <Separator />

                {/* Event details */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Event Details
                  </h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border bg-gray-50/60 p-4">
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                        Date
                      </p>
                      <p className="mt-1 flex items-center gap-2 text-sm font-medium text-gray-900">
                        <CalendarDays className="size-4 text-green-600" />
                        {formattedDate}
                      </p>
                    </div>

                    <div className="rounded-xl border bg-gray-50/60 p-4">
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                        Time
                      </p>
                      <p className="mt-1 flex items-center gap-2 text-sm font-medium text-gray-900">
                        <Clock className="size-4 text-green-600" />
                        {formattedTime}
                      </p>
                    </div>

                    <div className="rounded-xl border bg-gray-50/60 p-4 sm:col-span-2">
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                        Location
                      </p>
                      <p className="mt-1 flex items-center gap-2 text-sm font-medium text-gray-900">
                        <MapPin className="size-4 text-green-600" />
                        {event.location}
                      </p>
                    </div>
                  </div>
                </section>

            
              </div>
            

          </div>

          {/* -------- Right: Sticky action sidebar -------- */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20 rounded-2xl border-0 shadow-sm">
              <CardContent className="space-y-4 p-6">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    When
                  </p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {formattedDate}
                  </p>
                  <p className="text-sm text-gray-600">{formattedTime}</p>
                </div>

                <Separator />

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Where
                  </p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {event.location}
                  </p>
                </div>

                <Separator />

                <div className="flex flex-col gap-2 pt-1">
                  <JoinEventButton event={event} />
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Heart className="mr-2 size-4" />
                      Save
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Share2 className="mr-2 size-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
        <Suspense fallback={<p>loading...</p>} >
            <Newsletter></Newsletter>
        </Suspense>
    </main>
    );
};

export default SingleEventClient;