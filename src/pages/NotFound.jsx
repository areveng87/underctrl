import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { pathFor, useLang } from '../i18n/index.jsx'

export default function NotFound() {
  const { lang, t } = useLang()
  return (
    <section className="notfound">
      <div>
        <p className="mono">{t.notFound.code}</p>
        <h1>{t.notFound.title}</h1>
        <Link to={pathFor('home', lang)} className="btn btn--primary">{t.notFound.back} <ArrowRight className="arrow" aria-hidden="true" /></Link>
      </div>
    </section>
  )
}
