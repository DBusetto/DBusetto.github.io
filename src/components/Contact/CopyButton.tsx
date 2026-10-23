import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import styles from './Contact.module.scss'

interface CopyButtonProps {
  text: string
  /** Nome accessibile del pulsante, che mostra solo l'icona. */
  label: string
}

const MESSAGES = { idle: '', copied: 'Copied!', failed: "Couldn't copy" }

/** Pulsante a icona che copia un testo negli appunti, con un breve messaggio letto anche dagli screen reader. */
export default function CopyButton({ text, label }: CopyButtonProps) {
  const [state, setState] = useState<keyof typeof MESSAGES>('idle')
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  // Senza Clipboard API (es. pagina non in HTTPS) il pulsante non compare: resta il link mailto
  if (!navigator.clipboard) return null

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setState('copied')
    } catch {
      setState('failed')
    }
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setState('idle'), 2000)
  }

  return (
    <span className={styles.copyWrap}>
      <button type="button" className={styles.copy} onClick={copy} aria-label={label}>
        {state === 'copied' ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
      </button>
      {/* Regione sempre presente, così il messaggio che compare viene annunciato */}
      <span role="status" className={styles.status}>
        {state !== 'idle' && <span className={styles.bubble}>{MESSAGES[state]}</span>}
      </span>
    </span>
  )
}
