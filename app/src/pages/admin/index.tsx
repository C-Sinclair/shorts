import Link from "next/link";
import { AdminOnly } from "~/components/AdminOnly";
import { useAllShorts } from "~/hooks/all-shorts";

export default function Admin() {
  return (
    <AdminOnly>
      <section className="h-screen mt-20 p-10 text-white">
        <header className="flex justify-between items-center">
          <h1 className="font-bold text-3xl">Admin only area!</h1>
          <Link href="/admin/upload">
            <a className="hover:text-purple-500 hover:underline">
              Upload a new short
            </a>
          </Link>
        </header>
        <ShortsList />
      </section>
    </AdminOnly>
  );
}

function ShortsList() {
  const { shorts, loading } = useAllShorts();
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!shorts) {
    return <div>No shorts found</div>;
  }
  return (
    <article id="shorts-list" className="mt-4">
      <h4 className="font-code text-xl">
        Currently {shorts.length} shorts live
      </h4>
      <ul className="flex flex-col justify-start">
        {shorts?.map((short) => (
          <Link href={`/admin/short/${short.id}`} key={short.id}>
            <li className="pt-6 px-8 py-8 pb-6 bg-zinc-900 cursor-pointer mt-4 mb-4 hover:bg-zinc-700">
              <header className="flex justify-between items-center">
                <p title="id">{short.id}</p>
                <p title="playbackId">{short.playbackId}</p>
              </header>
              <h1 className="text-xl">{short.title}</h1>
              <p>{short.description}</p>
            </li>
          </Link>
        ))}
      </ul>
    </article>
  );
}
