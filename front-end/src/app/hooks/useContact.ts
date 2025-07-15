import { useState } from "react";
import toast from "react-hot-toast";
import api from "./axios-config";

export function useContact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function sendContact(form: {
    name: string;
    email: string;
    telephone: string;
    message: string;
  }) {
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      await api.post("/contact", form);
      setSuccess("Mensagem enviada com sucesso!");
      toast.success("Mensagem enviada com sucesso!");
      return true;
    } catch {
      setError("Erro ao enviar mensagem. Tente novamente.");
      toast.error("Erro ao enviar mensagem. Tente novamente.");
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { loading, success, error, sendContact, setSuccess, setError };
}
