"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import LoginModal from "./components/LoginModal";
import TaskList from "./components/TaskList";
import Header from "./components/Header";
import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import Carousel from "./components/Carousel";
import ContactForm from "./components/ContactForm";

export default function ContentPage() {
  const { data: session } = useSession();
  const [showLogin, setShowLogin] = useState(false);
  const todoSectionRef = useRef<HTMLDivElement>(null);
  function handleGoToTodoList() {
    if (todoSectionRef.current) {
      todoSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  useEffect(() => {
    if (session) {
      setShowLogin(false);
    }
  }, [session]);

  return (
    <SessionProvider>
      <div className="relative min-h-screen font-sans bg-white">
        {/* Header */}
        <Header onLoginClick={() => setShowLogin(true)} />
        <main className="flex flex-col items-center justify-start pt-15 min-h-[80vh]">
          <section className="w-full flex flex-col-reverse md:flex-row items-center justify-between gap-8 px-8 py-12 max-w-6xl mx-auto">
            {/* Esquerda */}
            <div className="flex-1 flex flex-col gap-6 max-w-xl">
              <h1 className="text-[80px] font-bold text-black leading-[0.7] mb-15">
                Organize <br />
                <span className="text-[40px] font-light text-green-500 ">
                  your daily jobs
                </span>
              </h1>
              <p className="text-[24px] font-bold text-gray-700">
                The only way to get things done
              </p>
              <button
                className="bg-green-500 text-white px-8 py-3 rounded text-lg font-semibold w-fit hover:bg-green-600 transition-all"
                onClick={handleGoToTodoList}
              >
                Go to To-do list
              </button>
            </div>
            {/* Direita */}
            <div className="flex-1  justify-center items-center md:flex hidden">
              <Image
                src="/BG.png"
                alt="Office"
                height={622}
                width={622}
                className="absolute right-0 top-0 z-1"
              />
              <Image
                src="/foto-header.png"
                alt="Office"
                height={400}
                width={400}
                className="absolute right-35 top-35  z-2"
              />
            </div>
          </section>
          <div className="w-full mt-30 flex justify-center items-center bg-red">
            <Image src="/icon-scroll.png" alt="Office" height={20} width={20} />
          </div>
          <section
            className="w-full bg-cover bg-center 
          flex flex-col items-center justify-center 
          gap-10 h-fit py-20"
            style={{
              backgroundImage: "url('/BG-2.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div>
              <h1 className="text-white text-[60px] font-bold inline-block relative">
                To-do List
                <span
                  className="block absolute left-0 bottom-0 w-full"
                  style={{
                    height: "4px",
                    background: "#4ade80",
                    borderRadius: "2px",
                    marginTop: "8px",
                  }}
                ></span>
              </h1>
            </div>
            <p className="w-[50%] text-center text-white text-[24px]">
              Drag and drop to set your main priorities, check{" "}
              <br className="hidden lg:block" />
              when done and create what´s new.
            </p>
          </section>
          <section
            ref={todoSectionRef}
            className="w-full flex flex-col-reverse md:flex-row items-center justify-between gap-8 px-8 py-12 max-w-6xl mx-auto"
          >
            {/* Aviso para usuários não logados */}
            <div className="flex flex-col gap-4 w-full ">
              {!session ? (
                <>
                  <div className="w-full mb-6">
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
                      <p>
                        <strong>Aviso:</strong> Você precisa fazer login para
                        salvar suas tarefas na nuvem.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 w-full justify-between opacity-50 pointer-events-none">
                    <TaskList />
                  </div>
                </>
              ) : (
                <div className="flex gap-4 w-full justify-between ">
                  <TaskList />
                </div>
              )}
            </div>
          </section>
          <section className="w-full flex flex-col-reverse md:flex-row items-center justify-between gap-8 px-8 py-12 max-w-6xl mx-auto">
            <Carousel />
          </section>
          <section className="flex flex-row items-center justify-center content-center w-full py-12 px-8 max-w-6xl mx-auto">
            <ContactForm />
          </section>
        </main>
        {/* Modal de Login */}
        <LoginModal show={showLogin} onClose={() => setShowLogin(false)} />
      </div>
    </SessionProvider>
  );
}
