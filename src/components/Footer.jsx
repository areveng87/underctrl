import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import { LangPills } from './LangSwitch.jsx'
import { company } from '../config.js'
import { pathFor, useLang } from '../i18n/index.jsx'

export default function Footer() {
  const { lang, t } = useLang()
  const f = t.footer
  const year = new Date().getFullYear()
  const h = (id) => pathFor('home', lang, id)
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <Link to={pathFor('home', lang)} className="brand" aria-label={t.nav.home}>
              <Logo aria-hidden="true" />
              <span className="brand__word">Under Ctrl</span>
            </Link>
            <p className="footer__about">{f.about}</p>
            <LangPills />
          </div>
          <div>
            <h4>{f.product}</h4>
            <ul>
              <li><Link to={h('producto')}>{f.links.areas}</Link></li>
              <li><Link to={h('funciones')}>{f.links.features}</Link></li>
              <li><Link to={h('autonomos')}>{f.links.freelancers}</Link></li>
              <li><Link to={h('seguridad')}>{f.links.security}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{f.company}</h4>
            <ul>
              <li><Link to={h('contacto')}>{f.links.contact}</Link></li>
              <li><Link to={h('faq')}>{f.links.faq}</Link></li>
              <li><a href={`mailto:${company.email}`}>{company.email}</a></li>
            </ul>
          </div>
          <div>
            <h4>{f.legal}</h4>
            <ul>
              <li><Link to={pathFor('legal', lang)}>{t.titles.legal}</Link></li>
              <li><Link to={pathFor('privacy', lang)}>{t.titles.privacy}</Link></li>
              <li><Link to={pathFor('cookies', lang)}>{t.titles.cookies}</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {year} UnderControl · {company.domain}</span>
          <span>{f.made}</span>
        </div>
      </div>
    </footer>
  )
}
