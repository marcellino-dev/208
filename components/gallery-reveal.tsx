"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLenis } from "lenis/react"

interface GalleryRevealProps {
  gallery: ReactNode
  next: ReactNode
}

// Centro do elemento dentro do palco, ignorando transforms (usa offsetLeft/offsetTop)
function centerWithin(el: HTMLElement, root: HTMLElement) {
  let x = el.offsetWidth / 2
  let y = el.offsetHeight / 2
  let node: HTMLElement | null = el

  while (node && node !== root) {
    x += node.offsetLeft
    y += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }

  return { x, y }
}

export function GalleryReveal({ gallery, next }: GalleryRevealProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const nextRef = useRef<HTMLDivElement>(null)
  const lenis = useLenis()
  const lenisRef = useRef(lenis)

  useEffect(() => {
    lenisRef.current = lenis
  }, [lenis])

  useEffect(() => {
    const stage = stageRef.current
    const galleryLayer = galleryRef.current
    const underlay = nextRef.current

    if (!stage || !galleryLayer || !underlay) {
      console.error("GalleryReveal requires the stage, gallery and next layers.")
      return
    }

    gsap.registerPlugin(ScrollTrigger)
    ScrollTrigger.config({ ignoreMobileResize: true })

    const items = gsap.utils.toArray<HTMLElement>("[data-reveal-item]", galleryLayer)

    // Onde a foto está dentro da tela no momento em que o pin começa
    const measure = (el: HTMLElement) => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const { x, y } = centerWithin(el, stage)
      const viewportTop = stage.offsetHeight - vh

      return {
        vw,
        x,
        y: y - viewportTop - vh / 2,
        width: el.offsetWidth,
        goesLeft: x < vw / 2,
      }
    }

    let trigger: ScrollTrigger | undefined

    const context = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "bottom bottom",
          end: () => `+=${window.innerHeight * (window.innerWidth < 768 ? 0.9 : 1.3)}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Depois que as fotos abrem, libera o clique nos botões da seção de baixo
            galleryLayer.style.pointerEvents = self.progress > 0.5 ? "none" : ""
          },
        },
      })

      trigger = tl.scrollTrigger ?? undefined

      // 1) As fotos abrem espaço: saem para os lados e se afastam do centro
      tl.to(
        items,
        {
          x: (_index: number, el: HTMLElement) => {
            const m = measure(el)
            return m.goesLeft ? -(m.x + m.width) : m.vw - m.x + m.width
          },
          y: (_index: number, el: HTMLElement) => measure(el).y * 0.45,
          rotation: (index: number, el: HTMLElement) =>
            (measure(el).goesLeft ? -1 : 1) * (6 + (index % 3) * 4),
          scale: 0.85,
          duration: 0.6,
          ease: "power2.inOut",
          stagger: { each: 0.03 },
        },
        0,
      )

      tl.to(items, { opacity: 0, duration: 0.3, ease: "none", stagger: { each: 0.03 } }, 0.35)

      // 2) A próxima seção nasce de dentro, por trás das imagens
      tl.fromTo(
        underlay,
        { autoAlpha: 0, scale: 0.8, yPercent: 4, transformOrigin: "50% 50%" },
        { autoAlpha: 1, scale: 1, yPercent: 0, duration: 0.5, ease: "power2.out" },
        0.12,
      )

      // Garante que a timeline tenha duração 1 (sobra um respiro no final)
      tl.set({}, {}, 1)
    }, stage)

    // Qualquer link "#minis" cai no fim da animação, não no meio dela.
    // Usa delegação para pegar também o link do menu mobile, que só existe no DOM quando o menu está aberto.
    const goToMinis = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest('a[href="#minis"]')

      if (!link || !trigger) {
        return
      }

      event.preventDefault()

      if (lenisRef.current) {
        lenisRef.current.scrollTo(trigger.end, { duration: 1.6 })
      } else {
        window.scrollTo({ top: trigger.end, behavior: "smooth" })
      }
    }

    document.addEventListener("click", goToMinis)

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
      document.removeEventListener("click", goToMinis)
      window.removeEventListener("load", refresh)
      window.removeEventListener("resize", refreshAfterResize)
      if (resizeTimeout !== undefined) {
        window.clearTimeout(resizeTimeout)
      }
      context.revert()
    }
  }, [])

  return (
    <div ref={stageRef} className="relative overflow-x-clip bg-black">
      {/* Atrás das fotos: Pacote de minis */}
      <div
        ref={nextRef}
        className="absolute inset-x-0 bottom-0 z-0 flex min-h-[100svh] w-full items-center opacity-0 will-change-transform"
      >
        <div className="w-full">{next}</div>
      </div>

      {/* Na frente: galeria */}
      <div ref={galleryRef} className="relative z-10">
        {gallery}
      </div>
    </div>
  )
}