# Shorts

> A Safe Place To Host My Various Shortform Video Content!

## Design Decisions

Everything is this repo tries to be coherent and typesafe.

### Full Stack Type Safety

TRPC coupled with Zod helps me write minimal actual types, and have the edges of the application be validated and consumed safely.

### Styling

Tailwind lets me keep the CSS footprint small, and prevent context switching by embedding the styles into the markup.

### Framework of Choice

React. Yep React. Powered by Next.

I know, pretty boring. But boring and functional beats interesting/complex/flakey any day. I do actually want to finish this project at some point!

The slight difference here is that I aim to keep React as solely the view layer. Basically a JSX wrapper for displaying data and funneling user interaction into actions.

The controversial aim is to never use a `useState` or `useEffect` directly. `useEffect` in particular is the source of 100% (statistically true most of the time) of the bugs in an application. Keeping the usage of these 2 hooks to an absolute minimum sounds like a strange choice, but I see this UI as being simple enough to be able to be mostly server driven.

### The Context Question

Another annoying React scented issue is Context. Very useful in normal React apps to provide the plumbing of state and between components, but damn is there a lot of boilerplate to get this working!

In this app to avoid that boilerplate, I'll use Jotai. In Jotai, you can use atoms which can be shared between components in a similar way.

The only drawback is the power of localising Context state around specific components, but really, how often is that needed?!
