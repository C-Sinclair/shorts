import { render } from 'solid-js/web'

import './assets/global.css'

import { App } from './components/App/App'

render(() => <App />, document.getElementById('root') as HTMLElement)
