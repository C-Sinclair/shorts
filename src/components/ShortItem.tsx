interface ShortItemProps {
  id: string;
  title: string;
  description: string;
  playbackId: string;
}

export function ShortItem({ title, description, playbackId }: ShortItemProps) {
  return (
    <article
      className="w-80 h-80 rounded-2xl transition-transform cursor-pointer hover:scale-110 relative text-white flex justify-end flex-col mr-16 overflow-hidden"
      title={description}
    >
      <img
        src={`https://image.mux.com/${playbackId}/thumbnail.png?width=400`}
        alt="thumbnail"
        className="absolute top-0 right-0 w-full h-full object-right-bottom object-cover -z-10"
      />
      <h1 className="font-code hover:text-yellow-500 font-bold text-2xl absolute top-4 left-4">
        {title}
      </h1>
    </article>
  );
}
