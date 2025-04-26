import { getAuth } from "firebase/auth";

export const storeUserInSql = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const idToken = await user.getIdToken();
      const response = await fetch("http://localhost:8081/store-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ✅ this was broken
          Authorization: `Bearer ${idToken}`, // ✅ added space after Bearer
        },
        body: JSON.stringify({
          email: user.email,
          uid: user.uid,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to store user in SQL");
      }
    }
  } catch (error) { 
    console.error("Error storing user:", error);
  }
};
