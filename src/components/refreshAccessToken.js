export async function refreshAccessToken() {
  try {
    const res = await fetch("https://ntl-1.onrender.com/refresh-token", {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) return null;

    const data = await res.json();

    if (data.accessToken) {
      const user = JSON.parse(localStorage.getItem("nutrify-user")) || JSON.parse(sessionStorage.getItem("nutrify-user"));
      if (user) {
        user.accessToken = data.accessToken;

        if (localStorage.getItem("nutrify-user")) {
          localStorage.setItem("nutrify-user", JSON.stringify(user));
        } else {
          sessionStorage.setItem("nutrify-user", JSON.stringify(user));
        }

        return data.accessToken;
      }
    }

    return null;
  } catch (err) {
    console.error("Error refreshing access token:", err);
    return null;
  }
}
