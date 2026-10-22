import { profile } from '../../data/portfolio'
import ButtonLink from '../ButtonLink/ButtonLink'
import styles from './Hero.module.scss'

export default function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Ciao, sono</p>
        <h1 className={styles.name}>{profile.name}</h1>
        <p className={styles.role}>{profile.role}</p>
        <p className={styles.tagline}>{profile.tagline}</p>
        <div className={styles.actions}>
          <ButtonLink href="#projects" variant="primary">Guarda i progetti</ButtonLink>
          <ButtonLink href="#contact">Contattami</ButtonLink>
          {profile.cvUrl && (
            <ButtonLink href={profile.cvUrl} download>Scarica CV</ButtonLink>
          )}
        </div>
      </div>
    </section>
  )
}
