"use client"

import Image from "next/image"
import { useRef, useState } from "react"
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"

const artists: {
  name: string
  styles: string
  detail: string
  image: string
  hasCardText?: boolean
}[] = [
  {
    name: "Rafael",
    styles: "Fine line · Blackwork · Old school",
    detail: "Mais conforto em blackwork.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-N9UK4G7019rrrjG8CVN2GP2OWQobbr.png",
  },
  {
    name: "Eve",
    styles: "Traço fino · Floral · Mandala",
    detail: "Também trabalha com pontilhismo e blackwork.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NrsQ5mrv32ofcaOknoFLQeOE8uKhWA.png",
    hasCardText: true,
  },
  {
    name: "Camila",
    styles: "Fine line · Floral · Escrita",
    detail: "Microrealismo e traço delicado.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KzdwlUY5H2dBExH0wWTwT6rc3EeNkG.png",
    hasCardText: true,
  },
  {
    name: "André",
    styles: "Blackwork · Pontilhismo · Mandala",
    detail: "Blackwork e pontilhismo.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FKnqPySrFnEaBQ8415KHVt9XgC7XEs.png",
    hasCardText: true,
  },
]

export function StudioTeam() {
  const [activeIndex, setActiveIndex] = useState(2)
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const visibleArtists = Array.from({ length: artists.length }, (_, position) => {
    const index = (activeIndex + position - 2 + artists.length) % artists.length
    return { artist: artists[index], index, position }
  })

  const move = (direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + artists.length) % artists.length)
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

        <div
          className="relative mt-12 touch-pan-y md:mt-14"
          onTouchStart={(event) => {
            const touch = event.touches[0]
            touchStart.current = { x: touch.clientX, y: touch.clientY }
          }}
          onTouchEnd={(event) => {
            const start = touchStart.current
            touchStart.current = null
            if (!start) return
            const touch = event.changedTouches[0]
            const dx = touch.clientX - start.x
            const dy = touch.clientY - start.y
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
              move(dx < 0 ? 1 : -1)
            }
          }}
        >
          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 justify-between sm:-left-5 sm:-right-5 xl:-left-16 xl:-right-16">
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

          <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-3 xl:grid-cols-4">
            {visibleArtists.map(({ artist, index, position }) => {
              const isActive = position === 2
              const visibility =
                position === 2
                  ? "block"
                  : position === 1 || position === 3
                    ? "hidden sm:block"
                    : "hidden xl:block"

              return (
                <a
                  key={artist.name}
                  href={`https://wa.me/5547991035449?text=${encodeURIComponent(`Olá! Gostaria de falar sobre uma tattoo com ${artist.name}.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Falar pelo WhatsApp sobre uma tattoo com ${artist.name}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`${visibility} group relative mx-auto block aspect-[.64] w-full max-w-[330px] overflow-hidden rounded-xl border text-left transition-all duration-500 motion-reduce:transition-none sm:max-w-none xl:aspect-auto xl:h-[350px] ${
                    isActive
                      ? "border-[#ff1680]/90 shadow-[0_0_32px_rgba(255,22,128,0.32)] xl:h-[372px] xl:-translate-y-3"
                      : "border-white/15 hover:border-[#ff1680]/60"
                  }`}
                >
                  <Image
                    src={artist.image}
                    alt={
                      artist.hasCardText
                        ? `Cartão de ${artist.name}: ${artist.styles}. ${artist.detail}`
                        : `Retrato de ${artist.name}`
                    }
                    fill
                    sizes="(max-width: 639px) 85vw, (max-width: 1279px) 30vw, 20vw"
                    className={`transition-opacity duration-500 ${
                      artist.hasCardText ? "object-cover xl:object-top" : "object-cover"
                    } ${
                      isActive ? "opacity-100" : "opacity-80 grayscale"
                    }`}
                  />
                  {!artist.hasCardText && (
                    <>
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                      <span className="pointer-events-none absolute left-4 top-3 flex items-baseline gap-1 text-white/55">
                        <span className="text-2xl font-black leading-none">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[10px] font-semibold">/ {String(artists.length).padStart(2, "0")}</span>
                      </span>
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5">
                        <h3 className="text-xl font-black uppercase leading-none tracking-tight sm:text-2xl">
                          {artist.name}
                        </h3>
                        <span className="my-2 block h-0.5 w-8 bg-[#ff1680]" />
                        <p className="text-[10px] font-semibold uppercase leading-relaxed tracking-wide text-[#ff8abf] sm:text-xs">
                          {artist.styles}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-white/75">{artist.detail}</p>
                        <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#ff8abf]">
                          WhatsApp <ArrowUpRight size={14} aria-hidden="true" />
                        </span>
                      </div>
                    </>
                  )}
                </a>
              )
            })}
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