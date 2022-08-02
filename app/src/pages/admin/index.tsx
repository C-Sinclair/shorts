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
    <ul className="flex flex-col justify-start">
      {shorts?.map((short) => (
        <Link href={`/admin/short/${short.id}`} key={short.id}>
          <li className="p-10 bg-blue-900 cursor-pointer mt-4 mb-4">
            <h1>{short.title}</h1>
          </li>
        </Link>
      ))}
    </ul>
  );
}
