import { useCallback } from "react";
import { useRouter } from "expo-router";

export default function useIsLogout() {
  const router = useRouter();

  return useCallback(() => {
    // Your logout logic
    console.log("User logged out");
    router.replace("/login"); // Redirect to login after logout
  }, [router]);
}
