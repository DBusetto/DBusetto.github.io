import Section from '../Section/Section'
import Card from '../Card/Card'
import TagList from '../TagList/TagList'
import { projects } from '../../data/portfolio'
import styles from './Projects.module.scss'

export default function Projects() {
  return (
    <Section id="projects" title="Progetti">
      <div className={styles.grid}>
        {projects.map((project) => (
          <Card key={project.title} as="article" interactive className={styles.project}>
            <h3>{project.title}</h3>
            <p className={styles.description}>{project.description}</p>
            <TagList items={project.tags} />
            <div className={styles.links}>
              {project.repo && (
                <a href={project.repo} target="_blank" rel="noreferrer">Codice →</a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noreferrer">Demo →</a>
              )}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}
