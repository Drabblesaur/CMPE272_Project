"use client";

import { useRouter,useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  console.log("Checkin")
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  console.log(token);
  const pathToken = typeof window !== "undefined" ? window.location.pathname.split("/").pop() : null;


  const [userId, setUserId] = useState(null);

  useEffect(() => {
console.log(token)
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
