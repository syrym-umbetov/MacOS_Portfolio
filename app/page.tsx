'use client'
import { Navbar, Welcome, Dock } from '@/app/components'
import gsap from 'gsap'
import { Draggable } from 'gsap/dist/Draggable'
import {
  Finder,
  Resume,
  Safari,
  Terminal,
  Text,
  ImageFile,
  Contact,
} from '@/app/windows'

gsap.registerPlugin(Draggable)
export default function Home() {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
      <ImageFile />
      <Contact />
    </main>
  )
}
