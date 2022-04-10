import type { Component } from 'solid-js'

const libsInUse = [
  {
    name: 'SolidJS',
    url: 'https://solidjs.com',
    image: '/solid-logo.svg',
  },
  {
    name: 'XState',
    url: `https://xstate.js.org/`,
    image: '/xstate-logo.svg',
  },
]

export const Footer: Component = () => {
  return (
    <footer class='app-footer'>
      <h4>Built with</h4>
      <ul>
        {libsInUse.map(({ image, name, url }) => (
          <li>
            <a href={url} title={name}>
              <img src={image} class='logo' alt={`${name} logo`} />
            </a>
          </li>
        ))}
      </ul>
    </footer>
  )
}
