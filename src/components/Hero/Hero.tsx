import { profile } from '../../data/portfolio'
import ButtonLink from '../ButtonLink/ButtonLink'
import styles from './Hero.module.scss'

export default function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Hi, I'm</p>
        <h1 className={styles.name}>{profile.name}</h1>
        <p className={styles.role}>{profile.role}</p>
        <p className={styles.tagline}>{profile.tagline}</p>
        <div className={styles.actions}>
          <ButtonLink to="/#projects" variant="primary">View projects</ButtonLink>
          <ButtonLink to="/#contact">Get in touch</ButtonLink>
          {profile.cvUrl && (
            <ButtonLink href={profile.cvUrl} download>Download CV</ButtonLink>
          )}
        </div>
      </div>
    </section>
  )
}
