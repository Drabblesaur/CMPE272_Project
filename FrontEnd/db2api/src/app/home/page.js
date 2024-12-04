"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const router = useRouter();
  const { token } = router.query;
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Handle token from URL query parameter
    if (token) {
      // Store the token in localStorage
      localStorage.setItem("userID", token);

      // Set the user ID to state
      setUserId(token);

      // Remove token from the URL
      router.replace("/dashboard");
    } else {
      // Check localStorage for existing userID
      const storedUserId = localStorage.getItem("userID");
      if (!storedUserId) {
        // Redirect to authentication page if no userID is found
        router.push("/auth");
      } else {
        // Set the user ID from localStorage
        setUserId(storedUserId);
      }
    }
  }, [token, router]);

  if (!userId) {
    return <p>Loading...</p>; // Show a loading state while processing
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
