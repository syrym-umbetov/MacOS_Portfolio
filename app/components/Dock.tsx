import { useRef } from 'react'
import { dockApps } from '@/constants'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import useWindowStore, { type WindowKey } from '@/app/store/windows'

gsap.registerPlugin(useGSAP)

export default function Dock() {
  const { openWindow, closeWindow, windows } = useWindowStore()
  const dockRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const dock = dockRef.current
    if (!dock) return

    const icons = dock.querySelectorAll('.dock-icon')

    const animateIcons = (mouseX: number) => {
      const { left } = dock.getBoundingClientRect()

      icons.forEach((icon) => {
        const { left: iconLeft, width } = icon.getBoundingClientRect()
        const center = iconLeft - left + width / 2
        const distance = Math.abs(mouseX - center)
        const intensity = Math.exp(-(distance ** 2.5) / 20000)

        gsap.to(icon, {
          scale: 1 + 0.25 * intensity,
          y: -15 * intensity,
          duration: 0.2,
          ease: 'power1.out',
        })
      })
    }

    const handleMouseMove = (e: { clientX: number }) => {
      const { left } = dock.getBoundingClientRect()
      animateIcons(e.clientX - left)
    }
    const resetIcons = () =>
      icons.forEach((icon) =>
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: 'power1.out',
        })
      )

    dock.addEventListener('mousemove', handleMouseMove)
    dock.addEventListener('mouseleave', resetIcons)

    return () => {
      dock.removeEventListener('mousemove', handleMouseMove)
      dock.removeEventListener('mouseleave', resetIcons)
    }
  }, [])

  const toggleApp = (app: { id: string; canOpen: boolean }) => {
    if (!app.canOpen) return

    const windowKey = app.id as WindowKey
    const isOpen = windows[windowKey]?.isOpen

    if (isOpen) {
      closeWindow(windowKey)
    } else {
      openWindow(windowKey)
    }
  }
  return (
    <section id='dock'>
      <div ref={dockRef} className='dock-container'>
        {dockApps.map(({ id, name, icon, canOpen }) => {
          const isOpen = windows[id as WindowKey]?.isOpen

          return (
            <div key={id} className='relative flex flex-col items-center'>
              <button
                type='button'
                className='dock-icon'
                aria-label={name}
                data-tooltip-id='dock-tooltip'
                data-tooltip-content={name}
                data-tooltip-delay-show={150}
                disabled={!canOpen}
                onClick={() => toggleApp({ id, canOpen })}
              >
                <img
                  src={`/images/${icon}`}
                  alt={name}
                  loading='lazy'
                  className={canOpen ? '' : 'opacity-60'}
                />
              </button>
              {isOpen && (
                <div className='absolute -bottom-1 size-1 rounded-full bg-gray-800' />
              )}
            </div>
          )
        })}
        <Tooltip id='dock-tooltip' place='top' className='tooltip' />
      </div>
    </section>
  )
}
