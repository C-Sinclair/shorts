import "@mux/mux-player";

interface VideoPlayerProps {
  playbackId: string;
  title: string;
}

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "mux-player": any;
    }
  }
}

export const VideoPlayer = (props: VideoPlayerProps) => {
  return (
    <mux-player
      class="w-full max-h-screen"
      playback-id={props.playbackId}
      metadata-video-title={props.title}
      stream-type="on-demand"
      primary-color="purple"
      secondary-color="black"
      forward-seek-offset="15"
      backward-seek-offset="15"
    />
  );
};
