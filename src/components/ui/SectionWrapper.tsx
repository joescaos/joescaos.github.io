import { useEffect, useRef, type ReactNode } from 'react'

interface Props {
  id: string
  className?: string
  children: ReactNode
}

export function SectionWrapper({ id, className = '', children }: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id={id}
      ref={ref}
      className={`section-fade py-20 px-4 max-w-5xl mx-auto ${className}`}
    >
      {children}
    </section>
  )
}
