"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

const artists: {
  name: string
  image: string
}[] = [
  {
    name: "Rafael",
    image: "/professionals/rafael.webp",
  },
  {
    name: "Eve",
    image: "/professionals/eve.webp",
  },
  {
    name: "Camila",
    image: "/professionals/camila.webp",
  },
  {
    name: "André",
    image: "/professionals/andre.webp",
  },
]

export function StudioTeam() {
  const [activeIndex, setActiveIndex] = useState(2)
  const [carouselEntered, setCarouselEntered] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const pointerStart = useRef<{ x: number; y: number } | null>(null)
  const dragged = useRef(false)

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) {
      console.error("Studio team carousel requires its container.")
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCarouselEntered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    observer.observe(carousel)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % artists.length)
    }, 4500)

    return () => window.clearTimeout(timeout)
  }, [activeIndex])

  const move = (direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + artists.length) % artists.length)
  }

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return
    if ((event.target as Element).closest("button")) return
    pointerStart.current = { x: event.clientX, y: event.clientY }
  }

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current
    pointerStart.current = null
    if (!start) return

    const dx = event.clientX - start.x
    const dy = event.clientY - start.y
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      dragged.current = true
      move(dx < 0 ? 1 : -1)
    }
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault()
      move(event.key === "ArrowRight" ? 1 : -1)
    }
  }

  return (
    <section
      id="equipe"
      className="relative isolate overflow-hidden bg-black px-5 py-16 text-white md:px-8 md:py-24"
    >
      <div
        className="pointer-events-none absolute -left-56 -top-48 -z-10 size-[34rem] rounded-full border border-[#ff1680]/15"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-52 -top-64 -z-10 size-[38rem] rounded-full border border-[#ff1680]/15"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute -bottom-24 right-0 z-0 select-none text-[clamp(12rem,24vw,22rem)] font-black leading-none tracking-[-0.1em] text-transparent opacity-30"
        style={{ WebkitTextStroke: "1px rgba(255, 22, 128, 0.7)" }}
        aria-hidden="true"
      >
        208
      </span>

      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="grid gap-8 md:grid-cols-[1.2fr_.8fr] md:items-end">
          <div>
            <p className="mb-4 flex items-center gap-4 text-[11px] font-bold uppercase tracking-[.3em] text-[#ff1680]">
              <span className="h-px w-16 bg-[#ff1680]" />
              Nossa equipe
            </p>
            <h2 className="text-4xl font-black leading-[.96] tracking-[-.06em] sm:text-5xl xl:text-6xl">
              GENTE DE VERDADE.
              <br />
              TRAÇOS <span className="text-[#ff1680]">ÚNICOS.</span>
            </h2>
          </div>

          <div className="flex flex-col gap-5 border-l border-[#ff1680] pl-6 md:mb-1 md:pl-8">
            <p className="max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
              Nosso time reúne tatuadores iniciantes e profissionais com mais de 4, 7, 10 e 15 anos de
              experiência. Cada artista define seu valor conforme sua trajetória.
            </p>
            <a
              href="https://wa.me/5547991035449"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-4 rounded-full border border-[#ff1680] px-5 py-3 text-sm font-semibold transition-colors hover:bg-[#ff1680] hover:text-black"
            >
              Fale com a equipe pelo WhatsApp
              <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
        </header>

        <div className="relative mt-12 md:mt-14">
          <div
            ref={carouselRef}
            role="region"
            aria-label="Carrossel de profissionais"
            aria-roledescription="carrossel"
            tabIndex={0}
            className={`relative mx-auto h-[min(84vw,380px)] w-full max-w-7xl touch-pan-y overflow-hidden outline-none transition-all duration-700 ease-out will-change-transform focus-visible:ring-2 focus-visible:ring-[#ff1680] ${
              carouselEntered
                ? "opacity-100 blur-0 [transform:translateX(0)] md:[transform:translateY(0)_translateZ(0)_scale(1)]"
                : "opacity-0 blur-[10px] [transform:translateX(-72px)] md:[transform:translateY(32px)_translateZ(-180px)_scale(.72)]"
            }`}
            style={{ perspective: "1200px" }}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => {
              pointerStart.current = null
            }}
            onDragStart={(event) => event.preventDefault()}
            onKeyDown={onKeyDown}
            onClickCapture={(event) => {
              if (dragged.current) {
                event.preventDefault()
                event.stopPropagation()
                dragged.current = false
              }
            }}
          >
            {artists.map((artist, index) => {
              const offset = (index - activeIndex + artists.length) % artists.length
              const position = offset > artists.length / 2 ? offset - artists.length : offset
              const distance = Math.abs(position)
              const isActive = position === 0
              const side = Math.sign(position)
              const x = isActive ? 0 : `${position * (distance === 1 ? 72 : 116)}%`
              const rotation = side * (distance === 1 ? -5 : -9)

              return (
                <div
                  key={artist.name}
                  className="absolute left-1/2 top-1/2 aspect-[1.32] w-[min(78vw,450px)] -translate-x-1/2 -translate-y-1/2"
                  style={{ zIndex: 5 - distance }}
                  aria-hidden={distance === 2}
                >
                  <motion.a
                    href={`https://wa.me/5547991035449?text=${encodeURIComponent(`Olá! Gostaria de falar sobre uma tattoo com ${artist.name}.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    draggable={false}
                    aria-label={`Falar pelo WhatsApp sobre uma tattoo com ${artist.name}`}
                    aria-current={isActive ? "true" : undefined}
                    tabIndex={distance === 2 ? -1 : undefined}
                    className={`absolute inset-0 block overflow-hidden rounded-xl border text-left ${
                      isActive
                        ? "border-[#ff1680] shadow-[0_0_36px_rgba(255,22,128,0.45)]"
                        : "border-white/20 shadow-[0_12px_42px_rgba(0,0,0,0.55)]"
                    }`}
                    style={{ transformStyle: "preserve-3d" }}
                    initial={false}
                    animate={{
                      x,
                      scale: isActive ? 1 : distance === 1 ? 0.78 : 0.58,
                      opacity: isActive ? 1 : distance === 1 ? 0.68 : 0.34,
                      rotateY: rotation,
                      z: isActive ? 0 : distance === 1 ? -60 : -140,
                      filter: isActive ? "brightness(1)" : "brightness(0.65)",
                    }}
                    transition={{ type: "spring", stiffness: 190, damping: 28 }}
                  >
                    <Image
                      src={artist.image}
                      alt={`Retrato de ${artist.name}`}
                      fill
                      sizes="(max-width: 639px) 78vw, 450px"
                      className="object-cover object-center"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <h3 className="text-xl font-black uppercase leading-none tracking-tight sm:text-2xl">
                        {artist.name}
                      </h3>
                    </div>
                  </motion.a>
                </div>
              )
            })}
            <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 justify-between px-1 sm:px-4">
              <button
                type="button"
                onClick={() => move(-1)}
                aria-label="Ver profissional anterior"
                className="pointer-events-auto grid size-11 place-items-center rounded-full border border-white/35 bg-black/75 text-white transition hover:border-[#ff1680] hover:text-[#ff1680]"
              >
                <ChevronLeft size={22} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                aria-label="Ver próximo profissional"
                className="pointer-events-auto grid size-11 place-items-center rounded-full border border-white/35 bg-black/75 text-white transition hover:border-[#ff1680] hover:text-[#ff1680]"
              >
                <ChevronRight size={22} aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="mt-4 flex justify-center gap-2" aria-label="Selecionar profissional">
            {artists.map((artist, index) => (
              <button
                key={artist.name}
                type="button"
                aria-label={`Mostrar ${artist.name}`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === activeIndex ? "w-7 bg-[#ff1680]" : "w-2 bg-white/25 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>

        <p className="mt-8 max-w-4xl text-sm leading-relaxed text-white/55">
          Realismo, fine line, blackwork, pontilhismo, old school, neotrad, floral, mandala e escrita.
          Também trabalhamos com geek, anime, comercial, fine art, microrealismo e old school colorido.
        </p>

        <div className="relative z-10 mt-10 flex items-center gap-4 border-t border-white/10 pt-5 text-[10px] font-bold uppercase tracking-[.28em] sm:text-xs">
          <span className="h-px w-14 bg-[#ff1680]" />
          <p>
            <span className="text-[#ff1680]">Tatuagem é arte.</span>
            <span className="ml-3 text-white/45">E aqui, é com propósito.</span>
          </p>
        </div>
      </div>
    </section>
  )
}