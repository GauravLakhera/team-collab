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
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Boards</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border px-3 py-2 rounded w-full"
          placeholder="New Board Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 rounded"
          onClick={createBoard}
        >
          Add
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {boards.map((b) => (
          <a
            key={b._id}
            href={`/board/${b._id}`}
            className="p-4 bg-white shadow rounded hover:bg-gray-50"
          >
            {b.name}
          </a>
        ))}
      </div>
    </div>
  );
}
