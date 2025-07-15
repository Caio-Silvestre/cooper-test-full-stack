"use client";
import { useState } from "react";
import api from "./axios-config";
import { User, LoginResponse } from "../interfaces/user";
import toast from "react-hot-toast";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Buscar todos os usuários
  async function fetchUsers() {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<{ users: User[] }>("/users");
      setUsers(res.data.users);
      toast.success("Usuários carregados com sucesso!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.response?.data?.message || "Erro ao buscar usuários");
      toast.error(e.response?.data?.message || "Erro ao buscar usuários");
    } finally {
      setLoading(false);
    }
  }

  // Buscar um usuário pelo id
  async function fetchUserById(id: string): Promise<User | null> {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<User>(`/users/${id}`);
      toast.success("Usuário carregado com sucesso!");
      return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.response?.data?.message || "Erro ao buscar usuário");
      toast.error(e.response?.data?.message || "Erro ao buscar usuário");
      return null;
    } finally {
      setLoading(false);
    }
  }

  // Criar um novo usuário
  async function createUser(user: {
    name: string;
    email: string;
    password: string;
  }): Promise<User | null> {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post<User>("/users", user);
      setUsers((prev) => [...prev, res.data]);
      toast.success("Usuário criado com sucesso!");
      return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.response?.data?.message || "Erro ao criar usuário");
      toast.error(e.response?.data?.message || "Erro ao criar usuário");
      return null;
    } finally {
      setLoading(false);
    }
  }

  // Atualizar um usuário existente
  async function updateUser(
    id: string,
    updates: Partial<Omit<User, "id" | "createdAt">>
  ): Promise<User | null> {
    setLoading(true);
    setError(null);
    try {
      const res = await api.put<User>(`/users/${id}`, updates);
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? res.data : user))
      );
      toast.success("Usuário atualizado com sucesso!");
      return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.response?.data?.message || "Erro ao atualizar usuário");
      toast.error(e.response?.data?.message || "Erro ao atualizar usuário");
      return null;
    } finally {
      setLoading(false);
    }
  }

  // Deletar um usuário
  async function deleteUser(id: string): Promise<boolean> {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      toast.success("Usuário deletado com sucesso!");
      return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.response?.data?.message || "Erro ao deletar usuário");
      toast.error(e.response?.data?.message || "Erro ao deletar usuário");
      return false;
    } finally {
      setLoading(false);
    }
  }

  // Login de usuário
  async function login(
    email: string,
    password: string
  ): Promise<LoginResponse | null> {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post<LoginResponse>("/auth/login", {
        email,
        password,
      });
      toast.success("Login realizado com sucesso!");
      return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.response?.data?.message || "Erro ao fazer login");
      toast.error(e.response?.data?.message || "Erro ao fazer login");
      return null;
    } finally {
      setLoading(false);
    }
  }

  // Registrar novo usuário
  async function register(user: {
    name: string;
    email: string;
    password: string;
  }): Promise<User | null> {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post<User>("/auth/register", user);
      toast.success("Usuário registrado com sucesso!");
      return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.response?.data?.message || "Erro ao registrar usuário");
      toast.error(e.response?.data?.message || "Erro ao registrar usuário");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    users,
    loading,
    error,
    fetchUsers,
    fetchUserById,
    createUser,
    updateUser,
    deleteUser,
    login,
    register,
    setUsers,
  };
}
