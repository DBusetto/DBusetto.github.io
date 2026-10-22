import Section from './Section'
import { projects } from '../data/portfolio'

export default function Projects() {
  return (
    <Section id="projects" title="Progetti">
      <div className="projects-grid">
        {projects.map((project) => (
          <article key={project.title} className="card project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <ul className="tags">
              {project.tags.map((tag) => (
                <li key={tag} className="tag">{tag}</li>
              ))}
            </ul>
            <div className="project-links">
              {project.repo && (
                <a href={project.repo} target="_blank" rel="noreferrer">Codice →</a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noreferrer">Demo →</a>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
