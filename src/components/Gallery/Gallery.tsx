import { useShorts } from '../../state/Shorts/Shorts'
import styles from './Gallery.module.css'

export function Gallery() {
  const { shorts } = useShorts()
  return (
    <div class={styles.Gallery} data-testid='gallery-root'>
      <ul>
        {shorts.map(short => (
          <li>
            {short.title}
          </li>
        ))}
      </ul>
    </div>
  )
}