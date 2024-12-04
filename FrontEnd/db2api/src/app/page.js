import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-6xl font-extrabold mb-4 tracking-wide">
          Welcome to <span className="text-gray-300">DB2 API</span>
        </h1>
        <p className="text-lg text-gray-400">
          Generate CRUD operations effortlessly by providing your database
          schema.
        </p>
      </header>

      {/* Action Section */}
      <div className="space-y-6 w-80">
        <Button
          asChild
          className="w-full py-3 text-lg bg-gray-800 text-gray-100 hover:bg-gray-700 transition-all"
        >
          <Link href="/auth">Login</Link>
        </Button>
        <Button
          asChild
          className="w-full py-3 text-lg bg-gray-800 text-gray-100 hover:bg-gray-700 transition-all"
        >
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>

      {/* Divider */}
      <div className="my-10 w-64 border-t border-gray-700"></div>

      {/* Features Section */}
      <section className="text-center text-gray-400 px-6">
        <h2 className="text-2xl font-semibold text-gray-200 mb-4">
          Why Choose DB2 API?
        </h2>
        <ul className="space-y-3 text-sm">
          <li>⚡ Effortlessly generate CRUD operations for any schema.</li>
          <li>💻 Focus on building features, not repetitive code.</li>
          <li>🔒 Secure and reliable code generation.</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="absolute bottom-6 text-xs text-gray-500">
        <p>© {new Date().getFullYear()} DB2 API. All rights reserved.</p>
      </footer>
    </div>
  );
}
