'use client'
import { Navbar, Welcome, Dock } from '@/app/components'
import gsap from 'gsap'
import { Draggable } from 'gsap/dist/Draggable'
import { Terminal } from '@/app/windows'

gsap.registerPlugin(Draggable)
export default function Home() {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
      <Terminal />
    </main>
  )
}
