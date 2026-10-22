import ButtonLink from '../../components/ButtonLink/ButtonLink'
import styles from './NotFoundPage.module.scss'

export default function NotFoundPage() {
  return (
    <section className={styles.page}>
      <p className={styles.code}>404</p>
      <h1>Pagina non trovata</h1>
      <p className={styles.text}>L'indirizzo che hai aperto non esiste o è stato spostato.</p>
      <ButtonLink to="/" variant="primary">Torna alla home</ButtonLink>
    </section>
  )
}
