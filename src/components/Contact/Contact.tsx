import Section from '../Section/Section'
import ButtonLink from '../ButtonLink/ButtonLink'
import { profile, socials } from '../../data/portfolio'
import styles from './Contact.module.scss'

export default function Contact() {
  return (
    <Section id="contact" title="Contatti">
      <div className={styles.contact}>
        <p className={styles.text}>Hai un progetto in mente o vuoi semplicemente salutarmi? Scrivimi!</p>
        <ButtonLink href={`mailto:${profile.email}`} variant="primary">{profile.email}</ButtonLink>
        <ul className={styles.socials}>
          {socials.map((social) => (
            <li key={social.label}>
              <ButtonLink href={social.url} target="_blank" rel="noreferrer">
                <img src={social.icon} alt="" width={18} height={18} className={styles.logo} />
                {social.label}
              </ButtonLink>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
