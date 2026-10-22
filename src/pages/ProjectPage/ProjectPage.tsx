import { useEffect } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link, useParams } from 'react-router'
import ButtonLink from '../../components/ButtonLink/ButtonLink'
import Card from '../../components/Card/Card'
import TagList from '../../components/TagList/TagList'
import { findProject, getAdjacentProjects } from '../../data/projects'
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

function BackLink() {
  return (
    <Link to="/#projects" className={styles.back}>
      <ArrowLeft size={16} aria-hidden="true" /> Tutti i progetti
    </Link>
  )
}

export default function ProjectPage() {
  const { slug = '' } = useParams()
  const project = findProject(projects, slug)

  // Titolo della scheda del browser, ripristinato uscendo dalla pagina
  useEffect(() => {
    const previous = document.title
    document.title = `${project ? project.title : 'Progetto non trovato'} — ${profile.name}`
    return () => {
      document.title = previous
    }
  }, [project])

  if (!project) {
    return (
      <article className={styles.page}>
        <BackLink />
        <h1 className={styles.title}>Progetto non trovato</h1>
        <p className={styles.summary}>Questo progetto non esiste o ha cambiato indirizzo.</p>
      </article>
    )
  }

  const { previous, next } = getAdjacentProjects(projects, project.slug)
  const facts = [
    { label: 'Ruolo', value: project.role },
    { label: 'Periodo', value: project.period },
    { label: 'Stato', value: project.status },
  ].filter((fact) => fact.value)

  return (
    <article className={styles.page}>
      <BackLink />

      <header className={styles.header}>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.summary}>{project.summary}</p>
        <TagList items={project.tags} />
        {(project.demo || project.repo) && (
          <div className={styles.actions}>
            {project.demo && (
              <ButtonLink href={project.demo} target="_blank" rel="noreferrer" variant="primary">Demo live</ButtonLink>
            )}
            {project.repo && (
              <ButtonLink href={project.repo} target="_blank" rel="noreferrer">Codice su GitHub</ButtonLink>
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

      <TextSection title="Obiettivo" paragraphs={project.goal} />
      <TextSection title="Come l'ho realizzato" paragraphs={project.approach} />
      <TextSection title="Sfide e soluzioni" paragraphs={project.challenges} />

      {project.gallery?.length ? (
        <section className={styles.text}>
          <h2>Galleria</h2>
          <ul className={styles.gallery}>
            {project.gallery.map((image) => (
              <li key={image.src}>
                <img src={image.src} alt={image.alt} loading="lazy" />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <nav className={styles.adjacent} aria-label="Altri progetti">
        {previous ? (
          <Link to={`/progetti/${previous.slug}`} className={styles.adjacentLink}>
            <span className={styles.adjacentLabel}><ArrowLeft size={14} aria-hidden="true" /> Progetto precedente</span>
            {previous.title}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link to={`/progetti/${next.slug}`} className={`${styles.adjacentLink} ${styles.next}`}>
            <span className={styles.adjacentLabel}>Progetto successivo <ArrowRight size={14} aria-hidden="true" /></span>
            {next.title}
          </Link>
        )}
      </nav>
    </article>
  )
}
