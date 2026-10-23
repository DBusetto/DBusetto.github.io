import { Mail } from 'lucide-react'
import Section from '../Section/Section'
import ButtonLink from '../ButtonLink/ButtonLink'
import CopyButton from './CopyButton'
import { profile, socials } from '../../data/portfolio'
import styles from './Contact.module.scss'

export default function Contact() {
  return (
    <Section id="contact" title="Contact">
      <div className={styles.contact}>
        <p className={styles.text}>Up for a chat about code, a project idea, or a foosball match? Drop me a line.</p>
        <ul className={styles.actions}>
          <li className={styles.email}>
            <ButtonLink href={`mailto:${profile.email}`} variant="primary">
              <Mail size={18} aria-hidden="true" />
              {profile.email}
            </ButtonLink>
            <CopyButton text={profile.email} label="Copy email address" />
          </li>
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
