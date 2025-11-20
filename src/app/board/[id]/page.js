"use client";
import { use, useEffect, useState } from "react";
import { API } from "@/lib/api";

export default function BoardPage({ params }) {
const { id } = use(params);

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");

  const loadTasks = async () => {
    const res = await API.get(`/boards/${id}/tasks`);
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, [id]);

  const createTask = async () => {
    if (!title.trim()) return;

    await API.post(`/tasks/${id}/tasks`, {
      title,
      priority,
    });

    setTitle("");
    setPriority("Low");
    loadTasks();
  };

  const updateStatus = async (taskId, status) => {
    await API.put(`/tasks/${taskId}`, { status });
    loadTasks();
  };

  const grouped = {
    "To Do": tasks.filter((t) => t.status === "To Do"),
    "In Progress": tasks.filter((t) => t.status === "In Progress"),
    Done: tasks.filter((t) => t.status === "Done"),
  };

  return (
    <div className="p-6">
      <a href="/" className="text-blue-600 underline">← Back</a>

      <h1 className="text-3xl font-bold mt-4 mb-6">Board Tasks</h1>

      {/* Create Task */}
      <div className="bg-white shadow p-5 rounded-lg mb-6">
        <h2 className="font-semibold text-lg mb-3">Create New Task</h2>

        <div className="flex gap-3">
          <input
            className="border px-3 py-2 rounded w-full"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            className="border px-3 py-2 rounded"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <button
            className="bg-green-600 text-white px-4 rounded hover:bg-green-700 transition"
            onClick={createTask}
          >
            Add
          </button>
        </div>
      </div>

      {/* Task Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.keys(grouped).map((status) => (
          <div key={status} className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <h2 className="font-bold text-lg mb-4">{status}</h2>

            {grouped[status].length === 0 && (
              <p className="text-gray-500 text-sm">No tasks</p>
            )}

            {grouped[status].map((task) => (
              <div
                key={task._id}
                className="p-4 bg-white rounded shadow mb-3 border-l-4"
                style={{
                  borderColor:
                    task.priority === "High"
                      ? "red"
                      : task.priority === "Medium"
                      ? "orange"
                      : "green",
                }}
              >
                <p className="font-medium">{task.title}</p>

                {/* Priority Tag */}
                <span
                  className={`inline-block text-xs px-2 py-1 rounded mt-2 ${
                    task.priority === "High"
                      ? "bg-red-100 text-red-700"
                      : task.priority === "Medium"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {task.priority}
                </span>

                {/* Status Dropdown */}
                <select
                  className="mt-3 border p-2 rounded w-full"
                  value={task.status}
                  onChange={(e) => updateStatus(task._id, e.target.value)}
                >
                  <option>To Do</option>
                  <option>In Progress</option>
                  <option>Done</option>
                </select>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
