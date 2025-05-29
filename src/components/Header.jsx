import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <header className="p-4 bg-blue-600 text-white flex justify-between">
      <h1 className="text-xl font-bold">Task Manager</h1>
      <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
    </header>
  );
}
