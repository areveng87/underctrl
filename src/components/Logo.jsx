// Isotipo de UnderControl: círculo abierto con dos flujos que se cruzan y salen ordenados.
export default function Logo({ title = 'UnderControl', ...props }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="5.5" strokeLinecap="butt" role="img" aria-label={title} {...props}>
      <path d="M14.3 37 A38 38 0 0 1 76.9 23.1" />
      <path d="M86.7 41 A38 38 0 0 1 86.2 61.5" />
      <path d="M74.4 79.1 A38 38 0 0 1 14.3 63" />
      <path d="M4 42 H28 C42 42 44 58 58 61 C64 62.4 68 63.5 72 65.5" />
      <path d="M4 58 H28 C42 58 44 42 58 39 C64 37.6 68 36.5 73 34" />
      <path d="M71 26 L90 27 L79 42 Z" fill="currentColor" stroke="none" />
      <path d="M68 74 L86 75 L77 58 Z" fill="currentColor" stroke="none" />
    </svg>
  )
}
