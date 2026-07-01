import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">

      <h1 className="text-7xl font-bold">
        404
      </h1>

      <p className="text-2xl mt-4">
        Page Not Found
      </p>

      <Link href="/">
        <button className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-xl">
          Back Home
        </button>
      </Link>

    </div>
  );
}