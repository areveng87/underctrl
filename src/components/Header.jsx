import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'
import Logo from './Logo.jsx'
import { LangDropdown } from './LangSwitch.jsx'
import { pathFor, useLang } from '../i18n/index.jsx'

export default function Header() {
  const { lang, t } = useLang()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname, hash } = useLocation()

  const links = [
    ['producto', t.nav.product], ['como-funciona', t.nav.how], ['autonomos', t.nav.freelancers],
    ['seguridad', t.nav.security], ['faq', t.nav.faq],
  ].map(([id, label]) => ({ to: pathFor('home', lang, id), label }))
  const contact = pathFor('home', lang, 'contacto')

  useEffect(() => { setOpen(false) }, [pathname, hash])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className={`header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container header__inner">
        <Link to={pathFor('home', lang)} className="brand" aria-label={t.nav.home}>
          <Logo aria-hidden="true" />
          <span className="brand__word">Under Ctrl</span>
        </Link>
        <nav className="nav" aria-label={t.nav.main}>
          {links.map((l) => <Link key={l.to} to={l.to}>{l.label}</Link>)}
        </nav>
        <div className="header__cta">
          <LangDropdown />
          <Link to={contact} className="btn btn--primary">
            {t.nav.cta} <ArrowRight className="arrow" aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav id="mobile-nav" className={`mobile-nav${open ? ' is-open' : ''}`} aria-label={t.nav.mobile} inert={!open}>
        {links.map((l) => <Link key={l.to} to={l.to}>{l.label}</Link>)}
        <Link to={contact} className="btn btn--primary">{t.nav.cta}</Link>
      </nav>
    </header>
  )
}
