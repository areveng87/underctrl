import { useEffect, useRef } from 'react'

// Añade .is-visible una sola vez cuando el elemento entra en pantalla.
// Úsalo solo para momentos con intención (p. ej. el ticket que se "imprime"), no para cada bloque.
export default function InView({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) { el.classList.add('is-visible'); return }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('is-visible'); io.disconnect() }
    }, { rootMargin: '0px 0px -15% 0px', threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <Tag ref={ref} className={className} {...rest}>{children}</Tag>
}
