import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">🎵 Endel Clone</h1>
      <nav className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/login">Login</Link>
      </nav>
    </header>
  );
}
