import Section from '../Section/Section'
import { about, timeline } from '../../data/portfolio'
import styles from './About.module.scss'

export default function About() {
  return (
    <Section id="about" title="About">
      <div className={styles.prose}>
        {about.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      {timeline.length > 0 && (
        <ol className={styles.timeline} aria-label="My journey">
          {timeline.map((step) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.label}>{step.label}</span>
              <h3 className={styles.title}>{step.title}</h3>
              {step.text && <p className={styles.text}>{step.text}</p>}
            </li>
          ))}
        </ol>
      )}
    </Section>
  )
}
