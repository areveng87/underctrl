import { ShoppingBasket, Fuel, Zap, Briefcase, House, Plus, ChartColumn, Landmark, ScanLine, CircleCheck } from 'lucide-react'
import { useLang } from '../i18n/index.jsx'

const bars = [38, 52, 44, 61, 48, 70, 57, 82]
const txIcons = [<Briefcase key="b" />, <ShoppingBasket key="s" />, <Fuel key="f" />, <Zap key="z" />]

// Maqueta ilustrativa de la app (datos ficticios).
export default function PhoneMock() {
  const { t } = useLang()
  const m = t.mock
  return (
    <div className="mock" aria-label={m.aria} role="img">
      <div className="phone" aria-hidden="true">
        <span className="phone__island" />
        <div className="phone__screen">
          <div className="phone__status"><span>9:41</span><span>5G</span></div>
          <div className="app-top">
            <div className="app-top__hello">{m.month}</div>
            <div className="app-balance">
              <div className="app-balance__label">{m.result}</div>
              <div className="app-balance__value mono">{m.balance}</div>
              <div className="app-balance__row mono">
                <span className="in">{m.inc}</span>
                <span className="out">{m.exp}</span>
              </div>
              <div className="app-bars">
                {bars.map((h, i) => <i key={i} className={i === bars.length - 1 ? 'on' : ''} style={{ height: `${h}%` }} />)}
              </div>
            </div>
          </div>
          <div className="app-list">
            <div className="app-list__title"><span>{m.movements}</span><span>{m.seeAll}</span></div>
            {m.tx.map((tx, i) => (
              <div className="tx" key={tx.name}>
                <div className="tx__icon">{txIcons[i]}</div>
                <div className="tx__body">
                  <div className="tx__name">{tx.name}</div>
                  <div className="tx__sub">{tx.tag && <span className="tag">{tx.tag}</span>} {tx.sub}</div>
                </div>
                <div className={`tx__amt mono ${tx.amt.startsWith('+') ? 'pos' : 'neg'}`}>{tx.amt}</div>
              </div>
            ))}
          </div>
          <div className="app-tabbar">
            <span className="on"><House />{m.tabs[0]}</span>
            <span><ChartColumn />{m.tabs[1]}</span>
            <span className="add"><Plus /></span>
            <span><Landmark />{m.tabs[2]}</span>
            <span><ScanLine />{m.tabs[3]}</span>
          </div>
        </div>
      </div>

      <div className="float float--ticket" aria-hidden="true">
        <div className="float__label"><CircleCheck /> {m.ticket.label}</div>
        <div className="float__rows mono">
          {m.ticket.rows.map(([k, v]) => <div key={k}><span>{k}</span><span>{v}</span></div>)}
          <div className="total"><span>{m.ticket.total[0]}</span><span>{m.ticket.total[1]}</span></div>
        </div>
      </div>
      <div className="float float--tax" aria-hidden="true">
        <div className="float__label"><CircleCheck /> {m.tax.label}</div>
        <div className="float__big mono">{m.tax.value}</div>
        <div className="float__hint">{m.tax.hint}</div>
      </div>
    </div>
  )
}
