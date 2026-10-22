import { profile } from '../data/portfolio'

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container">
        <p className="eyebrow">Ciao, sono</p>
        <h1>{profile.name}</h1>
        <p className="hero-role">{profile.role}</p>
        <p className="hero-tagline">{profile.tagline}</p>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">Guarda i progetti</a>
          <a href="#contact" className="btn">Contattami</a>
          {profile.cvUrl && (
            <a href={profile.cvUrl} className="btn" download>Scarica CV</a>
          )}
        </div>
      </div>
    </section>
  )
}
