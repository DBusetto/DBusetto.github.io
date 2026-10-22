import { useState } from 'react'
import { profile } from '../data/portfolio'

const links = [
  { href: '#about', label: 'Chi sono' },
  { href: '#skills', label: 'Competenze' },
  { href: '#projects', label: 'Progetti' },
  { href: '#contact', label: 'Contatti' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#top" className="brand">{profile.name}</a>
        <button
          className="menu-toggle"
          aria-label="Apri menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
        <nav className={open ? 'nav-links open' : 'nav-links'}>
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
