import type { AnchorHTMLAttributes } from 'react'
import styles from './ButtonLink.module.scss'

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'secondary'
}

/** Link con l'aspetto di un pulsante. */
export default function ButtonLink({ variant = 'secondary', className, ...props }: ButtonLinkProps) {
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(' ')
  return <a className={classes} {...props} />
}
