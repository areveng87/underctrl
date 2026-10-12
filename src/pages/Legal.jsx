import { Link } from 'react-router-dom'
import { company as c } from '../config.js'
import { pathFor, useLang } from '../i18n/index.jsx'
import Fill from '../components/Fill.jsx'

const Val = ({ v }) => (String(v).startsWith('[COMPLETAR') ? <span className="pending">{v}</span> : v)

function Section({ s }) {
  const { lang, t } = useLang()
  const holder = t.legal.holder
  return (
    <>
      {s.h && <h2>{s.h}</h2>}
      {s.p?.map((p, i) => <p key={i}><Fill text={p} /></p>)}
      {s.holder && (
        <ul>
          {['legalName', 'nif', 'address', 'registry'].map((k) => <li key={k}>{holder[k]}: <Val v={c[k]} /></li>)}
          <li>{holder.email}: <a href={`mailto:${c.email}`}>{c.email}</a></li>
        </ul>
      )}
      {s.controller && (
        <p><Val v={c.legalName} /> · {holder.nif} <Val v={c.nif} /> · <Val v={c.address} /> · <a href={`mailto:${c.email}`}>{c.email}</a></p>
      )}
      {s.table && (
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead><tr>{s.table.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
            <tbody>{s.table.rows.map((r) => <tr key={r[0]}>{r.map((cell, i) => <td key={i}>{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
      )}
      {s.more && <p>{s.more[0]}<Link to={pathFor('privacy', lang)}>{s.more[1]}</Link>{s.more[2]}</p>}
    </>
  )
}

function LegalPage({ kind }) {
  const { t } = useLang()
  const l = t.legal
  return (
    <section className="legal">
      <div className="container legal__inner">
        <span className="eyebrow">{l.eyebrow}</span>
        <h1>{t.titles[kind]}</h1>
        <p className="updated">{l.updated}</p>
        {l.notice && <p className="legal__notice">{l.notice}</p>}
        {l[kind].map((s, i) => <Section key={i} s={s} />)}
      </div>
    </section>
  )
}

export const LegalNotice = () => <LegalPage kind="legal" />
export const Privacy = () => <LegalPage kind="privacy" />
export const Cookies = () => <LegalPage kind="cookies" />
