import { MailOpen } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useContact } from "../hooks/useContact";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    telephone: "",
    message: "",
  });
  const { loading, success, error, sendContact, setSuccess, setError } =
    useContact();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    const ok = await sendContact(form);
    if (ok) {
      setForm({ name: "", email: "", telephone: "", message: "" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-lg px-8 pt-16 pb-8">
        {/* Foto circular sobrepondo */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2">
          <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-lg bg-gray-100">
            <Image
              src="/profile.png"
              alt="Profile"
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        {/* Título e ícone */}
        <div className="flex items-center gap-3 mt-2 mb-6">
          <div className="bg-green-500 rounded-lg p-3 flex items-center justify-center">
            <MailOpen />
          </div>
          <div>
            <div className="text-gray-700 font-semibold text-lg leading-tight">
              GET IN
            </div>
            <div className="text-black font-bold text-2xl leading-tight -mt-1">
              TOUCH
            </div>
          </div>
        </div>
        {/* Mensagem de sucesso/erro */}
        {success && (
          <div className="mb-4 text-green-600 text-center font-semibold">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-4 text-red-500 text-center font-semibold">
            {error}
          </div>
        )}
        {/* Formulário */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Your name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="type your name here..."
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-gray-300"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-gray-700 text-sm mb-1">Email*</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@example.com"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-gray-300"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 text-sm mb-1">
                Telephone*
              </label>
              <input
                type="tel"
                name="telephone"
                value={form.telephone}
                onChange={handleChange}
                placeholder="( ) ___-____"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-gray-300"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm mb-1">Message*</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Type what you want to say to us"
              className="w-full border border-gray-300 rounded px-3 py-2 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-gray-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mt-2 bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Sending..." : "SEND NOW"}
          </button>
        </form>
      </div>
    </div>
  );
}
