import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router'
import { getScrollTarget } from './scrollTarget'

const STORAGE_KEY = 'scroll-positions'

// Posizioni di scorrimento per voce di cronologia, conservate anche dopo una ricarica della pagina
function readPositions(): Record<string, number> {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '{}') as Record<string, number>
  } catch {
    return {}
  }
}

function savePosition(key: string, y: number) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...readPositions(), [key]: y }))
  } catch {
    // Storage non disponibile (es. navigazione privata): si perde solo il ripristino della posizione
  }
}

/**
 * Gestisce lo scorrimento a ogni navigazione: con un'ancora (/#skills) scorre alla sezione,
 * tornando indietro (o ricaricando) ripristina la posizione, altrimenti riparte dall'inizio della pagina.
 */
export default function ScrollManager() {
  const { key, hash } = useLocation()
  const navigationType = useNavigationType()

  // Il ripristino lo gestisce l'app: quello del browser agirebbe prima che la pagina giusta sia montata
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  }, [])

  // Salva la posizione della voce corrente mentre si scorre
  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => savePosition(key, window.scrollY))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [key])

  useEffect(() => {
    const target = getScrollTarget(hash, navigationType, readPositions()[key])
    if (target.kind === 'element') {
      // scrollIntoView rispetta scroll-behavior del CSS: fluido, o istantaneo con movimento ridotto
      document.getElementById(target.id)?.scrollIntoView()
    } else {
      window.scrollTo({ top: target.y, behavior: 'instant' })
    }
  }, [key, hash, navigationType])

  return null
}
