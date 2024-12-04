"use client";
import React from "react";
import { LoginForm } from "@/components/LoginForm";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  React.useEffect(() => {
    const storedUserId = localStorage.getItem("userID");
    if (storedUserId) {
      router.push("/home");
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <LoginForm />
    </div>
  );
}
