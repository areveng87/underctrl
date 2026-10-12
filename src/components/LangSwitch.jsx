import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Globe, Check, ChevronDown } from 'lucide-react'
import { LANGS, pathFor, useLang } from '../i18n/index.jsx'

const remember = (code) => { try { localStorage.setItem('uc-lang', code) } catch { /* sin almacenamiento */ } }

// Lleva a la misma página en el otro idioma
const targetFor = (page, code) => pathFor(page ?? 'home', code)

export function LangDropdown() {
  const { lang, page, t } = useLang()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const current = LANGS.find((l) => l.code === lang)

  useEffect(() => {
    if (!open) return
    const onDoc = (e) => { if (!ref.current?.contains(e.target)) setOpen(false) }
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); ref.current?.querySelector('button')?.focus() } }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey) }
  }, [open])

  return (
    <div className="lang" ref={ref}>
      <button
        type="button"
        className="lang__btn"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="lang-menu"
        aria-label={`${t.nav.changeLanguage}: ${current.name}`}
        onClick={() => setOpen((v) => !v)}
      >
        <Globe aria-hidden="true" />
        <span>{current.short}</span>
        <ChevronDown className="lang__chev" aria-hidden="true" />
      </button>
      {open && (
        <ul className="lang__menu" id="lang-menu" aria-label={t.nav.language}>
          {LANGS.map((l) => (
            <li key={l.code}>
              <Link
                to={targetFor(page, l.code)}
                hrefLang={l.hreflang}
                lang={l.hreflang}
                aria-current={l.code === lang ? 'true' : undefined}
                onClick={() => { remember(l.code); setOpen(false) }}
              >
                <span className="lang__code">{l.short}</span>
                <span className="lang__name">{l.name}</span>
                {l.code === lang && <Check aria-hidden="true" />}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function LangPills() {
  const { lang, page, t } = useLang()
  return (
    <div className="lang-pills" role="group" aria-label={t.nav.language}>
      {LANGS.map((l) => (
        <Link
          key={l.code}
          to={targetFor(page, l.code)}
          hrefLang={l.hreflang}
          lang={l.hreflang}
          aria-current={l.code === lang ? 'true' : undefined}
          aria-label={l.name}
          onClick={() => remember(l.code)}
        >
          {l.short}
        </Link>
      ))}
    </div>
  )
}
