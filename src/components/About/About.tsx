import Section from '../Section/Section'
import { about } from '../../data/portfolio'
import styles from './About.module.scss'

export default function About() {
  return (
    <Section id="about" title="About">
      <div className={styles.prose}>
        {about.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </Section>
  )
}
