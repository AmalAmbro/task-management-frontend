import { useNavigate } from "react-router-dom";

export default function TaskCard({ task }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/tasks/edit/${task.id}`);
  };

  return (
    <div
      className="border rounded-lg p-4 shadow-md cursor-pointer hover:bg-gray-50 transition"
      onClick={handleClick}
    >
      <h2 className="font-semibold text-lg">{task.title}</h2>
      <p>{task.description}</p>
      <div className="text-sm mt-2 text-gray-500">
        Priority: {task.priority} | Status: {task.status}
      </div>
    </div>
  );
}
