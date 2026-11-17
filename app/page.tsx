import { StudioNavigation } from "@/components/studio-navigation"
import { StudioHero } from "@/components/studio-hero"
import { StudioFooter, TattooGallery } from "@/components/studio-work"
import { StudioTeam } from "@/components/studio-team"
import { GalleryReveal } from "@/components/gallery-reveal"
import { DepthStack } from "@/components/depth-stack"
import {
  BookingGuide,
  MiniPackage,
  StudioAbout,
  StudioLocation,
  TattooCare,
} from "@/components/studio-details"
import { TattooMachine } from "@/components/tattoo-machine"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-transparent">
      <StudioNavigation />
      <StudioHero />
      <StudioAbout />
      <StudioTeam />
      <GalleryReveal gallery={<TattooGallery />} next={<MiniPackage />} />
      <DepthStack>
        <BookingGuide />
        <TattooCare />
        <StudioLocation />
      </DepthStack>
      <StudioFooter />
      <TattooMachine />
    </main>
  )
}
