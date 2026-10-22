import { useEffect, useState } from 'react'
import { pickActiveSection } from './activeSection'

/**
 * Restituisce l'id della sezione attualmente in lettura, tra quelle indicate (in ordine di pagina).
 * La scelta è in `pickActiveSection`; qui si leggono le posizioni a ogni scorrimento o ridimensionamento.
 */
export function useActiveSection(ids: readonly string[], enabled: boolean): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) {
      setActive(null)
      return
    }

    let frame = 0
    const update = () => {
      const sections = ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null)
        .map((el) => ({ id: el.id, top: el.getBoundingClientRect().top }))
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      setActive(pickActiveSection(sections, window.innerHeight, atBottom))
    }
    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [ids, enabled])

  return enabled ? active : null
}
