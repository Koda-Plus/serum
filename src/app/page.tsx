import { Hero } from '@/components/sections/hero'
import { TagMarquee } from '@/components/sections/tag-marquee'
import { NewCollection } from '@/components/sections/new-collection'
import { BridgeMarquee } from '@/components/sections/bridge-marquee'
import { StreetGalleryTeaser } from '@/components/sections/street-gallery-teaser'
import { MusicStrip } from '@/components/sections/music-strip'
import { Manifesto } from '@/components/sections/manifesto'
import { GadgetsStrip } from '@/components/sections/gadgets-strip'
import { LoyaltyClub } from '@/components/sections/loyalty-club'

export default function HomePage() {
  return (
    <>
      <Hero />
      <TagMarquee />
      <NewCollection />
      <BridgeMarquee />
      <StreetGalleryTeaser />
      <MusicStrip />
      <Manifesto />
      <GadgetsStrip />
      <LoyaltyClub />
    </>
  )
}
