export async function refreshAccessToken() {
  try {
    const res = await fetch("https://ntl-1.onrender.com/refresh-token", {
      method: "POST",
      credentials: "include", // Important: send cookies
    });

    if (!res.ok) throw new Error("Token refresh failed");

    const data = await res.json();
    localStorage.setItem("nutrify-user", data.accessToken); // Save new token
    return data.accessToken;
  } catch (err) {
    console.error("Refresh token error:", err.message);
    return null;
  }
}
