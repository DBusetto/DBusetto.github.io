import { useEffect, useLayoutEffect, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight, SquareArrowOutUpRight } from 'lucide-react'
import { Link, useParams } from 'react-router'
import ButtonLink from '../../components/ButtonLink/ButtonLink'
import Card from '../../components/Card/Card'
import TagList from '../../components/TagList/TagList'
import { findProject, getAdjacentProjects, themeVariables } from '../../data/projects'
import { profile, projects } from '../../data/portfolio'
import type { Challenge, Feature, Skill } from '../../data/types'
import styles from './ProjectPage.module.scss'

/** Sezione di testo libero: non viene mostrata se non ha paragrafi. */
function TextSection({ title, paragraphs, children }: { title: string; paragraphs?: string[]; children?: ReactNode }) {
  if (!paragraphs?.length) return null
  return (
    <section className={styles.text}>
      <h2>{title}</h2>
      {children}
      {paragraphs.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </section>
  )
}

/** Loghi delle tecnologie usate, in riga. */
function StackList({ stack }: { stack?: Skill[] }) {
  if (!stack?.length) return null
  return (
    <ul className={styles.stack} aria-label="Tech stack">
      {stack.map((skill) => (
        <li key={skill.name} className={styles.stackItem}>
          {skill.icon && <img src={skill.icon} alt="" width={20} height={20} />}
          {skill.name}
        </li>
      ))}
    </ul>
  )
}

/** Sfide come card problema → soluzione: non viene mostrata se è vuota. */
function ChallengeSection({ challenges }: { challenges?: Challenge[] }) {
  if (!challenges?.length) return null
  return (
    <section className={styles.text}>
      <h2>Challenges &amp; solutions</h2>
      <ul className={styles.challenges}>
        {challenges.map(({ title, text }, i) => (
          <li key={title}>
            <Card className={styles.challenge}>
              <span className={styles.challengeNumber} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  )
}

/** Griglia di card delle funzionalità: non viene mostrata se è vuota. */
function FeatureSection({ features }: { features?: Feature[] }) {
  if (!features?.length) return null
  return (
    <section className={styles.text}>
      <h2>Key features</h2>
      <ul className={styles.features}>
        {features.map(({ title, text, icon: Icon }) => (
          <li key={title}>
            <Card className={styles.feature}>
              <span className={styles.featureIcon}>
                <Icon size={20} aria-hidden="true" />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Card>
          </li>
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
        <h1 className={styles.title}>
          {/* Un prodotto online si apre dal titolo stesso */}
          {project.live ? (
            <a href={project.live} target="_blank" rel="noreferrer" className={styles.titleLink}>
              <span className={styles.titleText}>{project.title}</span>
              <SquareArrowOutUpRight className={styles.titleIcon} aria-hidden="true" />
            </a>
          ) : (
            project.title
          )}
        </h1>
        <p className={styles.summary}>{project.summary}</p>
        <TagList items={project.tags} />
        {(project.demo || project.repo) && (
          <div className={styles.actions}>
            {project.demo && (
              <ButtonLink href={project.demo} target="_blank" rel="noreferrer" variant="primary">Live demo</ButtonLink>
            )}
            {project.repo && (
              <ButtonLink href={project.repo} target="_blank" rel="noreferrer">Code on GitHub</ButtonLink>
            )}
          </div>
        )}
      </header>

      {project.cover && <img src={project.cover} alt={`Screens of ${project.title}`} className={styles.cover} />}

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
      <FeatureSection features={project.features} />
      <TextSection title="How I built it" paragraphs={project.approach}>
        <StackList stack={project.stack} />
      </TextSection>
      <ChallengeSection challenges={project.challenges} />

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

      {/* Chiusura della pagina: invito a provare il prodotto o a scrivermi */}
      <Card className={styles.outro}>
        <h2>{project.live ? `Try ${project.title} yourself` : 'Like what you see?'}</h2>
        <p>
          {project.live
            ? 'It’s live in production: open it and have a look around, or drop me a line if you have questions.'
            : 'I’m happy to talk about how I built it.'}
        </p>
        <div className={styles.actions}>
          {project.live && (
            <ButtonLink href={project.live} target="_blank" rel="noreferrer" variant="primary">
              Open {project.title} <SquareArrowOutUpRight size={16} aria-hidden="true" />
            </ButtonLink>
          )}
          <ButtonLink to="/#contact">Get in touch</ButtonLink>
        </div>
      </Card>

      {/* Con un solo progetto non c'è niente da sfogliare */}
      {(previous || next) && (
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
      )}
    </article>
  )
}
