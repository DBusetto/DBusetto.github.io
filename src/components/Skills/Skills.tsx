import Section from '../Section/Section'
import Card from '../Card/Card'
import TagList from '../TagList/TagList'
import { skills } from '../../data/portfolio'
import styles from './Skills.module.scss'

export default function Skills() {
  return (
    <Section id="skills" title="Competenze" alt>
      <div className={styles.grid}>
        {skills.map((group) => (
          <Card key={group.group}>
            <h3>{group.group}</h3>
            <TagList items={group.items} />
          </Card>
        ))}
      </div>
    </Section>
  )
}
