import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TaskForm from "./pages/TaskForm";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tasks/new"
        element={
          <ProtectedRoute>
            <TaskForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tasks/edit/:id"
        element={
          <ProtectedRoute>
            <TaskForm />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}