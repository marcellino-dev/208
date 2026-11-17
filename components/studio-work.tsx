import Image from "next/image"

const tattoos = [
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EvEQVNZc8tYdgHpTfAYfVdbKoNemwO.png", alt: "Tatuagem blackwork de figura alada na cabeça", label: "Blackwork · cobertura" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-zpwXDNlgTE45ifoGHt28EW8ElBVEZG.png", alt: "Tatuagem fine line abstrata com estrelas", label: "Fine line · autoral" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5dptDw8d5CsZi4OadLwy80suHhyXR7.png", alt: "Tatuagem de dragão em tinta vermelha", label: "Colorido · oriental" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4K3S1TxSLhmFSN4xdff4gLAztlFppI.png", alt: "Tatuagem blackwork de polvo no braço", label: "Blackwork · natureza" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xoUwRqiFV7X151heKV0EegpEForgDv.png", alt: "Pantera tradicional e mariposa tatuadas na perna", label: "Old school · colorido" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RWRAwf1WrrnHBopgfmPIbdufFd0RLl.png", alt: "Tatuagem realista de cavaleiro em um braço", label: "Realismo · black and grey" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3iKUtSlfiGzvtCQSaNGXGdRmqQCXTA.png", alt: "Tatuagem de personagens ilustrados no pulso", label: "Cartoon · fine line" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-eIPJ65yAlxoQWIaCgLAp7xXkDyEvci.png", alt: "Tatuagem detalhada de figura feminina na coxa", label: "Blackwork · ornamental" },
]

export function TattooGallery() {
  return (
    <section id="trabalhos" className="px-5 py-16 text-white md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 md:mb-14 md:flex-row md:items-end">
          <div><p className="eyebrow text-[#ff8abf]">Feitas aqui. Levadas pra vida.</p><h2 className="mt-3 text-4xl font-black leading-[.95] tracking-[-.06em] md:text-6xl">TINTA NA PELE.<br /><span className="text-[#ff1680]">ARTE NO MUNDO.</span></h2></div>
          <p id="gallery-caption" className="max-w-sm text-sm leading-relaxed text-white/55">Preto e cinza, colorido, old school colorido, fine art e microrealismo. A próxima história pode ser a sua.</p>
        </div>
        <div className="columns-2 gap-3 md:columns-4 md:gap-4">
          {tattoos.map((tattoo, index) => <figure key={tattoo.src} data-reveal-item className="group relative mb-3 break-inside-avoid overflow-hidden bg-white/5 will-change-transform md:mb-4">
            <Image src={tattoo.src} alt={tattoo.alt} width={700} height={900} sizes="(max-width: 768px) 50vw, 25vw" className="h-auto w-full transition duration-700 group-hover:scale-[1.03]" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-3 pb-3 pt-9 text-[9px] uppercase tracking-[.16em] text-white/80 sm:px-4 sm:pb-4 sm:text-[10px]">{tattoo.label}</figcaption>
            <span className="absolute right-3 top-3 font-mono text-[10px] text-white/70">0{index + 1}</span>
          </figure>)}
        </div>
      </div>
    </section>
  )
}

export function StudioFooter() {
  return <footer id="estudio" className="bg-[#ff1680] px-5 py-16 text-[#000000] md:px-8 md:py-20"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-[.28em]">208 estúdio · Joinville</p><h2 className="mt-5 text-[clamp(2.75rem,13vw,3rem)] font-black leading-[.88] tracking-[-.07em] md:text-7xl">TUA IDEIA<br />MERECE <span className="text-white">PELE.</span></h2></div><div className="max-w-sm"><p className="mb-5 text-sm leading-relaxed">Conta pra gente o que você tá imaginando. A gente ajuda a transformar em tattoo.</p><a href="https://wa.me/5547991035449" target="_blank" rel="noreferrer" className="inline-flex rounded-full border border-black px-6 py-3 text-sm font-extrabold transition hover:bg-black hover:text-white">Chama no WhatsApp →</a><p className="mt-8 text-xs text-black/65">© 208 Estúdio · Joinville, SC</p></div></div></footer>
}
