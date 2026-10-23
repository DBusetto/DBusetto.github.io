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
  // Con un solo progetto la card prende tutta la riga, con un riquadro visivo accanto al testo
  const featured = projects.length === 1

  return (
    <Section id="projects" title="Projects">
      <ul className={featured ? styles.list : styles.grid}>
        {projects.map((project) => (
          <li key={project.slug}>
            {/* L'intera card porta alla pagina del progetto; demo e codice sono lì. Ha i colori del progetto. */}
            <Link
              to={`/projects/${project.slug}`}
              className={styles.link}
              style={project.theme && (themeVariables(project.theme) as CSSProperties)}
            >
              <Card as="article" interactive className={featured ? `${styles.project} ${styles.featured}` : styles.project}>
                <div className={styles.body}>
                  <div className={styles.heading}>
                    {project.icon && (
                      <img
                        src={project.icon}
                        alt=""
                        className={featured && !project.cover ? `${styles.icon} ${styles.echo}` : styles.icon}
                        width={44}
                        height={44}
                      />
                    )}
                    <h3 className={styles.title}>{project.title}</h3>
                  </div>
                  <p className={styles.summary}>{project.summary}</p>
                  <TagList items={project.tags} />
                  <span className={styles.more}>
                    Explore the project <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </div>
                {featured && (project.cover || project.icon) && (
                  <div className={styles.visual}>
                    {project.cover ? (
                      <img src={project.cover} alt="" className={styles.cover} />
                    ) : (
                      <img src={project.icon} alt="" className={styles.bigIcon} width={112} height={112} />
                    )}
                  </div>
                )}
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}
