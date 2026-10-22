import { Link, useLocation } from 'react-router'
import { profile, socials } from '../../data/portfolio'
import { useActiveSection } from '../../hooks/useActiveSection'
import { navItems, sectionIds } from './navItems'
import styles from './Sidebar.module.scss'

/** Barra di navigazione in vetro: laterale su desktop, in basso su mobile. */
export default function Sidebar() {
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const sectionInView = useActiveSection(sectionIds, onHome)
  // Nelle pagine progetto resta accesa "Progetti"; nella 404 nessuna voce
  const active = onHome ? sectionInView : pathname.startsWith('/progetti/') ? 'projects' : null

  return (
    <nav className={styles.sidebar} aria-label="Navigazione principale">
      <Link to="/#top" className={styles.brand}>{profile.name}</Link>

      <ul className={styles.items}>
        {navItems.map(({ id, label, icon: Icon }) => (
          <li key={id}>
            <Link
              to={`/#${id}`}
              className={active === id ? `${styles.item} ${styles.active}` : styles.item}
              aria-current={active === id ? 'true' : undefined}
            >
              <Icon className={styles.icon} aria-hidden="true" />
              <span className={styles.label}>{label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <ul className={styles.socials}>
        {socials.map((social) => (
          <li key={social.label}>
            <a href={social.url} target="_blank" rel="noreferrer" aria-label={social.label}>
              <img src={social.icon} alt="" width={20} height={20} />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
