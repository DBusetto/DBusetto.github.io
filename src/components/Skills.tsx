import Section from './Section'
import { skills } from '../data/portfolio'

export default function Skills() {
  return (
    <Section id="skills" title="Competenze">
      <div className="skills-grid">
        {skills.map((group) => (
          <div key={group.group} className="card">
            <h3>{group.group}</h3>
            <ul className="tags">
              {group.items.map((item) => (
                <li key={item} className="tag">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
