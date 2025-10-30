import api from "./api";

// LOGIN request
export async function loginUser(email, password) {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
}

// REGISTER request (optional)
export async function registerUser(userData) {
  const response = await api.post("/register", userData);
  return response.data;
}
