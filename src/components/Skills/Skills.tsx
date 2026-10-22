import { Code } from 'lucide-react'
import Section from '../Section/Section'
import { skills } from '../../data/portfolio'
import styles from './Skills.module.scss'

export default function Skills() {
  return (
    <Section id="skills" title="Competenze">
      <div className={styles.groups}>
        {skills.map((group) => (
          <div key={group.group}>
            <h3 className={styles.groupTitle}>{group.group}</h3>
            <ul className={styles.grid}>
              {group.items.map((skill) => (
                <li key={skill.name} className={styles.tile}>
                  {/* Il logo è decorativo: il nome è scritto subito sotto */}
                  {skill.icon ? (
                    <img src={skill.icon} alt="" className={styles.logo} width={36} height={36} />
                  ) : (
                    <Code className={`${styles.logo} ${styles.fallback}`} aria-hidden="true" />
                  )}
                  <span className={styles.name}>{skill.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
