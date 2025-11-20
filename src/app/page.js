"use client";
import { useEffect, useState } from "react";
import { API } from "@/lib/api";

export default function HomePage() {
  const [boards, setBoards] = useState([]);
  const [name, setName] = useState("");

  const loadBoards = async () => {
    const res = await API.get("/boards");
    setBoards(res.data);
  };

  useEffect(() => {
    loadBoards();
  }, []);

  const createBoard = async () => {
    if (!name.trim()) return;
    await API.post("/boards", { name });
    setName("");
    loadBoards();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Boards</h1>

        <div className="flex gap-3 mb-6 bg-white p-4 shadow rounded-lg">
          <input
            className="border px-4 py-2 rounded w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Create a new board"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700 transition"
            onClick={createBoard}
          >
            Add
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {boards.map((b) => (
            <a
              key={b._id}
              href={`/board/${b._id}`}
              className="p-5 bg-white shadow-sm rounded-lg border hover:shadow-md hover:border-blue-400 transition-all cursor-pointer"
            >
              <div className="text-lg font-semibold">{b.name}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
