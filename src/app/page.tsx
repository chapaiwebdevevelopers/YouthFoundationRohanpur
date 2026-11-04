
import Event from "@/components/homepage/upcomingevent"
import Features from "@/components/homepage/features"
import Hero from "@/components/homepage/hero"
import Newsletter from "@/components/homepage/newsletter"
import Team from "@/components/team"
import ExpiredEvents from "@/components/homepage/expiredEvents"
import Gallery from "@/components/homepage/gallery"


export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <main>
      <Features></Features>
      <Event></Event>
      <ExpiredEvents></ExpiredEvents>
      <Team></Team>
      <Gallery></Gallery>
      <Newsletter></Newsletter>
      </main>
    </div>

  );
}
