const API_URL = "http://localhost:3000/api/users";

// ==================== REGISTER FUNCTION ====================
export async function registerUser(userData) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
}

// ==================== LOGIN FUNCTION ====================
export async function loginUser(credentials) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials), // credentials mein email aur password hoga
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  // Agar login successful ho aur token aaye, toh use yahan bhi save kar sakte hain
  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  return data; // Is mein token aur user data (agar backend bhej raha hai) hoga
}