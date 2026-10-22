import type { ReactNode } from 'react'
import styles from './Section.module.scss'

interface SectionProps {
  id: string
  title?: string
  children: ReactNode
}

export default function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className={styles.section}>
      <div className={styles.inner}>
        {title && <h2 className={styles.title}>{title}</h2>}
        {children}
      </div>
    </section>
  )
}
