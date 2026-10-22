import Section from '../Section/Section'
import ButtonLink from '../ButtonLink/ButtonLink'
import { profile, socials } from '../../data/portfolio'
import styles from './Contact.module.scss'

export default function Contact() {
  return (
    <Section id="contact" title="Contatti" alt>
      <div className={styles.contact}>
        <p className={styles.text}>Hai un progetto in mente o vuoi semplicemente salutarmi? Scrivimi!</p>
        <ButtonLink href={`mailto:${profile.email}`} variant="primary">{profile.email}</ButtonLink>
        <ul className={styles.socials}>
          {socials.map((social) => (
            <li key={social.label}>
              <a href={social.url} target="_blank" rel="noreferrer">{social.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
