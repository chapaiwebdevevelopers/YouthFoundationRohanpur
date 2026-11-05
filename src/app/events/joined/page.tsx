
import EventCard from '@/components/sharedComponent/EventCard';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import { IEventItem } from '@/type/event';
import { Heart } from 'lucide-react';
import { headers } from 'next/headers';
import Link from 'next/link';
import React from 'react';

const MyJoinedEvent = async() => {
    const session = await auth.api.getSession({
    headers: await headers(),
  });
    const user = session?.user
    console.log(user)

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/events/joined/${user?.email}`)
    const events = await response.json()
    console.log(events)
    return (
        
            events.length>0 ? <>
            <div className='container mx-auto max-w-7xl px-4'>
            <h1>Total Joined Event : {events.length}</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                {
                    events.map((event:IEventItem) => <EventCard key={event._id} event={event}></EventCard>)
                }
            </div>
            </div>
            </> :
            <>
            <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-muted/30 rounded-2xl border border-dashed">
  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
    <Heart className="h-8 w-8" />
  </div>

  <h2 className="text-2xl font-bold tracking-tight">
    You Haven't Joined Any Events Yet
  </h2>

  <p className="mt-3 max-w-md text-muted-foreground">
    Be a part of our Islamic programmes, spread kindness, and make a
    meaningful difference in our community. Join an event and create
    beautiful memories together.
  </p>

  <Button className="mt-6" asChild>
    <Link href="/events">
      Explore Events
    </Link>
  </Button>
</div>
            </>
        
    );
};

export default MyJoinedEvent;