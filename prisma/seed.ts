import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const shorts: Prisma.ShortCreateInput[] = [
  {
    id: "wlroXqSYe1xAc4tE98pkNxJte6q5edp9w5iLscZN9oyuzVtOPATk4jaJehsf79mi",
    title: "RIP",
    description: "A play around with the Rust built tool RIP	",
    path: "rip",
    playbackId: "cbvCnI003yRmABOrzdJRkEU4U36fjVPAfD5wvAPKGpro",
    thumbnailTime: 42,
  },
  {
    id: "RJQalDP15lgk1ZVwtev9FHfO4nvOdV5qVp85Nnkq8wusRb68wLPjt0jkQf4KOYLt",
    title: "Sequential Async Operations",
    description:
      "A look at how to run asynchronous operations in sequential order. On after the other.",
    path: "sequential-async-operations",
    playbackId: "ZBdymSdJjMvL1Jlk4Dx00C254vlC4b4sX701TiCkgVy300",
  },
  {
    id: "Pk8EET83MUOwfB2XwwBWhifitVbW0fSgBfmUB1HBnogtk2fPsztXjZGxByspwdwC",
    title: "Go Static Asset Server",
    description:
      "A fly through how to setup a Go server which can handle both dynamic server side API work, and return static html and other assets.",
    path: "go-static-asset-server",
    playbackId: "",
    thumbnailTime: 104,
  },
];

async function main() {
  await Promise.all(
    shorts.map(async (short) => {
      const id = short.id;
      await prisma.short.upsert({
        where: { id },
        create: short,
        update: short,
      });
    }),
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
