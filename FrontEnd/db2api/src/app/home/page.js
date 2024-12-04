"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  console.log("Checkin")
  const router = useRouter();
  const { token: queryToken } = router.query;
  const pathToken = typeof window !== "undefined" ? window.location.pathname.split("/").pop() : null;

  const token = queryToken || pathToken;

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // if (!router.isReady) return; // Ensure the router is ready
console.log(token)
    if (token) {
      console.log("1");
      localStorage.setItem("userID", token);
      setUserId(token);
      setTimeout(() => {
        router.replace("/dashboard");
      }, 0);
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
  // }, [router]);

  if (!userId) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Dashboard userId={userId} />
    </div>
  );
}



// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Dashboard from "@/components/Dashboard.jsx";

// export default function Page() {
//   const router = useRouter();
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     const storedUserId = localStorage.getItem("userID");
//     if (!storedUserId) {
//       router.push("/auth");
//     } else {
//       setUserId(storedUserId);
//     }
//   }, [router]);

//   if (!userId) {
//     return null; // or a loading spinner
//   }

//   return (
//     <div>
//       <Dashboard userId={userId} />
//     </div>
//   );
// }
