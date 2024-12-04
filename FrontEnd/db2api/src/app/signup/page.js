"use client";
import React from "react";
import { SignupForm } from "@/components/SignupForm";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();

  React.useEffect(() => {
    const storedUserId = localStorage.getItem("userID");
    if (storedUserId) {
      router.push("/home");
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <SignupForm />
    </div>
  );
}
