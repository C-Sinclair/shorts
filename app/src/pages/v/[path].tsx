import { VideoPlayer } from "~/components/VideoPlayer";
import { trpc } from "~/utils/trpc";
import clsx from "clsx";
import { createResource, createSignal, Suspense } from "solid-js";
import { useRouteData } from "@solidjs/router";
import { Short } from "~/hooks/shorts";

export default function VideoPage() {
  const short = useRouteData<Short>();

  const [paused, setPaused] = createSignal(false);

  // const onPlay = () => {
  //   setPaused(false);
  // };
  // const onPause = () => {
  //   setPaused(true);
  // };
  return (
    <article class="group text-white relative h-screen w-screen bg-black">
      <VideoPlayer playbackId={short.playbackId} title={short.title} />
      <div
        class={clsx(
          "bg-gradient-to-t bottom-0 px-8 absolute w-full overflow-hidden max-h-0 h-full transition-all duration-500 pointer-events-none",
          {
            "max-h-48 py-8": paused,
          },
        )}
      >
        <h1 class="text-5xl">{short.title}</h1>
        <p class="mt-2">{short.description}</p>
      </div>
      <div
        class={clsx("absolute top-8 right-8 transition-opacity", {
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

function ViewCount(props: ViewCountProps) {
  const [data] = createResource(
    () => props.id,
    (id) => trpc.short.byId.query({ id }),
  );
  return <p>{data()?.views} views</p>;
}
