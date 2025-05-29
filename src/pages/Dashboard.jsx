import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import TaskCard from "../components/TaskCard";
import { useApiAction } from "../utils/apiAction";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const apiAction = useApiAction();

  const fetchTasks = async () => {
    const data = await apiAction({ endpoint: "/tasks/" });
    if (data?.results) {
      setTasks(data.results);
    }
  };


  useEffect(() => {
    fetchTasks();
  }, []);

  const filtered = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()) &&
    (!statusFilter || t.status === statusFilter) &&
    (!priorityFilter || t.priority === priorityFilter)
  );

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const pending = tasks.filter((t) => t.status == "Pending").length;
	const inProgress = tasks.filter((t) => t.status == "In Progress").length

  return (
    <>
      <Header />
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-blue-500 p-4 rounded text-white">Total: {total}</div>
          <div className="bg-gray-100 p-4 rounded">Pending: {pending}</div>
          <div className="bg-yellow-100 p-4 rounded">In Progess: {inProgress}</div>
          <div className="bg-green-100 p-4 rounded">Completed: {completed}</div>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            placeholder="Search..."
            className="border px-3 py-1 rounded"
            onChange={(e) => setSearch(e.target.value)}
          />
          <select onChange={(e) => setStatusFilter(e.target.value)} className="border px-2 py-1 rounded">
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <select onChange={(e) => setPriorityFilter(e.target.value)} className="border px-2 py-1 rounded">
            <option value="">All Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <Link
            to="/tasks/new"
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            + New Task
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </>
  );
}