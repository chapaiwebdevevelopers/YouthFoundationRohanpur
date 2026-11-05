
import Event from "@/components/homepage/upcomingevent"
import Features from "@/components/homepage/features"
import Hero from "@/components/homepage/hero"
import Newsletter from "@/components/homepage/newsletter"
import Team from "@/components/team"
import ExpiredEvents from "@/components/homepage/expiredEvents"
import Gallery from "@/components/homepage/gallery"
import { Suspense } from "react"


export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <main>
      <Features></Features>
      <Suspense fallback={<p>Loading events...</p>}>
        <Event></Event>
        <ExpiredEvents></ExpiredEvents>
      </Suspense>
      <Team></Team>
      <Suspense fallback={<p>Loading gallery...</p>}>
        <Gallery></Gallery>
      </Suspense>
      <Newsletter></Newsletter>
      </main>
    </div>

  );
}
