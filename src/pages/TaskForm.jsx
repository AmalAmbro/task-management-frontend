import { useEffect, useState } from "react";
import { data, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../utils/api";
import { useApiAction } from "../utils/apiAction";

export default function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();
	const apiAction = useApiAction()
  const [form, setForm] = useState({ title: "", description: "", status: "Pending", priority: "Low" });

  const fetchTask = async () => {
    const data = await apiAction({ endpoint: `/tasks/${id}` });

    if (!data) return;

    setForm({
      ...data,
      due_date: data.due_date ? data.due_date.slice(0, 10) : "",
    });
  };

  useEffect(() => {
    if (id) fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = id ? "PUT" : "POST";
    const endpoint = id ? `/tasks/${id}/` : `/tasks/`;

    const data = await apiAction({
      endpoint,
      method,
      body: form,
    });

    if (data) {
      navigate("/");
    }
  };

	const handleDelete = async () => {
		if (!window.confirm("Are you sure you want to delete this task?")) return;

		const data = await apiAction({
			endpoint: `/tasks/${id}/`,
			method: "DELETE",
		});
		navigate("/")
	};


  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">{id ? "Edit" : "Create"} Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full border px-3 py-2 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="w-full border px-3 py-2 rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progess</option>
          <option value="Completed">Completed</option>
        </select>
        <select
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <input
          type="date"
          className="w-full border px-3 py-2 rounded"
          value={form.due_date}
          onChange={(e) => setForm({ ...form, due_date: e.target.value })}
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
          Save Task
        </button>

				{(id && data) && (
					<button
						type="button"
						onClick={handleDelete}
						className="bg-red-600 text-white px-4 py-2 rounded ml-2 cursor-pointer"
					>
						Delete Task
					</button>
				)}

      </form>
    </div>
  );
}