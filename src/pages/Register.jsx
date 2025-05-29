import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    const res = await fetch(`${API_URL}/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registration successful. Please log in.");
      navigate("/login");
    } else {
      alert(data?.detail || "Registration failed. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col bg-white shadow-md rounded max-w-[500px] w-sm p-4">
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

        <div className="w-full mb-4">
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="w-full mb-4">
          <input
            type="text"
            placeholder="Username"
            className="px-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="w-full mb-4">
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={register}
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Register
        </button>
      </div>
    </div>
  );
}
