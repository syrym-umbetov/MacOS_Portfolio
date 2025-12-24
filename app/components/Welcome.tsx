import gsap from 'gsap'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

type FontWeightType = 'subtitle' | 'title'

interface FontWeightConfig {
  min: number
  max: number
  default: number
}

const FONT_WEIGHTS: Record<FontWeightType, FontWeightConfig> = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
}
const renderText = (text: string, className: string, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span
      className={className}
      key={i}
      style={
        {
          fontVariationSettings: `'wght' ${baseWeight}`,
          '--wght': baseWeight,
        } as React.CSSProperties
      }
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))
}

const setupTextHover = (
  container: HTMLElement | null,
  type: FontWeightType
) => {
  if (!container) return

  const letters = container.querySelectorAll<HTMLSpanElement>('span')

  const { min, max, default: base } = FONT_WEIGHTS[type]

  // Create weight objects for each letter
  const letterWeights = Array.from(letters).map(() => ({ weight: base }))

  const animateLetter = (
    index: number,
    targetWeight: number,
    duration = 0.25
  ) => {
    const letter = letters[index]
    const weightObj = letterWeights[index]

    gsap.to(weightObj, {
      weight: targetWeight,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        const w = Math.round(weightObj.weight)
        letter.style.fontVariationSettings = `'wght' ${w}`
      },
    })
  }

  const handleMouseMove = (e: MouseEvent) => {
    const { left } = container.getBoundingClientRect()
    const mouseX = e.clientX - left

    letters.forEach((letter, index) => {
      const { left: l, width: w } = letter.getBoundingClientRect()
      const distance = Math.abs(mouseX - (l - left + w / 2))

      const intensity = Math.exp(-(distance ** 2) / 20000)
      const targetWeight = min + (max - min) * intensity

      animateLetter(index, targetWeight)
    })
  }

  const handleMouseLeave = () => {
    letters.forEach((_, index) => animateLetter(index, base, 0.3))
  }

  container.addEventListener('mousemove', handleMouseMove)
  container.addEventListener('mouseleave', handleMouseLeave)

  return () => {
    container.removeEventListener('mousemove', handleMouseMove)
    container.removeEventListener('mouseleave', handleMouseLeave)
  }
}

export default function Navbar() {
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useGSAP(() => {
    const cleanupTitle = setupTextHover(titleRef.current, 'title')
    const cleanupSubtitle = setupTextHover(subtitleRef.current, 'subtitle')

    return () => {
      cleanupTitle?.()
      cleanupSubtitle?.()
    }
  }, [])

  return (
    <section id='welcome'>
      <p ref={subtitleRef}>
        {renderText(
          'Hey I am Syrym! Welcome to my',
          'text-3xl font-georama',
          100
        )}
      </p>
      <h1 ref={titleRef} className='mt-7'>
        {renderText('portfolio', 'text-9xl italic font-georama')}
      </h1>

      <div className='small-screen'>
        <p>This Portfolio is designed for desktop/tablet screens only.</p>
      </div>
    </section>
  )
}
