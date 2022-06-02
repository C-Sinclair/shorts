import { Short } from "@prisma/client";
import { prisma } from "~/server/prisma";
import { GetStaticPaths, GetStaticProps } from "next";
import { VideoPlayer } from "~/components/VideoPlayer";
import { trpc } from "~/utils/trpc";
import { Suspense } from "react";

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
  return (
    <article className="group text-white">
      <VideoPlayer playbackId={short.playbackId} />
      <h1 className="text-5xl">{short.title}</h1>
      <p className="mt-2">{short.description}</p>
      <Suspense fallback={<div />}>
        <ViewCount id={short.id} />
      </Suspense>
    </article>
  );
}

interface ViewCountProps {
  id: string;
}

function ViewCount({ id }: ViewCountProps) {
  const { data } = trpc.useQuery(["short.byId", { id }], {
    refetchOnMount: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
  return <p>{data?.views} views</p>;
}
