"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLenis } from "lenis/react"
import type { ModelViewerElement } from "@google/model-viewer"

const MOBILE_PEN_OFFSET_Y = -12

export function TattooMachine() {
  const layerRef = useRef<HTMLDivElement>(null)
  const machineRef = useRef<HTMLDivElement>(null)
  const viewerContainerRef = useRef<HTMLDivElement>(null)
  const modelRef = useRef<ModelViewerElement | null>(null)
  const spinRef = useRef({ degrees: 0 })
  const lenis = useLenis()
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")

  useEffect(() => {
    if (!lenis) {
      return
    }

    const updateScrollTrigger = () => ScrollTrigger.update()
    lenis.on("scroll", updateScrollTrigger)

    return () => {
      lenis.off("scroll", updateScrollTrigger)
    }
  }, [lenis])

  useEffect(() => {
    const machine = machineRef.current
    const layer = layerRef.current
    const hero = document.querySelector<HTMLElement>("#inicio")
    const caption = document.querySelector<HTMLElement>("#gallery-caption")
    const galleryHeading = caption?.closest("section")?.querySelector<HTMLElement>("h2")

    if (!machine || !layer || !hero || !caption || !galleryHeading) {
      console.error("Tattoo machine animation requires the hero and gallery heading.")
      return
    }

    gsap.registerPlugin(ScrollTrigger)
    ScrollTrigger.config({ ignoreMobileResize: true })
    gsap.set(machine, { xPercent: -50, yPercent: -50 })

    let resizeHandler: (() => void) | undefined
    let resizeTimeout: number | undefined
    let lastWidth = window.innerWidth
    const context = gsap.context(() => {
      const position = (desktop: number, mobile: number) => () =>
        window.innerWidth * (window.innerWidth < 768 ? mobile : desktop)
      const verticalPosition = (desktop: number, mobile: number) => () =>
        window.innerHeight * (window.innerWidth < 768 ? mobile : desktop)
      const scale = (desktop: number, mobile: number) => () =>
        window.innerWidth < 768 ? mobile : desktop
      const mobileEndY = () =>
        galleryHeading.getBoundingClientRect().top -
        caption.getBoundingClientRect().top +
        window.innerHeight * 0.28 -
        96

      const startY = () => {
        if (window.innerWidth >= 768) {
          return window.innerHeight * -0.08
        }
        const slot = document.getElementById("pen-slot")
        if (!slot) {
          return window.innerHeight * -0.04
        }
        const rect = slot.getBoundingClientRect()
        return rect.top + rect.height / 2 - window.innerHeight / 2 + MOBILE_PEN_OFFSET_Y
      }

      const path = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          endTrigger: caption,
          end: "top 78%",
          scrub: true,
          invalidateOnRefresh: true,
          onLeave: (scrollTrigger) => {
            layer.style.position = "absolute"
            layer.style.top = `${scrollTrigger.end}px`
          },
          onRefresh: (scrollTrigger) => {
            if (layer.style.position === "absolute") {
              layer.style.top = `${scrollTrigger.end}px`
            }
          },
          onEnterBack: () => {
            layer.style.position = "fixed"
            layer.style.top = "0"
          },
        },
      })

      path.fromTo(
        machine,
        {
          x: position(0.23, 0.02),
          y: startY,
          z: -40,
          rotation: 45,
          scale: scale(1, 0.88),
        },
        {
          x: position(0.02, -0.06),
          y: verticalPosition(0.1, 0.2),
          z: 110,
          rotation: 22,
          scale: scale(0.86, 0.65),
          duration: 0.62,
          ease: "none",
        },
      )

      path.to(machine, {
        x: position(0.17, 0.02),
        y: () => (window.innerWidth < 768 ? mobileEndY() : window.innerHeight * 0.1),
        z: 25,
        rotation: 120,
        scale: scale(1.15, 0.75),
        duration: 0.38,
        ease: "none",
      })

      path.to(
        spinRef.current,
        {
          degrees: 240,
          duration: 1,
          ease: "none",
          onUpdate: () => {
            if (modelRef.current) {
              modelRef.current.cameraOrbit = `${spinRef.current.degrees}deg 75deg auto`
            }
          },
        },
        0,
      )

      resizeHandler = () => {
        // Ignora mudanças só de altura (barra do navegador no celular)
        if (window.innerWidth === lastWidth) {
          return
        }
        lastWidth = window.innerWidth
        if (resizeTimeout !== undefined) {
          window.clearTimeout(resizeTimeout)
        }
        resizeTimeout = window.setTimeout(() => {
          ScrollTrigger.refresh()
          const scrollTrigger = path.scrollTrigger
          if (layer.style.position === "absolute" && scrollTrigger) {
            layer.style.top = `${scrollTrigger.end}px`
          }
        }, 150)
      }

      window.addEventListener("resize", resizeHandler)
    }, machine)

    ScrollTrigger.refresh()

    return () => {
      if (resizeHandler) {
        window.removeEventListener("resize", resizeHandler)
      }
      if (resizeTimeout !== undefined) {
        window.clearTimeout(resizeTimeout)
      }
      context.revert()
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    let viewer: ModelViewerElement | null = null

    const initializeViewer = async () => {
      await import("@google/model-viewer")

      if (cancelled || !viewerContainerRef.current) {
        return
      }

      viewer = document.createElement("model-viewer")
      modelRef.current = viewer
      viewer.alt = "Modelo 3D de uma máquina de tatuagem"
      viewer.setAttribute("interaction-prompt", "none")
      viewer.setAttribute("shadow-intensity", "1")
      viewer.setAttribute("exposure", "1.1")
      viewer.setAttribute("loading", "eager")
      viewer.cameraOrbit = `${spinRef.current.degrees}deg 75deg auto`
      viewer.style.width = "100%"
      viewer.style.height = "100%"
      viewer.style.backgroundColor = "transparent"
      viewer.style.pointerEvents = "none"
      viewer.addEventListener(
        "load",
        () => {
          if (!cancelled) {
            setStatus("ready")
          }
        },
        { once: true },
      )
      viewer.addEventListener(
        "error",
        (event) => {
          if (!cancelled) {
            console.error("Failed to load the 3D tattoo machine model.", event)
            setStatus("error")
          }
        },
        { once: true },
      )
      viewer.src = "/3d/base_basic_pbr.glb"
      viewerContainerRef.current.append(viewer)
    }

    void initializeViewer().catch((error: unknown) => {
      if (!cancelled) {
        console.error("Failed to initialize the 3D tattoo machine viewer.", error)
        setStatus("error")
      }
    })

    return () => {
      cancelled = true
      viewer?.remove()
      modelRef.current = null
    }
  }, [])

  return (
    <div
      ref={layerRef}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[100dvh] overflow-x-clip"
      style={{ perspective: "1200px" }}
    >
      <div
        ref={machineRef}
        className="absolute left-1/2 top-1/2 h-[min(52vh,460px)] w-[min(78vw,340px)] will-change-transform md:h-[min(70vh,680px)] md:w-[min(48vw,560px)]"
        style={{ transformStyle: "preserve-3d" }}
        aria-busy={status === "loading"}
      >
        <div className="absolute inset-[15%] rounded-full bg-[#ff1680]/25 blur-[60px] md:blur-[90px]" aria-hidden="true" />
        <div ref={viewerContainerRef} className="absolute inset-0" />
        {status === "loading" && (
          <p className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-[.2em] text-white/60" role="status">
            Carregando modelo 3D...
          </p>
        )}
        {status === "error" && (
          <p className="absolute inset-0 flex items-center justify-center text-center text-sm text-white/70" role="alert">
            Não foi possível carregar o modelo 3D.
          </p>
        )}
      </div>
    </div>
  )
}