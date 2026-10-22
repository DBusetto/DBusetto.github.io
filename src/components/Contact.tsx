import Section from './Section'
import { profile, socials } from '../data/portfolio'

export default function Contact() {
  return (
    <Section id="contact" title="Contatti">
      <div className="contact">
        <p>Hai un progetto in mente o vuoi semplicemente salutarmi? Scrivimi!</p>
        <a href={`mailto:${profile.email}`} className="btn btn-primary">{profile.email}</a>
        <ul className="socials">
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
