import { ContentOverrides } from "./components/ContentOverrides";
import { SiteAnimations } from "./components/SiteAnimations";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://psibethaniasaraiva.com.br/#website",
        url: "https://psibethaniasaraiva.com.br/",
        name: "Bethania Saraiva Psicóloga Clínica",
        inLanguage: "pt-BR",
        description:
          "Site oficial de Bethania Saraiva, psicóloga clínica em Carlos Barbosa, RS.",
      },
      {
        "@type": ["LocalBusiness", "ProfessionalService", "MedicalBusiness"],
        "@id": "https://psibethaniasaraiva.com.br/#bethania-saraiva",
        name: "Bethania Saraiva Psicóloga Clínica",
        url: "https://psibethaniasaraiva.com.br/",
        image: "https://psibethaniasaraiva.com.br/assets/bethania-retrato.png",
        description:
          "Psicoterapia clínica presencial em Carlos Barbosa e atendimento online com escuta acolhedora, ética e individualizada.",
        telephone: "+5551980602305",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Rua Salgado Filho, 90, sala 501",
          addressLocality: "Carlos Barbosa",
          addressRegion: "RS",
          postalCode: "95185-000",
          addressCountry: "BR",
        },
        areaServed: [
          {
            "@type": "City",
            name: "Carlos Barbosa",
          },
          {
            "@type": "Country",
            name: "Brasil",
          },
        ],
        sameAs: ["https://www.instagram.com/psibethaniasaraiva/"],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+5551980602305",
          contactType: "agendamento",
          availableLanguage: "Portuguese",
        },
        makesOffer: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Psicoterapia Clínica",
              areaServed: "Carlos Barbosa, RS",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Atendimento Online",
              areaServed: "Brasil",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteAnimations />
      <ContentOverrides />
      <main>
        <section className="hero" aria-labelledby="page-title">
          <div className="container">
            <div className="hero__heading reveal">
              <h1 id="page-title">Bethania Saraiva,<br />Psicóloga Clínica</h1>
              <a className="address" href="https://maps.app.goo.gl/PQoBA5RxTw1834p67" target="_blank" rel="noopener noreferrer" aria-label="Ver endereço no Google Maps">
                <span>R. Salgado Filho, 90 - Sl 501 - Centro, Carlos Barbosa - RS, 95185-000</span>
                <span>Sala 501, Carlos Barbosa</span>
              </a>
            </div>
          </div>
          <figure className="hero__image reveal">
            <img src="/assets/hero.jpg" alt="Mulher sentindo o aroma de flores brancas" width="1447" height="597" fetchPriority="high" />
          </figure>
        </section>

        <section className="intro" aria-label="Apresentação profissional">
          <div className="container intro__grid">
            <figure className="intro__portrait reveal">
              <img src="/assets/bethania-atendimento.jpg" alt="Bethania Saraiva em seu consultório" width="712" height="887" loading="lazy" />
            </figure>
            <div className="intro__copy reveal">
              <p>Mãe de quatro filhos e esposa, acredito no cuidado que nasce da escuta e da compreensão. Ofereço um espaço acolhedor e seguro para olhar com atenção para suas emoções, desafios e experiências.</p>
              <p>Meu trabalho parte de uma escuta sensível, ética e individualizada, respeitando sua história, seu tempo e suas necessidades. A psicoterapia pode ajudar a compreender padrões, lidar com momentos difíceis e construir novas formas de se relacionar consigo e com a própria vida.</p>
            </div>
          </div>
        </section>

        <section className="paths" aria-labelledby="paths-title">
          <div className="container">
            <h2 id="paths-title" className="reveal">Caminhos que podemos construir juntos:</h2>
            <div className="services">
              <article className="service reveal">
                <figure className="service__media"><img src="/assets/psicoterapia.jpg" alt="Sessão de psicoterapia presencial" width="469" height="301" loading="lazy" /></figure>
                <h3>Psicoterapia Clínica</h3>
                <p>Um espaço de escuta para compreender emoções e lidar melhor com os desafios do dia a dia.</p>
              </article>
              <article className="service reveal">
                <figure className="service__media"><img src="/assets/relacoes.jpg" alt="Conversa durante uma sessão de psicoterapia" width="494" height="301" loading="lazy" /></figure>
                <h3>Relações e formas de se comunicar</h3>
                <p>Apoio para fortalecer vínculos, melhorar a comunicação e construir relações mais saudáveis.</p>
              </article>
              <article className="service reveal">
                <figure className="service__media"><img src="/assets/online.jpg" alt="Pessoa participando de atendimento online" width="473" height="301" loading="lazy" /></figure>
                <h3>Atendimento Online</h3>
                <p>Psicoterapia com mais praticidade e flexibilidade, em um espaço seguro e confidencial, onde você estiver.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="consulting-room" id="consultorio" aria-labelledby="consulting-room-title">
          <div className="container consulting-room__frame reveal">
            <div className="consulting-room__grid">
              <div className="consulting-room__copy">
                <p className="consulting-room__eyebrow">Consultório</p>
                <h2 id="consulting-room-title">Um espaço pensado para <em>acolher você</em></h2>
                <span className="consulting-room__rule" aria-hidden="true" />
                <p className="consulting-room__text">Um ambiente calmo, confortável e seguro, onde você pode ser quem é, no seu tempo, com liberdade para sentir, falar e se escutar.</p>
                <a className="button" href="https://maps.app.goo.gl/PQoBA5RxTw1834p67" target="_blank" rel="noopener noreferrer">Conheça o consultório&nbsp;&nbsp;→</a>
              </div>
              <figure className="consulting-room__photo consulting-room__photo--main"><img src="/assets/consultorio-principal.png" alt="Ambiente acolhedor do consultório" width="469" height="301" loading="lazy" /></figure>
              <figure className="consulting-room__photo consulting-room__photo--detail"><img src="/assets/consultorio-detalhe-1.png" alt="Detalhes do consultório" width="494" height="301" loading="lazy" /></figure>
              <figure className="consulting-room__photo consulting-room__photo--detail"><img src="/assets/consultorio-detalhe-2.png" alt="Espaço de atendimento do consultório" width="473" height="301" loading="lazy" /></figure>
            </div>
            <div className="consulting-room__footer" aria-hidden="true"><span className="consulting-room__footer-line" /></div>
          </div>
        </section>

        <section className="about" id="sobre" aria-labelledby="about-title">
          <div className="container about__grid">
            <figure className="about__photo reveal"><img src="/assets/bethania-retrato.png" alt="Retrato da psicóloga Bethania Saraiva" width="796" height="871" loading="lazy" /></figure>
            <div className="about__panel reveal">
              <div>
                <h2 id="about-title">Sobre mim:</h2>
                <p className="about__text">Acredito que cada pessoa carrega uma história única, atravessada por experiências, afetos, escolhas e desafios.<br />Na psicoterapia, busco construir um espaço de escuta, acolhimento e reflexão, onde seja possível compreender melhor o que você sente e encontrar novos caminhos.<br />Esse processo acontece no seu tempo, respeitando quem você é e o momento que está vivendo.</p>
              </div>
              <a className="button" href="https://wa.me/5551980602305">Entrar em Contato</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" id="contato">
        <div className="container footer__inner">
          <a className="button" href="https://wa.me/5551980602305" target="_blank" rel="noopener noreferrer">Entrar em Contato</a>
          <div className="footer__wordmark" aria-hidden="true">Bethania</div>
        </div>
        <nav className="legal" aria-label="Links legais">
          <a href="https://www.instagram.com/psibethaniasaraiva/">Instagram</a>
          <a href="https://wa.me/5551980602305">Whatsapp</a>
        </nav>
      </footer>
    </>
  );
}
