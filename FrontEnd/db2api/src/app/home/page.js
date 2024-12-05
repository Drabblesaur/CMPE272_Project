"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Dashboard from "@/components/Dashboard";

function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathToken =
    typeof window !== "undefined"
      ? window.location.pathname.split("/").pop()
      : null;

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = searchParams.get("userId");
    if (token) {
      console.log("1");
      localStorage.setItem("userID", token);
      setUserId(token);
    } else {
      const storedUserId = localStorage.getItem("userID");
      console.log("got storedUserId", storedUserId);
      if (!storedUserId) {
        router.push("/auth");
      } else {
        setUserId(storedUserId);
      }
    }
  }, []); // Empty dependency array ensures this runs only once

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dashboard userId={userId} />
    </Suspense>
  );
}

export default Home;
