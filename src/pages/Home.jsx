import { Link } from 'react-router-dom'
import {
  ArrowRight, Check, Wallet, Landmark, Bot, Mail, ScanLine, ArrowLeftRight, ChartColumn, Send, Link2,
  Bell, CalendarClock, ShieldCheck, KeyRound, Lock, BadgeCheck, User, Briefcase, Building2, Plus,
  FileText, Calculator, FileSpreadsheet, Receipt, CircleCheck, CircleAlert, Languages,
} from 'lucide-react'
import PhoneMock from '../components/PhoneMock.jsx'
import InView from '../components/InView.jsx'
import ContactForm from '../components/ContactForm.jsx'
import Fill from '../components/Fill.jsx'
import { company } from '../config.js'
import { LANGS, pathFor, useLang } from '../i18n/index.jsx'

// Iconos en el mismo orden que los textos de cada sección del diccionario
const areaIcons = [<Wallet key="w" />, <Landmark key="l" />, <Bot key="b" />]
const freelancerIcons = [<Calculator key="c" />, <FileText key="f" />, <FileSpreadsheet key="s" />, <Receipt key="r" />]
const featureIcons = [<Mail key="1" />, <ScanLine key="2" />, <ArrowLeftRight key="3" />, <ChartColumn key="4" />, <Send key="5" />, <Link2 key="6" />, <Bell key="7" />, <CalendarClock key="8" />]
const personaIcons = [<User key="u" />, <Briefcase key="b" />, <Building2 key="o" />]
const securityIcons = [<KeyRound key="k" />, <Lock key="l" />, <ShieldCheck key="s" />, <BadgeCheck key="b" />]
const chipIcons = [<CircleCheck key="ok" />, <CircleAlert key="warn" />, null]
const chipClass = ['chip chip--ok', 'chip chip--warn', 'chip']

export default function Home() {
  const { lang, t } = useLang()
  const { hero, strip, areas, steps, freelancer: fr, features, audience, security, faq, contact } = t
  const languages = LANGS.map((l) => l.name).join(' · ')

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero__grid">
          <div>
            <span className="eyebrow">{hero.eyebrow}</span>
            <h1>{hero.h1[0]}<em>{hero.h1[1]}</em>{hero.h1[2]}</h1>
            <p className="hero__lead">{hero.lead}</p>
            <div className="hero__actions">
              <Link to={pathFor('home', lang, 'contacto')} className="btn btn--primary">{hero.cta} <ArrowRight className="arrow" aria-hidden="true" /></Link>
              <Link to={pathFor('home', lang, 'como-funciona')} className="btn btn--ghost">{hero.secondary}</Link>
            </div>
            <div className="hero__meta">
              {hero.meta.map((m) => <span key={m}><Check aria-hidden="true" /> {m}</span>)}
              <span><Languages aria-hidden="true" style={{ color: 'var(--muted)' }} /> ES · EN · PT · CA</span>
            </div>
          </div>
          <PhoneMock />
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section className="strip" aria-label={strip.aria}>
        <div className="container strip__inner">
          <p className="strip__label">{strip.label}</p>
          <ul className="strip__list">
            {strip.items.map((i) => <li key={i}>{i}</li>)}
          </ul>
        </div>
      </section>

      {/* AREAS */}
      <section className="section" id="producto">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{areas.eyebrow}</span>
            <h2>{areas.title}</h2>
            <p>{areas.lead}</p>
          </div>
          <div className="areas">
            {areas.items.map((a, i) => (
              <div key={a.title} className={`area${i === 1 ? ' area--feature' : ''}`}>
                <div className="area__icon" aria-hidden="true">{areaIcons[i]}</div>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
                <ul>
                  {a.items.map((it) => <li key={it}><Check aria-hidden="true" />{it}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" id="como-funciona" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{steps.eyebrow}</span>
            <h2>{steps.title}</h2>
          </div>
          <ol className="steps" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {steps.items.map((s, i) => (
              <li key={s.title} className="step">
                <span className="step__num">0{i + 1} / 03</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FREELANCERS */}
      <section className="section" id="autonomos" style={{ background: 'var(--paper-2)' }}>
        <div className="container split">
          <div>
            <div className="section-head">
              <span className="eyebrow">{fr.eyebrow}</span>
              <h2>{fr.title}</h2>
              <p>{fr.lead}</p>
            </div>
            <ul className="checklist">
              {fr.items.map((f, i) => (
                <li key={f.title}>
                  <span aria-hidden="true">{freelancerIcons[i]}</span>
                  <div><strong>{f.title}</strong><span>{f.text}</span></div>
                </li>
              ))}
            </ul>
          </div>
          <InView className="print">
            <div className="receipt" role="img" aria-label={fr.receipt.aria}>
              <div className="receipt__head" aria-hidden="true">
                <strong>{fr.receipt.title}</strong>
                <span>{fr.receipt.sub}</span>
              </div>
              <div aria-hidden="true">
                <hr />
                {fr.receipt.rows.map(([k, v, sub], i) => (
                  <div key={i} className={`receipt__row${sub ? ' sub' : ''}`}><span className="k">{k}</span><span className="v">{v}</span></div>
                ))}
                <hr />
                <div className="receipt__row total"><span className="k">{fr.receipt.total[0]}</span><span className="v">{fr.receipt.total[1]}</span></div>
                <div className="receipt__foot">
                  {fr.receipt.chips.map((c, i) => <span key={c} className={chipClass[i]}>{chipIcons[i]}{c}</span>)}
                </div>
              </div>
            </div>
          </InView>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section" id="funciones">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{features.eyebrow}</span>
            <h2>{features.title}</h2>
            <p>{features.lead}</p>
          </div>
          <div className="features">
            {features.items.map((f, i) => (
              <article key={f.title} className="feature">
                <span aria-hidden="true">{featureIcons[i]}</span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{audience.eyebrow}</span>
            <h2>{audience.title}</h2>
          </div>
          <div className="audience">
            {audience.items.map((p, i) => (
              <div key={p.tag} className="persona">
                <div className="persona__top"><span className="eyebrow">{p.tag}</span><span aria-hidden="true">{personaIcons[i]}</span></div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <div className="persona__quote" aria-hidden="true">{p.quote}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="section dark" id="seguridad">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{security.eyebrow}</span>
            <h2>{security.title}</h2>
            <p>{security.lead}</p>
          </div>
          <div className="sec-grid">
            {security.items.map((s, i) => (
              <div key={s.title} className="sec">
                <div className="sec__icon" aria-hidden="true">{securityIcons[i]}</div>
                <div><h3>{s.title}</h3><p>{s.text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="container faq-wrap">
          <div className="section-head">
            <span className="eyebrow">{faq.eyebrow}</span>
            <h2>{faq.title}</h2>
            <p><Fill text={faq.lead} /></p>
          </div>
          <div className="faq">
            {faq.items.map((f) => (
              <details key={f.q}>
                <summary>{f.q}<Plus aria-hidden="true" /></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section contact" id="contacto">
        <div className="container contact__grid">
          <div>
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="eyebrow">{contact.eyebrow}</span>
              <h2>{contact.title}</h2>
              <p>{contact.lead}</p>
            </div>
            <div className="contact__info">
              <a href={`mailto:${company.email}`}><Mail aria-hidden="true" />{company.email}</a>
              <div><Languages aria-hidden="true" />{languages}</div>
            </div>
          </div>
          <div>
            <ContactForm key={lang} />
          </div>
        </div>
      </section>
    </>
  )
}
