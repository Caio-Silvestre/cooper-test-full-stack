"use client";

import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useUsers } from "../hooks/useUsers";

interface LoginModalProps {
  show: boolean;
  onClose: () => void;
}

export default function LoginModal({ show, onClose }: LoginModalProps) {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const { createUser } = useUsers();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (session) {
      onClose();
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const user = await createUser({ name, email, password });
    setLoading(false);
    if (user) {
      setIsRegister(false);
      setName("");
      setPassword("");
      setEmail("");
    }
  }

  useEffect(() => {
    if (session) {
      onClose();
    }
  }, [session, onClose]);

  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-white rounded-lg shadow-xl p-8 min-fit w-[80vw] md:w-[50vw] lg:w-[40vw]  max-w-full relative animate-fadeIn">
        <button
          className="absolute top-3 right-4 text-gray-800 font-bold hover:text-black text-sm cursor-pointer"
          onClick={onClose}
        >
          close
        </button>
        <div className="flex flex-col items-center gap-4 z-10">
          <div>
            <h2 className="text-[80px] font-bold text-black mb-0 leading-[0.5]">
              {isRegister ? "Sign up" : "Sign in"}
              <br />
              <span className="text-green-500 text-lg text-[40px]">
                {isRegister ? "to create your account" : "to access your list"}
              </span>
            </h2>
          </div>
          <button
            type="button"
            className="mb-2 text-sm text-green-600 underline"
            onClick={() => setIsRegister((prev) => !prev)}
          >
            {isRegister
              ? "Already have an account? Sign in"
              : "Don't have an account? Sign up"}
          </button>
          {isRegister ? (
            <form
              onSubmit={handleRegister}
              className="w-80 flex flex-col gap-4 mt-2"
            >
              <div>
                <label className="block text-gray-700 mb-1">Name:</label>
                <input
                  type="text"
                  className="w-full text-black border-black border-2 rounded-lg px-3 py-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Email:</label>
                <input
                  type="email"
                  className="w-full text-black border-black border-2 rounded-lg px-3 py-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <label className="block text-gray-700 mb-1">Password:</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full text-black border-black border-2 rounded-lg px-3 py-2 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-9 text-gray-600 hover:text-black text-sm"
                  tabIndex={-1}
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all mt-2"
                disabled={loading}
              >
                {loading ? "Registering..." : "Sign up"}
              </button>
            </form>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="w-80 flex flex-col gap-4 mt-2"
            >
              <div>
                <label className="block text-gray-700 mb-1">User:</label>
                <input
                  type="text"
                  className="w-full text-black border-black border-2 rounded-lg px-3 py-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative">
                <label className="block text-gray-700 mb-1">Senha:</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full text-black border-black border-2 rounded-lg px-3 py-2 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-2 top-9 text-gray-600 hover:text-black text-sm"
                  tabIndex={-1}
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {session?.user ? (
                <button
                  type="button"
                  onClick={() => signOut()}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all mt-2"
                >
                  SAIR
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all mt-2"
                  disabled={loading}
                >
                  {loading ? "Entrando..." : "Sign in"}
                </button>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
