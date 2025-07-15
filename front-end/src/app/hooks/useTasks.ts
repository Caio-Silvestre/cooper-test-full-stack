"use client";
import { useState } from "react";
import api from "./axios-config";
import { Task } from "../interfaces/task";
import toast from "react-hot-toast";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchTasks() {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<Task[]>("/tasks");
      console.log({ res });
      setTasks(res.data);
      toast.success("Tarefas carregadas com sucesso!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.response?.data?.message || "Erro ao buscar tasks");
      toast.error(e.response?.data?.message || "Erro ao buscar tasks");
    } finally {
      setLoading(false);
    }
  }

  async function fetchTaskById(id: string): Promise<Task | null> {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<Task>(`/tasks/${id}`);
      toast.success("Tarefa carregada com sucesso!");
      return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.response?.data?.message || "Erro ao buscar task");
      toast.error(e.response?.data?.message || "Erro ao buscar task");
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function createTask(
    task: Omit<Task, "id" | "createdAt" | "updatedAt" | "userId">
  ): Promise<Task | null> {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post<Task>("/tasks", task);
      setTasks((prev) => [...prev, res.data]);
      toast.success("Tarefa criada com sucesso!");
      return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.response?.data?.message || "Erro ao criar task");
      toast.error(e.response?.data?.message || "Erro ao criar task");
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function updateTask(
    id: string,
    updates: Partial<Omit<Task, "id" | "userId" | "createdAt">>
  ): Promise<Task | null> {
    setLoading(true);
    setError(null);
    try {
      const res = await api.put<Task>(`/tasks/${id}`, updates);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? res.data : task))
      );
      toast.success("Tarefa atualizada com sucesso!");
      return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.response?.data?.message || "Erro ao atualizar task");
      toast.error(e.response?.data?.message || "Erro ao atualizar task");
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function deleteTask(id: string): Promise<boolean> {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      toast.success("Tarefa deletada com sucesso!");
      return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.response?.data?.message || "Erro ao deletar task");
      toast.error(e.response?.data?.message || "Erro ao deletar task");
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function reorderTasks(
    tasks: { id: string; index_position: number }[]
  ): Promise<boolean> {
    setLoading(true);
    setError(null);
    try {
      await api.put("/tasks/reorder", { tasks });
      toast.success("Tarefas reordenadas com sucesso!");
      return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.response?.data?.message || "Erro ao reordenar tasks");
      toast.error(e.response?.data?.message || "Erro ao reordenar tasks");
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function deleteAllTodoTasks(): Promise<void> {
    setLoading(true);
    setError(null);
    try {
      const todoTasks = tasks.filter((task) => task.status === false);
      await Promise.all(
        todoTasks.map((task) => api.delete(`/tasks/${task.id}`))
      );
      setTasks((prev) => prev.filter((task) => task.status !== false));
      toast.success("Todas as tarefas To-do foram deletadas!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.response?.data?.message || "Erro ao deletar tarefas To-do");
      toast.error(e.response?.data?.message || "Erro ao deletar tarefas To-do");
    } finally {
      setLoading(false);
    }
  }

  async function deleteAllDoneTasks(): Promise<void> {
    setLoading(true);
    setError(null);
    try {
      const doneTasks = tasks.filter((task) => task.status === true);
      await Promise.all(
        doneTasks.map((task) => api.delete(`/tasks/${task.id}`))
      );
      setTasks((prev) => prev.filter((task) => task.status !== true));
      toast.success("Todas as tarefas Done foram deletadas!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.response?.data?.message || "Erro ao deletar tarefas Done");
      toast.error(e.response?.data?.message || "Erro ao deletar tarefas Done");
    } finally {
      setLoading(false);
    }
  }

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    fetchTaskById,
    createTask,
    updateTask,
    deleteTask,
    reorderTasks,
    setTasks,
    deleteAllTodoTasks,
    deleteAllDoneTasks,
  };
}
