export function StudioHero() {
  const backgroundFadeMask = "linear-gradient(to bottom, #000000 0%, #000000 68%, transparent 100%)"

  return (
    <section id="inicio" className="relative isolate flex items-start overflow-hidden bg-[#000000]/35 pt-20 text-white md:min-h-[760px] md:items-center md:pt-24">
      {/* Fundo MOBILE */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-top md:hidden"
        style={{
          backgroundImage: "url('/mobile/fundo_208_estudio_web.webp')",
          maskImage: backgroundFadeMask,
          WebkitMaskImage: backgroundFadeMask,
        }}
      />
      {/* Fundo DESKTOP */}
      <div
        className="absolute inset-0 -z-20 hidden bg-cover bg-center md:block"
        style={{
          backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AlpAdfD67aFW8xdXd5w6CnwXzvtjer.png')",
          maskImage: backgroundFadeMask,
          WebkitMaskImage: backgroundFadeMask,
        }}
      />
      {/* Overlay: leve no mobile, lateral no desktop */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#000000]/40 via-[#000000]/10 to-[#000000]/50 md:bg-gradient-to-r md:from-[#000000]/90 md:via-[#000000]/65 md:to-[#000000]/25" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[clamp(300px,46vh,420px)]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 22% 55%, rgba(255, 22, 128, 0.16), transparent 54%), radial-gradient(ellipse at 78% 42%, rgba(255, 22, 128, 0.12), transparent 52%), radial-gradient(ellipse at 50% 78%, rgba(139, 0, 63, 0.12), transparent 58%), linear-gradient(to bottom, transparent 0%, rgba(255, 22, 128, 0.035) 28%, rgba(139, 0, 63, 0.12) 48%, rgba(0, 0, 0, 0.68) 78%, #000000 100%)",
        }}
        aria-hidden="true"
      />
      <div className="relative z-0 mx-auto grid w-full max-w-7xl items-center gap-4 px-5 pb-10 pt-6 md:grid-cols-[1.1fr_.9fr] md:px-8 md:pb-24 md:pt-12">
        <div className="relative z-30 max-w-2xl">
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.28em] text-[#ff8abf]"><span className="h-px w-8 bg-[#ff1680]" /> Tatuagem · Joinville/SC</p>
          <h1 className="text-[clamp(3.25rem,16.5vw,4rem)] font-black leading-[.8] tracking-[-.06em] md:text-[clamp(4rem,7.2vw,7rem)] md:leading-[.78] md:tracking-[-.09em]">SUA PELE.<br /><span className="text-[#ff1680]">SUA</span><br />HISTÓRIA.</h1>
          <p className="mt-6 max-w-[18rem] text-base leading-relaxed text-white/70 md:mt-8 md:max-w-md md:text-lg">
            <span className="md:hidden">Tatuamos em Joinville desde 2020 e já atendemos mais de 10 mil clientes.</span>
            <span className="hidden md:inline">Tatuamos em Joinville desde 2020 e já atendemos mais de 10 mil clientes. Somos um estúdio inclusivo, voltado ao público LGBTQIA+ e às mulheres, com artistas de vários estilos e níveis de experiência.</span>
          </p>

          {/* Espaço reservado para a caneta 3D no mobile (a caneta se ancora aqui) */}
          <div id="pen-slot" className="h-[54vw] md:hidden" aria-hidden="true" />

          <div className="flex flex-wrap items-center justify-center gap-4 md:mt-8 md:justify-start">
            <a href="https://wa.me/5547991035449" target="_blank" rel="noreferrer" className="rounded-full bg-[#ff1680] px-7 py-4 text-sm font-extrabold text-black transition hover:-translate-y-0.5 hover:bg-white">Agendar pelo WhatsApp →</a>
            <a href="#minis" className="hidden px-3 py-3 text-sm font-semibold text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white md:inline">Pacote de minis</a>
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 text-xs uppercase tracking-[.16em] text-white/55 md:mt-12 md:justify-start md:border-t md:border-white/20 md:pt-5"><span>+10 mil clientes</span><span className="h-1 w-1 rounded-full bg-[#ff1680]"/><span>Desde 2020</span></div>
        </div>
        <div className="relative z-20 mx-auto hidden h-[520px] w-full max-w-[520px] items-center justify-center md:flex">
          <div className="absolute bottom-8 right-3 z-20 max-w-[190px] rotate-[-5deg] border border-white/25 bg-[#000000]/80 px-4 py-3 text-[10px] font-bold uppercase tracking-[.22em] text-white backdrop-blur">Traço com propósito.<br /><span className="text-[#ff8abf]">Arte sem fórmula.</span></div>
        </div>
      </div>
    </section>
  )
}