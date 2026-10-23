import { useEffect, useLayoutEffect } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link, useParams } from 'react-router'
import ButtonLink from '../../components/ButtonLink/ButtonLink'
import Card from '../../components/Card/Card'
import TagList from '../../components/TagList/TagList'
import { findProject, getAdjacentProjects, themeVariables } from '../../data/projects'
import { profile, projects } from '../../data/portfolio'
import styles from './ProjectPage.module.scss'

/** Sezione di testo libero: non viene mostrata se non ha paragrafi. */
function TextSection({ title, paragraphs }: { title: string; paragraphs?: string[] }) {
  if (!paragraphs?.length) return null
  return (
    <section className={styles.text}>
      <h2>{title}</h2>
      {paragraphs.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </section>
  )
}

/** Elenco puntato: non viene mostrato se è vuoto. */
function ListSection({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null
  return (
    <section className={styles.text}>
      <h2>{title}</h2>
      <ul className={styles.list}>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </section>
  )
}

function BackLink() {
  return (
    <Link to="/#projects" className={styles.back}>
      <ArrowLeft size={16} aria-hidden="true" /> All projects
    </Link>
  )
}

export default function ProjectPage() {
  const { slug = '' } = useParams()
  const project = findProject(projects, slug)

  // Titolo della scheda del browser, ripristinato uscendo dalla pagina
  useEffect(() => {
    const previous = document.title
    document.title = `${project ? project.title : 'Project not found'} — ${profile.name}`
    return () => {
      document.title = previous
    }
  }, [project])

  // Colori del progetto su tutto il sito (aloni, barra, pulsanti) finché si resta sulla pagina.
  // Layout effect: i colori cambiano prima del primo disegno, senza lampi di rosa.
  useLayoutEffect(() => {
    if (!project?.theme) return
    const root = document.documentElement.style
    const variables = Object.entries(themeVariables(project.theme))
    variables.forEach(([name, value]) => root.setProperty(name, value))
    return () => variables.forEach(([name]) => root.removeProperty(name))
  }, [project])

  if (!project) {
    return (
      <article className={styles.page}>
        <BackLink />
        <h1 className={styles.title}>Project not found</h1>
        <p className={styles.summary}>This project doesn't exist or has been moved.</p>
      </article>
    )
  }

  const { previous, next } = getAdjacentProjects(projects, project.slug)
  const facts = [
    { label: 'Role', value: project.role },
    { label: 'Period', value: project.period },
    { label: 'Status', value: project.status },
  ].filter((fact) => fact.value)

  return (
    <article className={styles.page}>
      <BackLink />

      <header className={styles.header}>
        {project.icon && <img src={project.icon} alt="" className={styles.icon} width={72} height={72} />}
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.summary}>{project.summary}</p>
        <TagList items={project.tags} />
        {(project.demo || project.repo) && (
          <div className={styles.actions}>
            {project.demo && (
              <ButtonLink href={project.demo} target="_blank" rel="noreferrer" variant="primary">Demo live</ButtonLink>
            )}
            {project.repo && (
              <ButtonLink href={project.repo} target="_blank" rel="noreferrer">Code on GitHub</ButtonLink>
            )}
          </div>
        )}
      </header>

      {project.cover && <img src={project.cover} alt={project.title} className={styles.cover} />}

      {facts.length > 0 && (
        <dl className={styles.facts}>
          {facts.map((fact) => (
            <Card key={fact.label} className={styles.fact}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </Card>
          ))}
        </dl>
      )}

      <TextSection title="Goal" paragraphs={project.goal} />
      <ListSection title="Key features" items={project.features} />
      <TextSection title="How I built it" paragraphs={project.approach} />
      <TextSection title="Challenges & solutions" paragraphs={project.challenges} />

      {project.gallery?.length ? (
        <section className={styles.text}>
          <h2>Gallery</h2>
          <ul className={styles.gallery}>
            {project.gallery.map((image) => (
              <li key={image.src}>
                <img src={image.src} alt={image.alt} loading="lazy" />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <nav className={styles.adjacent} aria-label="More projects">
        {previous ? (
          <Link to={`/projects/${previous.slug}`} className={styles.adjacentLink}>
            <span className={styles.adjacentLabel}><ArrowLeft size={14} aria-hidden="true" /> Previous project</span>
            {previous.title}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link to={`/projects/${next.slug}`} className={`${styles.adjacentLink} ${styles.next}`}>
            <span className={styles.adjacentLabel}>Next project <ArrowRight size={14} aria-hidden="true" /></span>
            {next.title}
          </Link>
        )}
      </nav>
    </article>
  )
}
