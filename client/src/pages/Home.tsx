/**
 * Oficina de Precisão: narrativa em trilhos técnicos, grafite profundo,
 * vermelho Precision como sinal de ação e dourado reservado para valor/calibração.
 */
import { useState } from "react";
import type { FormEvent } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowDownRight,
  ArrowRight,
  BatteryCharging,
  Bot,
  Check,
  ChevronRight,
  CircuitBoard,
  ClipboardCheck,
  Cpu,
  FileCheck2,
  Gauge,
  Menu,
  MessageCircle,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const WHATSAPP_NUMBER = ""; // Substitua apenas pelos dígitos do número, incluindo DDI e DDD.

const generalMessage =
  "Olá! Vim pelo site da Precision Automotive Brasil e gostaria de saber mais sobre os serviços de diagnóstico automotivo.";

function whatsappLink(message: string) {
  const base = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : "https://wa.me";
  return `${base}?text=${encodeURIComponent(message)}`;
}

type Service = {
  title: string;
  description: string;
  regular: string;
  promo: string;
  button: string;
  message: string;
  note?: string;
  icon: LucideIcon;
};

const services: Service[] = [
  {
    title: "Avaliação pré-compra com scanner",
    description:
      "Análise dos módulos eletrônicos, falhas armazenadas, sistemas, parâmetros e informações relevantes para apoiar sua decisão de compra.",
    regular: "R$ 249,90",
    promo: "R$ 159,90",
    button: "Agendar avaliação",
    message: "Olá! Gostaria de agendar uma Avaliação Pré-Compra com Scanner para meu veículo.",
    icon: ClipboardCheck,
  },
  {
    title: "Diagnóstico completo",
    description:
      "Leitura dos sistemas eletrônicos, identificação de códigos de falha, análise dos módulos disponíveis, testes e relatório com as informações encontradas.",
    regular: "R$ 199,90",
    promo: "R$ 129,90",
    button: "Agendar diagnóstico",
    message: "Olá! Gostaria de agendar um Diagnóstico Completo com Scanner.",
    icon: ScanLine,
  },
  {
    title: "Codificação de módulos / funções",
    description:
      "Codificação, programação e personalização de módulos e funções do veículo, conforme disponibilidade e compatibilidade do veículo e equipamento utilizado.",
    regular: "R$ 299,90",
    promo: "R$ 199,90",
    button: "Consultar codificação",
    message:
      "Olá! Gostaria de consultar a possibilidade de realizar uma codificação ou personalização no meu veículo.",
    note: "A disponibilidade da função depende da marca, modelo, ano, módulo e sistema do veículo.",
    icon: CircuitBoard,
  },
  {
    title: "Teste de bateria e sistema de carga",
    description:
      "Avaliação da bateria, alternador e sistema de carga, auxiliando na identificação de problemas de partida, tensão e alimentação elétrica.",
    regular: "R$ 99,90",
    promo: "R$ 69,90",
    button: "Agendar teste",
    message: "Olá! Gostaria de realizar um teste de bateria e sistema de carga.",
    icon: BatteryCharging,
  },
  {
    title: "Diagnóstico e regeneração de DPF",
    description:
      "Análise do sistema DPF/FAP, parâmetros do filtro de partículas, identificação de falhas e regeneração quando aplicável e tecnicamente recomendada.",
    regular: "R$ 349,90",
    promo: "R$ 249,90",
    button: "Consultar DPF",
    message:
      "Olá! Gostaria de realizar um diagnóstico do sistema DPF/FAP e verificar a possibilidade de regeneração.",
    note: "A regeneração somente será realizada quando as condições do veículo e do sistema permitirem o procedimento com segurança.",
    icon: Gauge,
  },
];

const faq = [
  [
    "O diagnóstico apaga as falhas do veículo?",
    "O objetivo principal do diagnóstico é identificar e analisar as falhas. A exclusão de códigos somente deve ser realizada quando tecnicamente apropriada.",
  ],
  [
    "O scanner consegue diagnosticar qualquer veículo?",
    "A cobertura depende da marca, modelo, ano, sistema e equipamento utilizado. Consulte a disponibilidade antes do atendimento.",
  ],
  [
    "Vocês fazem codificação?",
    "Sim, realizamos serviços de codificação e personalização quando a função é suportada pelo veículo e equipamento utilizado.",
  ],
  [
    "Vocês fazem programação de módulos?",
    "Alguns procedimentos de programação podem ser realizados conforme o veículo, módulo, sistema e equipamento disponível. Consulte previamente.",
  ],
  [
    "A avaliação pré-compra substitui uma vistoria cautelar?",
    "Não. A avaliação eletrônica é complementar e não substitui uma vistoria cautelar, inspeção estrutural ou avaliação mecânica completa.",
  ],
  ["Vocês emitem nota fiscal?", "Sim. A Precision Automotive Brasil emite Nota Fiscal de Serviço."],
  [
    "Preciso agendar?",
    "Recomendamos o agendamento prévio para garantir disponibilidade de atendimento.",
  ],
];

const navItems = [
  ["Início", "inicio"],
  ["Serviços", "servicos"],
  ["Valores", "valores"],
  ["Como funciona", "como-funciona"],
  ["Sobre nós", "sobre"],
  ["Dúvidas", "duvidas"],
  ["Contato", "contato"],
];

function PrecisionLogo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#inicio" className="group flex items-center gap-3" aria-label="Ir para o início">
      <span className={`brand-mark ${compact ? "h-11 w-11" : "h-14 w-14"}`}>
        <img src="/manus-storage/precision-logo-mark_f6efd070.png" alt="Símbolo Precision Automotive Brasil" />
      </span>
      <span className="leading-none">
        <strong className="brand-name">Precision</strong>
        <span className="brand-subtitle">Automotive Brasil</span>
      </span>
    </a>
  );
}

function SectionKicker({ children, number }: { children: string; number: string }) {
  return (
    <div className="section-kicker">
      <span>{number}</span>
      <i />
      {children}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const handleForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = [
      "Olá! Vim pelo site da Precision Automotive Brasil e gostaria de solicitar atendimento.",
      `Nome: ${form.get("nome")}`,
      `WhatsApp: ${form.get("whatsapp")}`,
      `Veículo: ${form.get("marca")} ${form.get("modelo")} — ${form.get("ano")}`,
      `Serviço desejado: ${form.get("servico")}`,
      `Mensagem: ${form.get("mensagem") || "Não informada"}`,
    ].join("\n");
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="precision-page">
      <header className="site-header">
        <div className="container flex items-center justify-between gap-5">
          <PrecisionLogo compact />
          <nav className="hidden xl:flex items-center gap-6" aria-label="Navegação principal">
            {navItems.map(([label, id]) => (
              <a key={id} href={`#${id}`} className="nav-link">
                {label}
              </a>
            ))}
          </nav>
          <a href={whatsappLink(generalMessage)} target="_blank" rel="noreferrer" className="header-cta hidden md:inline-flex">
            <MessageCircle size={17} />
            Agendar
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="menu-button xl:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <div className={`mobile-panel xl:hidden ${menuOpen ? "is-open" : ""}`}>
          {navItems.map(([label, id], index) => (
            <a key={id} href={`#${id}`} onClick={closeMenu} style={{ transitionDelay: `${index * 35}ms` }}>
              <span>0{index + 1}</span>
              {label}
              <ArrowDownRight size={17} />
            </a>
          ))}
          <a href={whatsappLink(generalMessage)} target="_blank" rel="noreferrer" className="button-primary justify-center" onClick={closeMenu}>
            <MessageCircle size={18} /> Agendar pelo WhatsApp
          </a>
        </div>
      </header>

      <main>
        <section id="inicio" className="hero-section">
          <div className="hero-image" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="container hero-content">
            <div className="hero-copy">
              <div className="hero-status"><span /> Diagnóstico eletrônico profissional</div>
              <PrecisionLogo />
              <p className="eyebrow">Curitiba e região <i /> Atendimento com agendamento</p>
              <h1>Diagnóstico automotivo <em>avançado.</em></h1>
              <p className="hero-lead">
                Tecnologia de ponta para descobrir falhas, avaliar sistemas eletrônicos e encontrar problemas que muitas vezes não aparecem no painel.
              </p>
              <p className="hero-support">
                Diagnóstico profissional com scanner, testes eletrônicos, leitura de falhas, testes ativos, codificação e muito mais.
              </p>
              <div className="hero-actions">
                <a href={whatsappLink(generalMessage)} target="_blank" rel="noreferrer" className="button-primary">
                  <MessageCircle size={19} /> Agendar pelo WhatsApp <ArrowRight size={17} />
                </a>
                <a href="#servicos" className="button-secondary"><ScanLine size={18} /> Ver nossos serviços</a>
              </div>
            </div>
            <div className="hero-instrument" aria-label="Indicadores de diagnóstico">
              <div className="instrument-top"><span>Leitura sistêmica</span><span>Estável</span></div>
              <div className="instrument-main"><Cpu size={33} /><span>ECU</span><strong>01</strong></div>
              <div className="instrument-line"><i /><i /><i /><i /><i /></div>
              <div className="instrument-bottom"><span>Scanner profissional</span><span>↗ Precisão</span></div>
            </div>
          </div>
          <a href="#destaques" className="hero-scroll"><span>Role para explorar</span><ArrowDownRight size={19} /></a>
        </section>

        <section id="destaques" className="feature-rail section-dark">
          <div className="container">
            <div className="rail-top"><span>CAPACIDADE TÉCNICA</span><span>04 / 04</span></div>
            <div className="feature-grid">
              {[
                ["Diagnóstico profissional", "Análise eletrônica completa utilizando equipamentos de diagnóstico profissional.", ScanLine],
                ["Testes ativos", "Verificação do funcionamento de componentes e sistemas eletrônicos do veículo.", Bot],
                ["Codificação de ECU", "Codificação, programação e personalização de módulos, quando suportado pelo veículo e equipamento.", CircuitBoard],
                ["Atendimento transparente", "Informações claras sobre o diagnóstico, serviços realizados e resultados encontrados.", ShieldCheck],
              ].map(([title, text, Icon], index) => {
                const FeatureIcon = Icon as LucideIcon;
                return (
                  <article className="feature-card" key={title as string}>
                    <span className="feature-number">0{index + 1}</span>
                    <FeatureIcon className="feature-icon" strokeWidth={1.6} />
                    <h2>{title as string}</h2>
                    <p>{text as string}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="servicos" className="services-section section-dark">
          <div className="container">
            <div className="section-heading services-heading">
              <div>
                <SectionKicker number="01">Serviços</SectionKicker>
                <h2>Nossos serviços <span>de diagnóstico.</span></h2>
              </div>
              <p>Diagnóstico completo com scanner profissional. Valores transparentes para você escolher o próximo passo com mais segurança.</p>
            </div>
            <div className="services-grid">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <article className={`service-card ${index === 1 ? "service-card--featured" : ""}`} key={service.title}>
                    <div className="service-card-top"><span>0{index + 1} / 05</span><Icon size={28} strokeWidth={1.55} /></div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    {service.note && <div className="service-note"><Sparkles size={14} /> {service.note}</div>}
                    <div className="price-block">
                      <span>De <s>{service.regular}</s></span>
                      <div><small>Por apenas</small><strong>{service.promo}</strong></div>
                    </div>
                    <a href={whatsappLink(service.message)} target="_blank" rel="noreferrer" className="service-button">
                      {service.button} <ChevronRight size={18} />
                    </a>
                  </article>
                );
              })}
              <article className="custom-service-card">
                <span className="custom-label">Atendimento sob consulta</span>
                <h3>Não encontrou o serviço que procura?</h3>
                <p>Trabalhamos com diversas funções de diagnóstico, testes e procedimentos eletrônicos. Consulte a disponibilidade para seu veículo.</p>
                <a href={whatsappLink("Olá! Gostaria de saber se a Precision Automotive Brasil realiza um determinado serviço no meu veículo.")} target="_blank" rel="noreferrer" className="button-primary">
                  <MessageCircle size={18} /> Falar com especialista
                </a>
              </article>
            </div>
          </div>
        </section>

        <section id="valores" className="price-ledger">
          <div className="container">
            <div className="ledger-intro">
              <SectionKicker number="02">Valores</SectionKicker>
              <h2>Preço claro. <span>Decisão segura.</span></h2>
              <p>Os valores promocionais estão visíveis desde o início. Selecione o serviço e fale conosco para confirmar a disponibilidade do seu veículo.</p>
            </div>
            <div className="ledger-list">
              {services.map((service, index) => (
                <a className="ledger-row" key={service.title} href={whatsappLink(service.message)} target="_blank" rel="noreferrer">
                  <span className="ledger-index">0{index + 1}</span>
                  <strong>{service.title}</strong>
                  <span className="ledger-was"><s>{service.regular}</s></span>
                  <span className="ledger-now"><small>por apenas</small>{service.promo}</span>
                  <ArrowRight className="ledger-arrow" size={22} />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="como-funciona" className="process-section">
          <div className="container">
            <div className="section-heading process-heading">
              <div><SectionKicker number="03">Como funciona</SectionKicker><h2>Do seu contato ao <span>diagnóstico claro.</span></h2></div>
              <a href={whatsappLink(generalMessage)} target="_blank" rel="noreferrer" className="text-link">Iniciar agendamento <ArrowRight size={17} /></a>
            </div>
            <ol className="process-track">
              {[
                ["Entre em contato", "Envie uma mensagem pelo WhatsApp informando marca, modelo, ano e serviço desejado."],
                ["Agendamento", "Nossa equipe verifica a disponibilidade e agenda o atendimento."],
                ["Diagnóstico", "O veículo é analisado utilizando equipamento de diagnóstico profissional."],
                ["Resultado", "Você recebe informações claras sobre os problemas encontrados e os procedimentos realizados."],
              ].map(([title, text], index) => (
                <li key={title}>
                  <span className="process-index">0{index + 1}</span>
                  <i className="process-dot" />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="choice-section section-dark">
          <div className="container choice-layout">
            <div className="choice-image"><img src="/manus-storage/precision-service-ecu_db182431.jpg" alt="Scanner profissional conectado a módulo eletrônico automotivo" /><div className="choice-image-tag"><span /> Leitura precisa</div></div>
            <div className="choice-content">
              <SectionKicker number="04">Por que escolher a Precision?</SectionKicker>
              <h2>Conhecimento técnico para <span>decisões melhores.</span></h2>
              <div className="choice-list">
                {[
                  ["Equipamentos de última geração", "Tecnologia avançada para diagnósticos precisos.", ScanLine],
                  ["Profissionais qualificados", "Experiência e atualização constante.", Wrench],
                  ["Atendimento transparente", "Compromisso com informações claras e segurança.", FileCheck2],
                  ["Serviço com responsabilidade", "Seu veículo e seu investimento tratados com responsabilidade.", ShieldCheck],
                ].map(([title, text, Icon]) => {
                  const ItemIcon = Icon as LucideIcon;
                  return <div className="choice-item" key={title as string}><ItemIcon size={19} /><div><h3>{title as string}</h3><p>{text as string}</p></div></div>;
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="trust-strip">
          <div className="container trust-content">
            <div className="trust-cross" aria-hidden="true">+</div>
            <p>Profissionalismo, transparência e confiança <em>em cada diagnóstico.</em></p>
            <div className="tax-note"><FileCheck2 size={24} /><span>Emitimos Nota Fiscal de Serviço<small>CNPJ 68.332.596/0001-60</small></span></div>
          </div>
        </section>

        <section id="sobre" className="about-section">
          <div className="container about-layout">
            <div className="about-aside"><SectionKicker number="05">Sobre a Precision</SectionKicker><p className="about-stamp">P • T • C</p><span>Precisão<br />Transparência<br />Confiança</span></div>
            <div className="about-copy">
              <h2>Sobre a Precision <span>Automotive Brasil.</span></h2>
              <p>A Precision Automotive Brasil nasceu com o objetivo de oferecer diagnóstico automotivo profissional, utilizando tecnologia e equipamentos avançados para auxiliar proprietários e profissionais na identificação de falhas e problemas eletrônicos.</p>
              <p>Nosso trabalho é baseado em três pilares: <strong>Precisão • Transparência • Confiança.</strong></p>
              <p>Nosso objetivo não é simplesmente apagar uma luz no painel, mas identificar informações relevantes do sistema do veículo e apresentar ao cliente um diagnóstico claro sobre o que foi encontrado.</p>
              <div className="scope-notice"><ShieldCheck size={22} /><span>O diagnóstico eletrônico é uma ferramenta de análise e não substitui necessariamente uma avaliação mecânica, estrutural ou cautelar completa.</span></div>
            </div>
          </div>
        </section>

        <section className="brands-section section-dark">
          <div className="container">
            <div className="brands-top"><div><SectionKicker number="06">Atendimento multimarca</SectionKicker><h2>O seu veículo merece <span>uma leitura precisa.</span></h2></div><p>Os serviços são realizados de acordo com a compatibilidade do veículo e dos equipamentos disponíveis.</p></div>
            <div className="brand-cloud" aria-label="Marcas automotivas atendidas conforme compatibilidade"><span>Volkswagen</span><span>Fiat</span><span>Chevrolet</span><span>Toyota</span><span>Honda</span><span>Jeep</span><span>BMW</span><span>Mercedes-Benz</span></div>
            <p className="brand-disclaimer">A disponibilidade de diagnóstico, testes, codificação e programação pode variar conforme marca, modelo, ano, módulo e sistema do veículo. Consulte previamente.</p>
          </div>
        </section>

        <section id="duvidas" className="faq-section">
          <div className="container faq-layout">
            <div className="faq-intro"><SectionKicker number="07">Dúvidas</SectionKicker><h2>Respostas diretas para <span>decidir com segurança.</span></h2><p>Ainda precisa confirmar algo sobre o seu veículo? Fale com a nossa equipe.</p><a href={whatsappLink(generalMessage)} target="_blank" rel="noreferrer" className="button-secondary"><MessageCircle size={18} /> Falar pelo WhatsApp</a></div>
            <Accordion type="single" collapsible className="faq-accordion">
              {faq.map(([question, answer], index) => <AccordionItem value={`item-${index}`} key={question}><AccordionTrigger>{question}</AccordionTrigger><AccordionContent>{answer}</AccordionContent></AccordionItem>)}
            </Accordion>
          </div>
        </section>

        <section id="contato" className="contact-section">
          <div className="contact-image" />
          <div className="container contact-layout">
            <div className="contact-copy"><SectionKicker number="08">Contato</SectionKicker><h2>Seu diagnóstico começa <span>com uma mensagem.</span></h2><p>Atendimento em Curitiba e Região, mediante agendamento. Informe os dados do veículo e o serviço desejado para que possamos orientar o próximo passo.</p><a href={whatsappLink(generalMessage)} target="_blank" rel="noreferrer" className="button-primary"><MessageCircle size={18} /> Falar pelo WhatsApp <ArrowRight size={17} /></a></div>
            <form className="contact-form" onSubmit={handleForm}>
              <div className="form-heading"><span>Solicitar atendimento</span><i>Dados enviados pelo WhatsApp</i></div>
              <div className="form-grid"><label>Nome<input name="nome" required placeholder="Como podemos chamar você?" /></label><label>WhatsApp<input name="whatsapp" required inputMode="tel" placeholder="(41) 99999-9999" /></label><label>Marca do veículo<input name="marca" required placeholder="Ex.: Volkswagen" /></label><label>Modelo<input name="modelo" required placeholder="Ex.: T-Cross" /></label><label>Ano<input name="ano" required inputMode="numeric" placeholder="Ex.: 2021" /></label><label>Serviço desejado<select name="servico" required defaultValue=""><option value="" disabled>Selecione uma opção</option>{services.map((service) => <option value={service.title} key={service.title}>{service.title}</option>)}<option value="Outro serviço">Outro serviço</option></select></label><label className="form-full">Mensagem<textarea name="mensagem" placeholder="Conte brevemente o que está acontecendo com o veículo." rows={3} /></label></div>
              <button type="submit" className="button-primary form-submit">Solicitar atendimento <ArrowRight size={17} /></button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-top"><PrecisionLogo /><a href={whatsappLink(generalMessage)} target="_blank" rel="noreferrer" className="button-primary"><MessageCircle size={18} /> WhatsApp</a></div>
        <div className="container footer-grid"><div><p>Diagnóstico Avançado. Soluções Precisas.</p><span>CNPJ 68.332.596/0001-60<br />Emitimos Nota Fiscal de Serviço</span></div><nav aria-label="Links do rodapé">{navItems.slice(0, 6).map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}<a href={whatsappLink(generalMessage)} target="_blank" rel="noreferrer">WhatsApp</a></nav></div>
        <div className="container footer-bottom"><span>© 2026 Precision Automotive Brasil. Todos os direitos reservados.</span><span>Diagnóstico eletrônico conforme compatibilidade do veículo e equipamento.</span></div>
      </footer>

      <a href={whatsappLink(generalMessage)} target="_blank" rel="noreferrer" className="floating-whatsapp" aria-label="Conversar pelo WhatsApp"><MessageCircle size={25} /><span>WhatsApp</span></a>
    </div>
  );
}
