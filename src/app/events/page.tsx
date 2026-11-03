import EventCard from '@/components/sharedComponent/EventCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IEventItem } from '@/type/event';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';



const EventPage =async () => {
   const response = await fetch(`http://localhost:8000/events/upcoming`)
  const upcomingEvents = await response.json()
console.log(upcomingEvents);

    return (
        <div>
              {/* Latest Events Section */}
    <section id="events" className="py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        {/* header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Badge
              variant="secondary"
              className="rounded-full px-3 py-1 text-xs font-medium"
            >
              Happening Soon
            </Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-5xl">
              Recent upcoming events
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              Join a cause near you — six of the newest events created by our
              community in Rohanpur.
            </p>
          </div>

          <Button
            variant="ghost"
            className="group gap-2 rounded-full font-semibold text-primary hover:text-primary"
            nativeButton={false}
            render={<Link href="/events" />}
          >
            View all events
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((event:IEventItem) => (
            <EventCard key={event._id} event={event} />
            ))}
        </div>
      </div>
    </section>
           
        </div>
    );
};

export default EventPage;