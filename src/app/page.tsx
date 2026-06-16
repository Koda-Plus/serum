import { Hero } from '@/components/sections/hero'
import { TagMarquee } from '@/components/sections/tag-marquee'
import { NewCollection } from '@/components/sections/new-collection'
import { FeaturedDrop } from '@/components/sections/featured-drop'
import { StreetGalleryTeaser } from '@/components/sections/street-gallery-teaser'
import { MusicStrip } from '@/components/sections/music-strip'
import { Manifesto } from '@/components/sections/manifesto'
import { GadgetsStrip } from '@/components/sections/gadgets-strip'

export default function HomePage() {
  return (
    <>
      <Hero />
      <TagMarquee />
      <NewCollection />
      <FeaturedDrop />
      <StreetGalleryTeaser />
      <MusicStrip />
      <Manifesto />
      <GadgetsStrip />
    </>
  )
}
