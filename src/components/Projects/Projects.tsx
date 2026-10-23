import type { CSSProperties } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import Section from '../Section/Section'
import Card from '../Card/Card'
import TagList from '../TagList/TagList'
import { projects } from '../../data/portfolio'
import { themeVariables } from '../../data/projects'
import styles from './Projects.module.scss'

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <ul className={styles.grid}>
        {projects.map((project) => (
          <li key={project.slug}>
            {/* L'intera card porta alla pagina del progetto; demo e codice sono lì. Ha i colori del progetto. */}
            <Link
              to={`/projects/${project.slug}`}
              className={styles.link}
              style={project.theme && (themeVariables(project.theme) as CSSProperties)}
            >
              <Card as="article" interactive className={styles.project}>
                <div className={styles.heading}>
                  {project.icon && <img src={project.icon} alt="" className={styles.icon} width={44} height={44} />}
                  <h3 className={styles.title}>{project.title}</h3>
                </div>
                <p className={styles.summary}>{project.summary}</p>
                <TagList items={project.tags} />
                <span className={styles.more}>
                  Explore the project <ArrowRight size={16} aria-hidden="true" />
                </span>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}
