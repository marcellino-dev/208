"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

const links = [
  { href: "#sobre", label: "O estúdio" },
  { href: "#equipe", label: "Artistas" },
  { href: "#trabalhos", label: "Trabalhos" },
  { href: "#minis", label: "Minis" },
  { href: "#localizacao", label: "Localização" },
]

export function StudioNavigation() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent text-white">
      <nav aria-label="Navegação principal" className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link href="#inicio" aria-label="208 Estúdio — início" className="flex items-center gap-2 font-black tracking-tighter">
          <span className="grid size-10 place-items-center rounded-full bg-white text-lg text-black">208</span>
          <span className="text-sm uppercase tracking-[.2em]">estúdio</span>
        </Link>
        <div className="hidden items-center gap-4 lg:flex">
          {links.map((link) => <Link key={link.href} className="text-sm text-white/70 transition hover:text-[#ff1680]" href={link.href}>{link.label}</Link>)}
          <a className="rounded-full bg-[#ff1680] px-5 py-2.5 text-sm font-bold text-black transition hover:bg-white" href="https://wa.me/5547991035449" target="_blank" rel="noreferrer">Agendar horário →</a>
        </div>
        <button type="button" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} onClick={() => setOpen(!open)} className="grid size-11 place-items-center rounded-full border border-white/20 lg:hidden">
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </nav>
      {open && <div className="flex flex-col gap-1 border-t border-white/10 bg-black/95 px-5 py-4 backdrop-blur-md lg:hidden">{links.map((link) => <a key={link.href} onClick={() => setOpen(false)} className="py-2 text-sm text-white/80" href={link.href}>{link.label}</a>)}<a className="py-2 text-sm font-bold text-[#ff1680]" href="https://wa.me/5547991035449" target="_blank" rel="noreferrer">Agendar horário →</a></div>}
    </header>
  )
}
