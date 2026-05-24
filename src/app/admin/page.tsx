import Link from "next/link";

export default function Page() {
  return (
    <div className="p-5 flex justify-center items-center gap-10">
      <Link href="/admin/AddDoctor">
        <button className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Add Doctor
        </button>
      </Link>
      <Link href="/admin/AddHospital">
        <button className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Add Hospital
        </button>
      </Link>
    </div>
  );
}