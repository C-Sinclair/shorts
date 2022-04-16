const libsInUse = [
  // {
  //   name: "Astro",
  //   url: "https://astro.build/",
  //   image: "",
  // },
  {
    name: 'SolidJS',
    url: 'https://solidjs.com',
    image: '/solid-logo.svg',
  },
  // {
  //   name: "XState",
  //   url: `https://xstate.js.org/`,
  //   image: "/xstate-logo.svg",
  // },
]

export const Footer = () => {
  return (
    <footer class="p-8 text-white bg-gradient-to-t from-purple-900">
      <h4 class="mb-4 italic text-yellow-50">Built with</h4>
      <ul>
        {libsInUse.map(({ image, name, url }) => (
          <li>
            <a href={url} title={name} class="flex items-center">
              <img src={image} class="max-w-sm max-h-12" alt={`${name} logo`} />
              <p class="mt-4 ml-2">{name}</p>
            </a>
          </li>
        ))}
      </ul>

      <p>
        Photo by{' '}
        <a href="https://unsplash.com/@mitchel3uo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Mitchell Luo
        </a>{' '}
        on{' '}
        <a href="https://unsplash.com/s/photos/code?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Unsplash
        </a>
      </p>
    </footer>
  )
}
