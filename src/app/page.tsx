import { Hero } from '@/components/sections/hero'
import { NewCollection } from '@/components/sections/new-collection'
import { StreetGalleryTeaser } from '@/components/sections/street-gallery-teaser'
import { MusicStrip } from '@/components/sections/music-strip'
import { GadgetsStrip } from '@/components/sections/gadgets-strip'
import { LoyaltyClub } from '@/components/sections/loyalty-club'

export default function HomePage() {
  return (
    <>
      <Hero />
      <NewCollection />
      <StreetGalleryTeaser />
      <MusicStrip />
      <GadgetsStrip />
      <LoyaltyClub />
    </>
  )
}
