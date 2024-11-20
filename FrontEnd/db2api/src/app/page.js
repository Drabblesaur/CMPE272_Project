import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">Welcome to DB2 API</h1>
      <div className="mt-4"></div>
      <div className="mt-4">
        <Button asChild className="w-full">
          <Link href="/auth">Login</Link>
        </Button>
        <Button asChild className="w-full">
          <Link href="/signup">Sign Up</Link>
        </Button>
        Delete this button later on in production
        <Button asChild className="w-full">
          <Link href="/home">Homepage</Link>
        </Button>
      </div>
    </div>
  );
}
