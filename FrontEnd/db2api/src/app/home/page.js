"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Dashboard from "@/components/Dashboard";

function Home() {
  console.log("Checkin");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("userId");
  console.log(token);
  const pathToken =
    typeof window !== "undefined"
      ? window.location.pathname.split("/").pop()
      : null;

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    console.log(token);
    if (token) {
      console.log("1");
      localStorage.setItem("userID", token);
      setUserId(token);
    } else {
      console.log("2");
      const storedUserId = localStorage.getItem("userID");
      if (!storedUserId) {
        router.push("/auth");
      } else {
        setUserId(storedUserId);
      }
    }
  }, [token, router]);

  // useEffect(() => {
  //   const storedUserId = localStorage.getItem("userID");
  //   if (!storedUserId) {
  //     router.push("/auth");
  //   } else {
  //     setUserId(storedUserId);
  //   }

  return (
    <div>
      <Dashboard userId={userId} />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
    </Suspense>
  );
}
