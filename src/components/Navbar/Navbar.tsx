import { useState } from 'react'
import { profile } from '../../data/portfolio'
import styles from './Navbar.module.scss'

const links = [
  { href: '#about', label: 'Chi sono' },
  { href: '#skills', label: 'Competenze' },
  { href: '#projects', label: 'Progetti' },
  { href: '#contact', label: 'Contatti' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <a href="#top" className={styles.brand}>{profile.name}</a>
        <button
          className={styles.toggle}
          aria-label="Apri menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
        <nav className={open ? `${styles.links} ${styles.open}` : styles.links}>
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
