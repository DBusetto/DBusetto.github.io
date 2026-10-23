import { profile } from '../../data/portfolio'
import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        © {new Date().getFullYear()} {profile.name} · Built with React
      </div>
    </footer>
  )
}
