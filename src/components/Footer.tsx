const libsInUse = [
  // {
  //   name: "Astro",
  //   url: "https://astro.build/",
  //   image: "",
  // },
  {
    name: "SolidJS",
    url: "https://solidjs.com",
    image: "/solid-logo.svg",
  },
  // {
  //   name: "XState",
  //   url: `https://xstate.js.org/`,
  //   image: "/xstate-logo.svg",
  // },
];

export const Footer = () => {
  return (
    <footer class="mt-12 w-full text-white">
      <div class="p-8 h-16 bg-gradient-to-t from-purple-900" />
      <article class="flex relative p-8 w-full bg-purple-900">
        <h4 class="mb-4 italic text-yellow-50">Built with</h4>
        <ul>
          {libsInUse.map(({ image, name, url }) => (
            <li>
              <a href={url} title={name} class="flex items-center">
                <img
                  src={image}
                  class="max-w-sm max-h-12"
                  alt={`${name} logo`}
                />
                <p class="mt-4 ml-2">{name}</p>
              </a>
            </li>
          ))}
        </ul>
        <p class="absolute bottom-2 right-4 self-end text-xs">
          Background photo by{" "}
          <a
            href="https://unsplash.com/@mitchel3uo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
            class="text-yellow-200"
          >
            Mitchell Luo
          </a>{" "}
          on{" "}
          <a
            href="https://unsplash.com/s/photos/code?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
            class="text-yellow-200"
          >
            Unsplash
          </a>
        </p>
      </article>
    </footer>
  );
};
