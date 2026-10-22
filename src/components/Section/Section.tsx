import type { ReactNode } from 'react'
import styles from './Section.module.scss'

interface SectionProps {
  id: string
  title?: string
  /** Sfondo alternativo, per distinguere sezioni consecutive. */
  alt?: boolean
  children: ReactNode
}

export default function Section({ id, title, alt = false, children }: SectionProps) {
  return (
    <section id={id} className={alt ? `${styles.section} ${styles.alt}` : styles.section}>
      <div className={styles.inner}>
        {title && <h2 className={styles.title}>{title}</h2>}
        {children}
      </div>
    </section>
  )
}
