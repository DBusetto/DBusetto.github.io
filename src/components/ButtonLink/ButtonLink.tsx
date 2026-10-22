import type { AnchorHTMLAttributes } from 'react'
import { Link } from 'react-router'
import styles from './ButtonLink.module.scss'

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'secondary'
  /** Rotta interna dell'app (es. '/'): se presente si naviga senza ricaricare la pagina. */
  to?: string
}

/** Link con l'aspetto di un pulsante. */
export default function ButtonLink({ variant = 'secondary', className, to, ...props }: ButtonLinkProps) {
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(' ')
  if (to !== undefined) return <Link to={to} className={classes} {...props} />
  return <a className={classes} {...props} />
}
