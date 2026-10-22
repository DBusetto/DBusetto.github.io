import styles from './TagList.module.scss'

interface TagListProps {
  items: string[]
}

export default function TagList({ items }: TagListProps) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item} className={styles.tag}>{item}</li>
      ))}
    </ul>
  )
}
