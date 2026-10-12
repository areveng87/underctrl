import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CircleCheck, CircleAlert, LoaderCircle } from 'lucide-react'
import { pathFor, useLang } from '../i18n/index.jsx'
import Fill from './Fill.jsx'

const initial = { name: '', email: '', profile: 'particular', company: '', message: '', consent: false, website: '' }

function validate(v, msg) {
  const e = {}
  if (!v.name.trim()) e.name = msg.name
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = msg.email
  if (!v.consent) e.consent = msg.consent
  return e
}

export default function ContactForm() {
  const { lang, t } = useLang()
  const f = t.form
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | ok | error
  const [touched, setTouched] = useState(false)

  const set = (k) => (ev) => {
    const val = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value
    const next = { ...values, [k]: val }
    setValues(next)
    if (touched) setErrors(validate(next, f.errors))
  }

  async function onSubmit(ev) {
    ev.preventDefault()
    setTouched(true)
    const e = validate(values, f.errors)
    setErrors(e)
    if (Object.keys(e).length) {
      const first = ev.currentTarget.querySelector(`[name="${Object.keys(e)[0]}"]`)
      first?.focus()
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, lang }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) throw new Error(data.error || 'send_failed')
      setStatus('ok')
      setValues(initial)
      setTouched(false)
    } catch {
      setStatus('error')
    }
  }

  const fieldProps = (k) => ({
    id: `f-${k}`, name: k, value: values[k], onChange: set(k),
    'aria-invalid': errors[k] ? 'true' : undefined,
    'aria-describedby': errors[k] ? `f-${k}-err` : undefined,
  })

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="form__row">
        <div className="field" data-invalid={!!errors.name}>
          <label htmlFor="f-name">{f.name}</label>
          <input type="text" autoComplete="name" required {...fieldProps('name')} />
          {errors.name && <span className="field__error" id="f-name-err">{errors.name}</span>}
        </div>
        <div className="field" data-invalid={!!errors.email}>
          <label htmlFor="f-email">{f.email}</label>
          <input type="email" autoComplete="email" inputMode="email" required {...fieldProps('email')} />
          {errors.email && <span className="field__error" id="f-email-err">{errors.email}</span>}
        </div>
      </div>
      <div className="form__row">
        <div className="field">
          <label htmlFor="f-profile">{f.profile}</label>
          <select {...fieldProps('profile')}>
            {Object.entries(f.profiles).map(([k, label]) => <option key={k} value={k}>{label}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="f-company">{f.company} <span className="opt">{f.optional}</span></label>
          <input type="text" autoComplete="organization" {...fieldProps('company')} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="f-message">{f.message} <span className="opt">{f.optional}</span></label>
        <textarea rows={4} {...fieldProps('message')} placeholder={f.placeholder} />
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor="f-website">{f.honeypot}</label>
        <input id="f-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
      </div>
      <div>
        <label className="check" htmlFor="f-consent">
          <input type="checkbox" id="f-consent" name="consent" checked={values.consent} onChange={set('consent')}
            aria-invalid={errors.consent ? 'true' : undefined} aria-describedby={errors.consent ? 'f-consent-err' : undefined} />
          <span>{f.consent[0]}<Link to={pathFor('privacy', lang)}>{f.consent[1]}</Link>{f.consent[2]}</span>
        </label>
        {errors.consent && <span className="field__error" id="f-consent-err" style={{ display: 'block', marginTop: 6, marginLeft: 34 }}>{errors.consent}</span>}
      </div>

      <div aria-live="polite">
        {status === 'ok' && (
          <div className="form__status form__status--ok"><CircleCheck aria-hidden="true" />{f.ok}</div>
        )}
        {status === 'error' && (
          <div className="form__status form__status--err"><CircleAlert aria-hidden="true" /><span><Fill text={f.err} /></span></div>
        )}
      </div>

      <button type="submit" className="btn btn--primary" disabled={status === 'sending'} aria-busy={status === 'sending'}>
        {status === 'sending'
          ? <span className="btn__label" key="sending"><LoaderCircle className="spin" aria-hidden="true" />{f.sending}</span>
          : <span className="btn__label" key="idle">{f.submit} <ArrowRight className="arrow" aria-hidden="true" /></span>}
      </button>
    </form>
  )
}
