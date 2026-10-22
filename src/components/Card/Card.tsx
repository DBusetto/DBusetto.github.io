import type { ReactNode } from 'react'
import styles from './Card.module.scss'

interface CardProps {
  as?: 'div' | 'article'
  /** Solleva la card all'hover. */
  interactive?: boolean
  className?: string
  children: ReactNode
}

export default function Card({ as: Tag = 'div', interactive = false, className, children }: CardProps) {
  const classes = [styles.card, interactive && styles.interactive, className].filter(Boolean).join(' ')
  return <Tag className={classes}>{children}</Tag>
}
