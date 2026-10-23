import ButtonLink from '../../components/ButtonLink/ButtonLink'
import styles from './NotFoundPage.module.scss'

export default function NotFoundPage() {
  return (
    <section className={styles.page}>
      <p className={styles.code}>404</p>
      <h1>Page not found</h1>
      <p className={styles.text}>The page you're looking for doesn't exist or has been moved.</p>
      <ButtonLink to="/" variant="primary">Back to home</ButtonLink>
    </section>
  )
}
