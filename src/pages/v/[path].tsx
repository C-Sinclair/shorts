import { Short } from "@prisma/client";
import { prisma } from "~/server/prisma";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  const shorts = await prisma.short.findMany();
  const paths = shorts.map((s) => `/v/${s.path}`);
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<VideoPageProps> = async (ctx) => {
  const path = ctx.params?.path as string;
  if (!path) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const short = await prisma.short.findFirst({
    where: { path },
    select: {
      id: true,
      title: true,
      description: true,
      playbackId: true,
    },
  });
  if (!short) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      short,
    },
  };
};

interface VideoPageProps {
  short: Pick<Short, "id" | "title" | "description" | "playbackId">;
}

export default function VideoPage({ short }: VideoPageProps) {
  return <h1>{JSON.stringify(short, null, 2)}</h1>;
}
