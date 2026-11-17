const whatsappUrl = "https://wa.me/5547991035449"

const miniPrices = [
  { quantity: "1 mini", price: "R$ 100" },
  { quantity: "2 minis", price: "R$ 190" },
  { quantity: "3 minis", price: "R$ 270" },
  { quantity: "4 minis", price: "R$ 350" },
  { quantity: "5 minis", price: "R$ 425" },
]

const bookingSteps = [
  {
    number: "01",
    title: "Fale com a Kai",
    description: "Nossa atendente virtual recebe sua ideia, uma foto de referência e o local do corpo.",
  },
  {
    number: "02",
    title: "Receba seu orçamento",
    description: "Camila ou André assumem o atendimento. O orçamento tem validade de 15 dias.",
  },
  {
    number: "03",
    title: "Garanta sua data",
    description: "Um sinal de R$ 30 reserva data e horário e é descontado do valor final da tattoo.",
  },
]

const studioPolicies = [
  "Pagamento por Pix, cartão ou parcelado (com taxa). No dinheiro, 5% de desconto.",
  "Remarcações devem ser feitas com pelo menos 5 a 6 horas de antecedência.",
  "Retoque incluso em até 30 dias, sem custo.",
  "Atendemos a partir de 17 anos. Menores de 18 precisam de autorização e assinatura dos pais.",
  "Não tatuamos durante a gravidez ou amamentação.",
]

const aftercare = [
  "Dor é natural. Não coce nem retire as casquinhas.",
  "Evite sol, praia e piscina por 30 dias.",
  "Após 24 horas, use pomada própria para tatuagem por 10 dias; depois, hidratante normal.",
  "Use protetor solar somente depois de 20 dias.",
  "Mantenha a alimentação normal e evite comida de procedência duvidosa.",
]

export function StudioAbout() {
  return (
    <section id="sobre" className="bg-black px-5 py-16 text-white md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow">Sobre o 208</p>
        <div className="mt-4 grid gap-8 md:grid-cols-[1fr_.8fr] md:items-end">
          <h2 className="text-4xl font-black leading-[.95] tracking-[-.06em] sm:text-5xl">
            UM ESTÚDIO PRA <span className="text-[#ff1680]">SER VOCÊ.</span>
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
            Somos um estúdio inclusivo, voltado ao público LGBTQIA+ e às mulheres. Aqui, cada pessoa
            é bem-vinda para criar uma tatuagem com a própria identidade.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <article className="border border-white/10 bg-[#090909] p-6 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#ff1680]">Time completo</p>
            <h3 className="mt-4 text-2xl font-black">Do primeiro traço à experiência.</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Temos tatuadores iniciantes e profissionais com mais de 4, 7, 10 e 15 anos de
              profissão. Cada artista tem seu preço conforme a experiência.
            </p>
          </article>
          <article className="border border-white/10 bg-[#090909] p-6 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#ff1680]">Nossos estilos</p>
            <h3 className="mt-4 text-2xl font-black">Uma ideia, muitos caminhos.</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Realismo, fine line, blackwork, pontilhismo, old school, neotrad, floral, mandala,
              escrita, geek, anime e comercial.
            </p>
          </article>
          <article className="border border-white/10 bg-[#090909] p-6 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#ff1680]">Cursos de tattoo</p>
            <h3 className="mt-4 text-2xl font-black">Aprenda do começo.</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Curso para iniciantes, com 36 a 40 horas. Tem fine line, old school, blackwork, traço
              fino e grosso, scoop line, pintura sólida, sombra, rastelado e pontilhismo.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex text-sm font-bold text-[#ff8abf] transition hover:text-white"
            >
              Pergunte sobre as próximas turmas →
            </a>
          </article>
        </div>
      </div>
    </section>
  )
}

export function MiniPackage() {
  return (
    <section id="minis" className="bg-black px-5 py-10 text-white md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-10">
        <div>
          <p className="eyebrow">Pacote de minis</p>
          <h2 className="mt-3 text-[1.7rem] font-black leading-[.98] tracking-[-.05em] min-[400px]:text-3xl sm:text-5xl md:mt-4 md:leading-[.95] md:tracking-[-.06em]">
            PEQUENAS NO TAMANHO.
            <br />
            <span className="text-[#ff1680]">GRANDES NA IDEIA.</span>
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/60 md:mt-5 md:text-base">
            Minis de 3 a 5 cm, minimalistas e com quase nada de sombra. Todas na mesma pessoa e no
            mesmo dia. Quanto mais minis, menor o valor de cada uma.
          </p>
          <p className="mt-3 text-sm text-white/60 md:mt-4">
            Mini colorida: <span className="font-bold text-white">+ R$ 50</span>. Demais trabalhos:
            orçamento personalizado com a equipe.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex w-full justify-center rounded-full bg-[#ff1680] px-6 py-3 text-sm font-bold text-black transition hover:bg-white sm:w-auto md:mt-7"
          >
            Consultar disponibilidade →
          </a>
        </div>

        <div className="border border-[#ff1680]/35 bg-[#090909] p-4 sm:p-8">
          <div className="mb-2 grid grid-cols-2 border-b border-white/10 pb-2 text-xs font-bold uppercase tracking-[.2em] text-white/45 md:mb-4 md:pb-3">
            <span>Quantidade</span>
            <span className="text-right">Valor</span>
          </div>
          <dl>
            {miniPrices.map((item) => (
              <div
                key={item.quantity}
                className="grid grid-cols-2 border-b border-white/10 py-2.5 last:border-0 md:py-4"
              >
                <dt className="text-white/75">{item.quantity}</dt>
                <dd className="text-right text-base font-black text-[#ff8abf] md:text-lg">{item.price}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

export function BookingGuide() {
  return (
    <section id="como-agendar" className="bg-black px-5 py-16 text-white md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow">Como agendar</p>
        <div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <h2 className="text-4xl font-black leading-[.95] tracking-[-.06em] sm:text-5xl">
            SIMPLES E <span className="text-[#ff1680]">DIRETO.</span>
          </h2>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit rounded-full border border-[#ff1680] px-5 py-3 text-sm font-semibold transition hover:bg-[#ff1680] hover:text-black"
          >
            Chame no WhatsApp →
          </a>
        </div>

        <div className="mt-9 grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
          {bookingSteps.map((step) => (
            <article key={step.number} className="bg-[#080808] p-6 sm:p-8">
              <span className="font-mono text-sm text-[#ff1680]">{step.number}</span>
              <h3 className="mt-5 text-2xl font-black">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{step.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="eyebrow">Informações importantes</p>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              Para você saber o que esperar e se organizar antes de marcar.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {studioPolicies.map((policy) => (
              <li key={policy} className="border-l border-[#ff1680]/70 pl-4 text-sm leading-relaxed text-white/70">
                {policy}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function TattooCare() {
  return (
    <section id="cuidados" className="bg-[#080808] px-5 py-16 text-white md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[.8fr_1.2fr]">
        <div>
          <p className="eyebrow">Cuidados pós-tattoo</p>
          <h2 className="mt-4 text-4xl font-black leading-[.95] tracking-[-.06em] sm:text-5xl">
            CUIDE DA SUA <span className="text-[#ff1680]">ARTE.</span>
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-white/60">
            A cicatrização leva cerca de 30 dias. Siga os cuidados e, se algo parecer estranho,
            chame a equipe.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex text-sm font-bold text-[#ff8abf] transition hover:text-white"
          >
            Fale com a equipe →
          </a>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {aftercare.map((instruction, index) => (
            <li key={instruction} className="flex gap-4 border border-white/10 bg-black p-5">
              <span className="font-mono text-sm text-[#ff1680]">0{index + 1}</span>
              <span className="text-sm leading-relaxed text-white/70">{instruction}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function StudioLocation() {
  const mapUrl =
    "https://www.google.com/maps/search/?api=1&query=Servid%C3%A3o+Harry+Kormann%2C+81%2C+Bucarein%2C+Joinville%2FSC"

  return (
    <section id="localizacao" className="bg-black px-5 py-16 text-white md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_.8fr]">
        <div>
          <p className="eyebrow">Onde estamos</p>
          <h2 className="mt-4 text-4xl font-black leading-[.95] tracking-[-.06em] sm:text-5xl">
            VEM PRO <span className="text-[#ff1680]">208.</span>
          </h2>
          <address className="mt-6 max-w-lg not-italic text-lg leading-relaxed text-white/80">
            Rua Servidão Harry Kormann, 81
            <br />
            Bucarein, Joinville/SC
          </address>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/55">
            Perto do Hospital São José, atrás do posto de gasolina da Getúlio, ao lado do centro.
          </p>
        </div>
        <div className="border border-white/10 bg-[#090909] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#ff1680]">Funcionamento</p>
          <p className="mt-3 text-2xl font-black">De segunda a sábado</p>
          <p className="mt-2 text-sm leading-relaxed text-white/55">
            Em alguns domingos, conforme combinado com o cliente.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={mapUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#ff1680] px-5 py-3 text-sm font-bold text-black transition hover:bg-white"
            >
              Abrir no Google Maps →
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/25 px-5 py-3 text-sm font-semibold transition hover:border-[#ff1680] hover:text-[#ff8abf]"
            >
              WhatsApp (47) 99103-5449
            </a>
          </div>
          <a
            href="https://instagram.com/208estudio/"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex text-sm text-white/50 transition hover:text-[#ff8abf]"
          >
            @208estudio
          </a>
        </div>
      </div>
    </section>
  )
}