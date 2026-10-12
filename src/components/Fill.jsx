import { company } from '../config.js'

// Sustituye {email} por un enlace y {domain} por el dominio dentro de un texto traducido.
export default function Fill({ text }) {
  const parts = text.split(/(\{email\}|\{domain\})/)
  return parts.map((p, i) => {
    if (p === '{email}') return <a key={i} href={`mailto:${company.email}`}>{company.email}</a>
    if (p === '{domain}') return <span key={i}>{company.domain}</span>
    return p
  })
}
