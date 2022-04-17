import { createResource } from 'solid-js'
import { isLoggedIn } from '~/auth'

export function routeData(request: Request) {
  const [allowed] = createResource(() =>
    isLoggedIn(request.headers, ['creator']),
  )
  return allowed
}

export default function Upload() {
  return <h1>Upload</h1>
}
