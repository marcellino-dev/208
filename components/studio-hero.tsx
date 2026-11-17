export function StudioHero() {
  const backgroundFadeMask = "linear-gradient(to bottom, #000000 0%, #000000 68%, transparent 100%)"

  return (
    <section id="inicio" className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#000000]/35 pt-24 text-white md:min-h-[760px]">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AlpAdfD67aFW8xdXd5w6CnwXzvtjer.png')",
          maskImage: backgroundFadeMask,
          WebkitMaskImage: backgroundFadeMask,
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#000000]/90 via-[#000000]/65 to-[#000000]/25" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[clamp(300px,46vh,420px)]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 22% 55%, rgba(255, 22, 128, 0.16), transparent 54%), radial-gradient(ellipse at 78% 42%, rgba(255, 22, 128, 0.12), transparent 52%), radial-gradient(ellipse at 50% 78%, rgba(139, 0, 63, 0.12), transparent 58%), linear-gradient(to bottom, transparent 0%, rgba(255, 22, 128, 0.035) 28%, rgba(139, 0, 63, 0.12) 48%, rgba(0, 0, 0, 0.68) 78%, #000000 100%)",
        }}
        aria-hidden="true"
      />
      <div className="relative z-0 mx-auto grid w-full max-w-7xl items-center gap-4 px-5 pb-20 pt-12 md:grid-cols-[1.1fr_.9fr] md:px-8 md:pb-24">
        <div className="relative z-30 max-w-2xl">
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.28em] text-[#ff8abf]"><span className="h-px w-8 bg-[#ff1680]" /> Tatuagem · Joinville/SC</p>
          <h1 className="text-[clamp(3.25rem,16.5vw,4rem)] font-black leading-[.78] tracking-[-.09em] md:text-[clamp(4rem,7.2vw,7rem)]">SUA PELE.<br /><span className="text-[#ff1680]">SUA</span><br />HISTÓRIA.</h1>
          <p className="mt-8 max-w-md text-base leading-relaxed text-white/70 md:text-lg">Tatuamos em Joinville desde 2020 e já atendemos mais de 10 mil clientes. Somos um estúdio inclusivo, voltado ao público LGBTQIA+ e às mulheres, com artistas de vários estilos e níveis de experiência.</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="https://wa.me/5547991035449" target="_blank" rel="noreferrer" className="rounded-full bg-[#ff1680] px-7 py-4 text-sm font-extrabold text-black transition hover:-translate-y-0.5 hover:bg-white">Agendar pelo WhatsApp →</a>
            <a href="#minis" className="px-3 py-3 text-sm font-semibold text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white">Pacote de minis</a>
          </div>
          <div className="mt-12 flex items-center gap-6 border-t border-white/20 pt-5 text-xs uppercase tracking-[.16em] text-white/55"><span>+10 mil clientes</span><span className="h-1 w-1 rounded-full bg-[#ff1680]"/><span>Desde 2020</span></div>
        </div>
        <div className="relative z-20 mx-auto hidden h-[520px] w-full max-w-[520px] items-center justify-center md:flex">
          <div className="absolute bottom-8 right-3 z-20 max-w-[190px] rotate-[-5deg] border border-white/25 bg-[#000000]/80 px-4 py-3 text-[10px] font-bold uppercase tracking-[.22em] text-white backdrop-blur">Traço com propósito.<br /><span className="text-[#ff8abf]">Arte sem fórmula.</span></div>
        </div>
      </div>
    </section>
  )
}
