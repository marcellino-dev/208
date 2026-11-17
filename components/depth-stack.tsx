"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLenis } from "lenis/react"

interface DepthStackProps {
  children: ReactNode
}

// Telas grandes: seções empilhadas num palco fixo. Telas pequenas: entrada simples por scroll.
const DESKTOP = "(min-width: 1024px) and (min-height: 820px)"
const COMPACT = "(max-width: 1023px), (max-height: 819px)"

const DWELL = 0.6 // tempo parado lendo cada seção
const MOVE = 1 // duração da troca entre seções
const SCROLL_PER_UNIT = 0.6 // altura de tela rolada por unidade de tempo

export function DepthStack({ children }: DepthStackProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const lenis = useLenis()
  const lenisRef = useRef(lenis)

  useEffect(() => {
    lenisRef.current = lenis
  }, [lenis])

  useEffect(() => {
    const stage = stageRef.current

    if (!stage) {
      console.error("DepthStack requires its stage element.")
      return
    }

    gsap.registerPlugin(ScrollTrigger)
    ScrollTrigger.config({ ignoreMobileResize: true })

    const panels = gsap.utils.toArray<HTMLElement>(".depth-panel", stage)
    const total = DWELL + (panels.length - 1) * (DWELL + MOVE)
    const mm = gsap.matchMedia()

    mm.add(DESKTOP, () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: () => (stage.offsetHeight > window.innerHeight ? "bottom bottom" : "top top"),
          end: () => `+=${window.innerHeight * total * SCROLL_PER_UNIT}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // Momento em que cada seção está totalmente visível (usado pelos links do menu)
      const times = new Map<string, number>()

      panels.forEach((panel, index) => {
        const id = panel.querySelector("section")?.id
        const visibleAt = index === 0 ? 0 : DWELL + (index - 1) * (DWELL + MOVE) + MOVE

        if (id) {
          times.set(id, visibleAt)
        }

        const next = panels[index + 1]

        if (!next) {
          return
        }

        const start = DWELL + index * (DWELL + MOVE)

        // A atual vem para a frente, cresce e some
        tl.to(
          panel,
          { scale: 1.25, autoAlpha: 0, duration: 0.6, ease: "power2.in", transformOrigin: "50% 50%" },
          start,
        )

        // A próxima nasce lá de trás e avança
        tl.fromTo(
          next,
          { scale: 0.75, autoAlpha: 0, filter: "blur(8px)", transformOrigin: "50% 50%" },
          { scale: 1, autoAlpha: 1, filter: "blur(0px)", duration: 0.7, ease: "power2.out" },
          start + 0.3,
        )
      })

      tl.set({}, {}, total)

      const scrollTrigger = tl.scrollTrigger

      const goToSection = (event: Event) => {
        const link = event.currentTarget as HTMLAnchorElement
        const time = times.get(link.hash.slice(1))

        if (time === undefined || !scrollTrigger) {
          return
        }

        event.preventDefault()

        const top = scrollTrigger.start + (time / total) * (scrollTrigger.end - scrollTrigger.start)

        if (lenisRef.current) {
          lenisRef.current.scrollTo(top, { duration: 1.6 })
        } else {
          window.scrollTo({ top, behavior: "smooth" })
        }
      }

      const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')).filter(
        (link) => times.has(link.hash.slice(1)),
      )

      links.forEach((link) => link.addEventListener("click", goToSection))

      return () => {
        links.forEach((link) => link.removeEventListener("click", goToSection))
      }
    })

    mm.add(COMPACT, () => {
      panels.forEach((panel, index) => {
        const side = index % 2 === 0 ? -1 : 1

        gsap.fromTo(
          panel,
          {
            x: () => side * window.innerWidth * 0.2,
            scale: 1,
            autoAlpha: 0,
            filter: "blur(4px)",
            transformOrigin: "50% 50%",
          },
          {
            x: 0,
            scale: 1,
            autoAlpha: 1,
            filter: "blur(0px)",
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "top 92%",
              end: "top 62%",
              scrub: true,
            },
          },
        )
      })
    })

    let resizeTimeout: number | undefined
    let lastWidth = window.innerWidth
    const refresh = () => ScrollTrigger.refresh()
    const refreshAfterResize = () => {
      // No celular, a barra do navegador aparecendo/sumindo só muda a altura: não recalcula
      if (window.innerWidth === lastWidth) {
        return
      }
      lastWidth = window.innerWidth
      if (resizeTimeout !== undefined) {
        window.clearTimeout(resizeTimeout)
      }
      resizeTimeout = window.setTimeout(refresh, 150)
    }

    window.addEventListener("load", refresh)
    window.addEventListener("resize", refreshAfterResize)

    return () => {
      window.removeEventListener("load", refresh)
      window.removeEventListener("resize", refreshAfterResize)
      if (resizeTimeout !== undefined) {
        window.clearTimeout(resizeTimeout)
      }
      mm.revert()
    }
  }, [])

  return (
    <div ref={stageRef} className="depth-stage relative overflow-x-clip bg-black">
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div key={index} className="depth-panel will-change-transform">
              {child}
            </div>
          ))
        : <div className="depth-panel will-change-transform">{children}</div>}
    </div>
  )
}