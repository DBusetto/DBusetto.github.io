import Section from './Section'
import { about } from '../data/portfolio'

export default function About() {
  return (
    <Section id="about" title="Chi sono">
      <div className="prose">
        {about.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </Section>
  )
}
