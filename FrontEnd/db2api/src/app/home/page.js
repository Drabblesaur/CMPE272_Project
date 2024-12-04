"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "@/components/Dashboard.jsx";

export default function Page() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userID");
    if (!storedUserId) {
      router.push("/auth");
    } else {
      setUserId(storedUserId);
    }
  }, [router]);

  if (!userId) {
    return null; // or a loading spinner
  }

  return (
    <div>
      <Dashboard userId={userId} />
    </div>
  );
}
