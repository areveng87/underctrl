import { createContext, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import es from './es.js'
import en from './en.js'
import pt from './pt.js'
import ca from './ca.js'

// Español en la raíz (/), el resto con prefijo (/en, /pt, /ca).
export const LANGS = [
  { code: 'es', short: 'ES', name: 'Español', hreflang: 'es-ES', og: 'es_ES' },
  { code: 'en', short: 'EN', name: 'English', hreflang: 'en', og: 'en_GB' },
  { code: 'pt', short: 'PT', name: 'Português', hreflang: 'pt', og: 'pt_PT' },
  { code: 'ca', short: 'CA', name: 'Català', hreflang: 'ca', og: 'ca_ES' },
]
export const DEFAULT_LANG = 'es'
const dicts = { es, en, pt, ca }

// Rutas traducidas de cada página
export const SLUGS = {
  home: { es: '', en: '', pt: '', ca: '' },
  legal: { es: 'aviso-legal', en: 'legal-notice', pt: 'aviso-legal', ca: 'avis-legal' },
  privacy: { es: 'privacidad', en: 'privacy', pt: 'privacidade', ca: 'privacitat' },
  cookies: { es: 'cookies', en: 'cookies', pt: 'cookies', ca: 'cookies' },
}

export const langBase = (lang) => (lang === DEFAULT_LANG ? '' : `/${lang}`)

export function pathFor(page, lang, hash = '') {
  const slug = SLUGS[page][lang]
  const base = langBase(lang)
  const p = slug ? `${base}/${slug}` : base || '/'
  return hash ? `${p === '/' ? '' : p}${p === '/' ? '/' : ''}#${hash}` : p
}

// Deduce idioma y página a partir de la URL
export function parsePath(pathname) {
  const parts = pathname.replace(/\/+$/, '').split('/').filter(Boolean)
  let lang = DEFAULT_LANG
  if (parts[0] && dicts[parts[0]] && parts[0] !== DEFAULT_LANG) lang = parts.shift()
  const slug = parts.join('/')
  const page = Object.keys(SLUGS).find((k) => SLUGS[k][lang] === slug) ?? null
  return { lang, page }
}

const LangCtx = createContext({ lang: DEFAULT_LANG, t: es, page: 'home' })

export function LangProvider({ children }) {
  const { pathname } = useLocation()
  const { lang, page } = parsePath(pathname)
  return <LangCtx.Provider value={{ lang, page, t: dicts[lang] }}>{children}</LangCtx.Provider>
}

export const useLang = () => useContext(LangCtx)
export const getDict = (lang) => dicts[lang]
