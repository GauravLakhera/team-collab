"use client"
import { use, useEffect, useState } from "react";
import { API } from "@/lib/api";

export default function BoardPage({ params }) {
    const { id } = use(params);
  console.log("params",params)

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const loadTasks = async () => {
    const res = await API.get(`/boards/${id}/tasks`);
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const createTask = async () => {
    if (!title.trim()) return;
    await API.post(`/tasks/${id}/tasks`, { title });
    setTitle("");
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
      <a href="/" className="underline">Back</a>

      <h1 className="text-2xl font-bold mt-2 mb-4">Board Tasks</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border px-3 py-2 rounded w-full"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="bg-green-600 text-white px-4 rounded"
          onClick={createTask}
        >
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {Object.keys(grouped).map((status) => (
          <div key={status} className="bg-gray-200 p-4 rounded">
            <h2 className="font-bold mb-3">{status}</h2>

            {grouped[status].map((task) => (
              <div
                key={task._id}
                className="p-3 bg-white rounded shadow mb-2"
              >
                <p className="font-medium">{task.title}</p>

                <select
                  className="mt-2 border p-1 rounded"
                  value={task.status}
                  onChange={(e) =>
                    updateStatus(task._id, e.target.value)
                  }
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
