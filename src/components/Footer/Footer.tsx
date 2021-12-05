import type { Component } from 'solid-js'

import solidLogo from '../../assets/solid-logo.svg'
import xstateLogo from '../../assets/xstate-logo.svg'
import styles from './Footer.module.css'

const libsInUse = [
  {
    name: 'SolidJS',
    url: 'https://solidjs.com',
    image: solidLogo,
  },
  {
    name: 'XState',
    url: `https://xstate.js.org/`,
    image: xstateLogo,
  },
]

export const Footer: Component = () => {
  return (
    <footer class={styles.AppFooter}>
      <h4>Built with</h4>
      <ul>
        {libsInUse.map(({ image, name, url }) => (
          <li>
            <a href={url} title={name}>
              <img src={image} class={styles.logo} alt={`${name} logo`} />
            </a>
          </li>
        ))}
      </ul>
    </footer>
  )
}
