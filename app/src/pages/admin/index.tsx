import Link from "next/link";
import { AdminOnly } from "~/components/AdminOnly";
import { useAllShorts } from "~/hooks/all-shorts";

export default function Admin() {
  return (
    <AdminOnly>
      <div className="flex justify-center h-screen">
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
    <ul>
      {shorts?.map((short) => (
        <li key={short.id}>
          <Link href="/admin/short/[id]" as={`/admin/edit/${short.id}`}>
            <a>{short.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
