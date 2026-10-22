import { profile } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        © {new Date().getFullYear()} {profile.name} · Fatto con React
      </div>
    </footer>
  )
}
