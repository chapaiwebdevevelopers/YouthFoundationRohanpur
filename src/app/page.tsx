import Gallery from "@/components/Gallery"
import Event from "@/components/homepage/event"
import Favorites from "@/components/homepage/favorites"
import Features from "@/components/homepage/features"
import Hero from "@/components/homepage/hero"
import Newsletter from "@/components/homepage/newsletter"
import Team from "@/components/team"


export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <Features></Features>
      <Event></Event>
      <Favorites></Favorites>
      <Team></Team>
      <Gallery></Gallery>
      <Newsletter></Newsletter>
      
      <main>
       
      </main>
    </div>

  );
}
