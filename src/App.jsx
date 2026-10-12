import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import { LegalNotice, Privacy, Cookies } from './pages/Legal.jsx'
import NotFound from './pages/NotFound.jsx'
import { LANGS, LangProvider, SLUGS, langBase, pathFor, useLang } from './i18n/index.jsx'
import { company } from './config.js'

const PAGES = { home: Home, legal: LegalNotice, privacy: Privacy, cookies: Cookies }

function setMeta(selector, attrs) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement(selector.startsWith('link') ? 'link' : 'meta')
    document.head.appendChild(el)
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v))
}

// Idioma del documento, título, descripción, canonical y alternativas hreflang
function HeadManager() {
  const { lang, page, t } = useLang()
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const info = LANGS.find((l) => l.code === lang)
    document.documentElement.lang = info.hreflang
    const title = page === 'home' ? t.meta.title : `${t.titles[page ?? 'notFound']} · UnderControl`
    document.title = title
    setMeta('meta[name="description"]', { name: 'description', content: t.meta.description })
    setMeta('meta[property="og:title"]', { property: 'og:title', content: title })
    setMeta('meta[property="og:description"]', { property: 'og:description', content: t.meta.description })
    setMeta('meta[property="og:locale"]', { property: 'og:locale', content: info.og })

    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((n) => n.remove())
    if (page) {
      const url = company.url + pathFor(page, lang)
      setMeta('link[rel="canonical"]', { rel: 'canonical', href: url })
      setMeta('meta[property="og:url"]', { property: 'og:url', content: url })
      ;[...LANGS.map((l) => [l.hreflang, l.code]), ['x-default', 'es']].forEach(([hl, code]) => {
        const link = document.createElement('link')
        link.rel = 'alternate'
        link.hreflang = hl
        link.href = company.url + pathFor(page, code)
        document.head.appendChild(link)
      })
    } else {
      document.head.querySelector('link[rel="canonical"]')?.remove()
    }
  }, [lang, page, t])

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) { el.scrollIntoView(); return }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

function SkipLink() {
  const { t } = useLang()
  return <a className="skip-link" href="#main">{t.nav.skip}</a>
}

export default function App() {
  return (
    <LangProvider>
      <SkipLink />
      <HeadManager />
      <Header />
      <main id="main">
        <Routes>
          {LANGS.flatMap(({ code }) =>
            Object.entries(PAGES).map(([page, Comp]) => {
              const slug = SLUGS[page][code]
              const path = `${langBase(code)}/${slug}` || '/'
              return <Route key={`${code}-${page}`} path={path} element={<Comp />} />
            }),
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </LangProvider>
  )
}
