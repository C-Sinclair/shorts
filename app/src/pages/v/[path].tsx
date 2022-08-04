import { Short } from "@prisma/client";
import { prisma } from "~/server/prisma";
import { GetStaticPaths, GetStaticProps } from "next";
import { VideoPlayer } from "~/components/VideoPlayer";
import { trpc } from "~/utils/trpc";
import { Suspense, useState } from "react";
import { atom, useAtom } from "jotai";
import clsx from "clsx";

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
    // 1 minute
    revalidate: 60,
  };
};

interface VideoPageProps {
  short: Pick<Short, "id" | "title" | "description" | "playbackId">;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "mux-player": any;
    }
  }
}

export default function VideoPage({ short }: VideoPageProps) {
  const [paused, setPaused] = useState(false);

  const onPlay = () => {
    setPaused(false);
  };
  const onPause = () => {
    setPaused(true);
  };
  return (
    <article className="group text-white relative h-screen w-screen bg-black">
      <mux-player
        stream-type="on-demand"
        playback-id={short.playbackId}
        metadata-video-title={short.title}
        primary-color="purple"
        secondary-color="black"
        forward-seek-offset="15"
        backward-seek-offset="15"
        class="w-screen h-full"
      />
      <div
        className={clsx(
          "bg-gradient-to-t bottom-0 px-8 absolute w-full overflow-hidden max-h-0 h-full transition-all duration-500 pointer-events-none",
          {
            "max-h-48 py-8": paused,
          },
        )}
      >
        <h1 className="text-5xl">{short.title}</h1>
        <p className="mt-2">{short.description}</p>
      </div>
      <div
        className={clsx("absolute top-8 right-8 transition-opacity", {
          "opacity-100": paused,
          "opacity-0": !paused,
        })}
      >
        <Suspense fallback={<div />}>
          <ViewCount id={short.id} />
        </Suspense>
      </div>
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
