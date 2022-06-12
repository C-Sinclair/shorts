import Link from "next/link";
import { AdminOnly } from "~/components/AdminOnly";
import { useAllShorts } from "~/hooks/all-shorts";

export default function Admin() {
  return (
    <AdminOnly>
      <div className="h-screen">
        <h1>Admin only area!</h1>
        <Link href="/admin/upload">
          <a>Upload a new short</a>
        </Link>
        <ShortsList />
      </div>
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
          <li className="p-10 bg-blue-900 cursor-pointer mb-4">
            <h1>{short.title}</h1>
          </li>
        </Link>
      ))}
    </ul>
  );
}
