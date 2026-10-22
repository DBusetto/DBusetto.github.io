import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import Section from '../Section/Section'
import Card from '../Card/Card'
import TagList from '../TagList/TagList'
import { projects } from '../../data/portfolio'
import styles from './Projects.module.scss'

export default function Projects() {
  return (
    <Section id="projects" title="Progetti">
      <ul className={styles.grid}>
        {projects.map((project) => (
          <li key={project.slug}>
            {/* L'intera card porta alla pagina del progetto; demo e codice sono lì */}
            <Link to={`/progetti/${project.slug}`} className={styles.link}>
              <Card as="article" interactive className={styles.project}>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.summary}>{project.summary}</p>
                <TagList items={project.tags} />
                <span className={styles.more}>
                  Scopri il progetto <ArrowRight size={16} aria-hidden="true" />
                </span>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}
