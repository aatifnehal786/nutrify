export async function refreshAccessToken() {
  try {
    const res = await fetch("https://ntl-1.onrender.com/refresh-token", {
      method: "POST",
      credentials: "include",
    });

    // If refresh token invalid or expired
    if (res.status === 401 || res.status === 403) {
      console.warn("Refresh token expired or invalid");

      // Clean storage — force logout
      localStorage.removeItem("nutrify-user");
      sessionStorage.removeItem("nutrify-user");

      return null;
    }

    if (!res.ok) return null;

    const data = await res.json();

    if (!data.accessToken) return null;

    // Get user
    let user = null;

    try {
      user =
        JSON.parse(localStorage.getItem("nutrify-user")) ||
        JSON.parse(sessionStorage.getItem("nutrify-user"));
    } catch (e) {
      console.error("Error parsing stored user:", e);
      return null;
    }

    if (!user) return null;

    // Update access token
    user.accessToken = data.accessToken;

    // Save back to correct storage
    if (localStorage.getItem("nutrify-user")) {
      localStorage.setItem("nutrify-user", JSON.stringify(user));
    } else {
      sessionStorage.setItem("nutrify-user", JSON.stringify(user));
    }

    return data.accessToken;
  } catch (err) {
    console.error("Error refreshing access token:", err);
    return null;
  }
}
