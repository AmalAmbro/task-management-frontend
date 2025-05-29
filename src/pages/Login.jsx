import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../utils/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const res = await fetch(`${API_URL}/token/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
		
    if (data.access) {
      localStorage.setItem("token", data.access);
      navigate("/");
    } else {
      alert("Login failed, check credentials and try again");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
			<div className="flex flex-col bg-white shadow-md rounded max-w-[500px] w-sm p-4">
				<div className="w-full mb-4">
					<h2 className="text-xl font-bold mb-4">Login</h2>
					<input
						type="username"
						placeholder="Username"
						className="px-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className="w-full max-w-sm">
					<input
						type="password"
						placeholder="Password"
						className="px-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<div>
					<button
						onClick={login}
						className="bg-blue-600 text-white px-4 py-2 my-4 rounded w-full max-w-sm"
					>
						Login
					</button>
				</div>
				<div className="text-center mt-2">
					<p className="text-sm">
						Don't have an account?{" "}
						<Link to="/register" className="text-blue-600 hover:underline">
							Register
						</Link>
					</p>
				</div>
			</div>
    </div>
  );
}