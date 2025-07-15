"use client";
import React, { useState, useEffect } from "react";
import { useTasks } from "../hooks/useTasks";
import { Task } from "../interfaces/task";
import { Trash } from "lucide-react";
import { useSession } from "next-auth/react";

export const TaskList: React.FC = () => {
  const { data: session } = useSession();
  const {
    tasks,
    fetchTasks,
    updateTask,
    deleteTask,
    setTasks,
    createTask,
    reorderTasks,
    deleteAllTodoTasks,
    deleteAllDoneTasks,
  } = useTasks();

  // Estados para cada seção
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [draggedSection, setDraggedSection] = useState<"todo" | "done" | null>(
    null
  );
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [adding, setAdding] = useState(false);

  console.log({ tasks });

  // Filtrar tarefas para cada seção
  const todoTasks = (tasks ?? [])
    .filter((task) => task.status === false)
    .sort((a, b) => (a.index_position ?? 0) - (b.index_position ?? 0));

  const doneTasks = (tasks ?? [])
    .filter((task) => task.status === true)
    .sort((a, b) => (a.index_position ?? 0) - (b.index_position ?? 0));

  useEffect(() => {
    if (session?.user) {
      fetchTasks();
    }
    // eslint-disable-next-line
  }, [session]);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    setAdding(true);
    await createTask({
      title: newTaskTitle.trim(),
      status: false,
      index_position: 0,
    });
    setNewTaskTitle("");
    setAdding(false);
    fetchTasks();
  };

  const handleDragStart = (index: number, section: "todo" | "done") => {
    setDraggedIndex(index);
    setDraggedSection(section);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLLIElement>,
    index: number,
    section: "todo" | "done"
  ) => {
    e.preventDefault();
    if (
      draggedIndex === null ||
      draggedSection !== section ||
      draggedIndex === index
    )
      return;

    const currentTasks = section === "todo" ? todoTasks : doneTasks;
    const updated = [...currentTasks];
    const [removed] = updated.splice(draggedIndex, 1);
    updated.splice(index, 0, removed);
    updated.forEach((task, idx) => (task.index_position = idx));

    setTasks((prev) => {
      const otherTasks = prev.filter(
        (t) => t.status !== (section === "todo" ? false : true)
      );
      return [...otherTasks, ...updated];
    });
    setDraggedIndex(index);
  };

  const handleDragEnd = async () => {
    if (draggedSection === null) return;

    setDraggedIndex(null);
    setDraggedSection(null);
    await fetchTasks();

    const currentTasks = draggedSection === "todo" ? todoTasks : doneTasks;
    const toUpdate = currentTasks.map((task, idx) => ({
      id: task.id,
      index_position: idx,
    }));
    await reorderTasks(toUpdate);
    fetchTasks();
  };

  const handleToggle = async (task: Task) => {
    const newStatus = !task.status;
    await updateTask(task.id, { status: newStatus });
    fetchTasks();
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    fetchTasks();
  };

  const renderTaskList = (tasks: Task[], status: boolean, title: string) => (
    <div
      className={`bg-white rounded-xl shadow-md p-6 w-full max-w-xs border-t-8 ${
        status === true ? "border-orange-400" : "border-green-500"
      }`}
    >
      <h2 className="text-2xl font-bold text-black mb-1 text-center flex-col">
        {title}
        <br />
        {status ? (
          <span className="text-sm font-normal">
            Congratulations!
            <br />
            <strong className="text-sm font-bold">
              You have done {doneTasks.length} task
              {doneTasks.length !== 1 ? "s" : ""}
            </strong>
          </span>
        ) : (
          <span className="text-sm">Take a breath. Start doing.</span>
        )}
      </h2>
      {status === false && (
        <form onSubmit={handleAddTask} className="mb-4 flex gap-2">
          <input
            type="text"
            className="flex-1 border text-black border-gray-300 rounded px-2 py-1"
            placeholder="Add new task..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            disabled={adding}
          />
          <button
            type="submit"
            className="hidden bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition"
            disabled={adding || !newTaskTitle.trim()}
          >
            Add
          </button>
        </form>
      )}

      <ul className="flex flex-col gap-2 mb-6">
        {tasks.map((task, idx) => (
          <li
            key={task.id}
            className={`flex items-center gap-2 px-2 py-1 rounded transition-colors group ${
              status === true ? "hover:bg-orange-50" : "hover:bg-green-50"
            }`}
            draggable
            onDragStart={() => handleDragStart(idx, status ? "done" : "todo")}
            onDragOver={(e) => handleDragOver(e, idx, status ? "done" : "todo")}
            onDragEnd={handleDragEnd}
            onMouseEnter={() => setHoveredId(task.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <input
              type="checkbox"
              checked={task.status === true}
              onChange={() => handleToggle(task)}
              className={`accent-${
                status === true ? "orange-400" : "green-500"
              } w-5 h-5`}
            />
            <span
              className={`flex-1 text-base ${
                task.status === true
                  ? "line-through text-gray-400"
                  : "text-black"
              }`}
            >
              {task.title}
            </span>
            {hoveredId === task.id && (
              <button
                className="text-xs text-gray-400 hover:text-red-500 ml-2 hover:cursor-pointer"
                onClick={() => handleDelete(task.id)}
              >
                <Trash />
              </button>
            )}
          </li>
        ))}
      </ul>
      <button
        className="w-full py-2 rounded bg-black text-white font-semibold hover:bg-gray-800 transition hover:cursor-pointer"
        onClick={status ? deleteAllDoneTasks : deleteAllTodoTasks}
      >
        ERASE ALL
      </button>
    </div>
  );

  return (
    <div className="flex gap-4 w-full justify-between">
      {renderTaskList(todoTasks, false, "To-do")}
      {renderTaskList(doneTasks, true, "Done")}
    </div>
  );
};

export default TaskList;
