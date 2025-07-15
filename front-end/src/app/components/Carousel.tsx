import React, { useState } from "react";
import Image from "next/image";

const cards = [
  {
    image: "/post.png",
    title: "Organize your daily job enhance your life performance",
    description: "Organize your daily job enhance your life performance",
    link: "#",
    linkText: "read more",
  },
  {
    image: "/post1.png",
    title:
      "Mark one activity as done makes your brain understands the power of doing.",
    description:
      "Mark one activity as done makes your brain understands the power of doing.",
    link: "#",
    linkText: "read more",
  },
  {
    image: "/post2.png",
    title:
      "Careful with misunderstanding the difference between a list of things and a list of desires.",
    description:
      "Careful with misunderstanding the difference between a list of things and a list of desires.",
    link: "#",
    linkText: "read more",
  },
];

const Carousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const goTo = (idx: number) => setCurrent(idx);
  const prev = () =>
    setCurrent((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  const next = () =>
    setCurrent((prev) => (prev === cards.length - 1 ? 0 : prev + 1));

  // Calcula os índices dos slides visíveis
  const getSlideIndex = (offset: number) =>
    (current + offset + cards.length) % cards.length;
  const visibleSlides = [getSlideIndex(-1), current, getSlideIndex(1)];

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-row justify-center items-stretch gap-6 w-full max-w-4xl relative">
        {cards.map((card, idx) => {
          // Desktop: mostra anterior, atual, próximo. Mobile: só o atual.
          const isVisible = visibleSlides.includes(idx);
          const isCurrent = idx === current;
          return (
            <div
              key={idx}
              className={`transition-all duration-300 bg-white rounded-2xl shadow-lg p-6 flex-1 max-w-xs min-w-[280px] border-t-8
                ${
                  isCurrent
                    ? "border-green-500 scale-105 z-10"
                    : "border-gray-200 scale-95 opacity-60 z-0"
                }
                ${isVisible ? "md:block" : "hidden"}
                ${isCurrent ? "block" : "hidden"} md:block
              `}
              style={{
                display: isVisible ? undefined : "none",
              }}
            >
              <div className="w-full h-40 rounded-xl overflow-hidden mb-4 flex items-center justify-center bg-gray-100">
                <Image
                  src={card.image}
                  alt={card.title}
                  width={320}
                  height={160}
                  className="object-cover w-full"
                />
              </div>
              <span className="text-xs text-gray-500 mb-2 border-gray-500 border-1 px-2 py-1 inline-block rounded-full">
                function
              </span>

              <p className="text-gray-700 mb-4">{card.description}</p>
              <a
                href={card.link}
                className="text-green-500 font-semibold hover:underline text-sm"
              >
                {card.linkText}
              </a>
            </div>
          );
        })}
      </div>
      {/* Indicadores */}
      <div className="flex gap-2 mt-4 max-w-xs min-w-[280px] justify-between ">
        <button
          onClick={prev}
          className=" bg-white rounded-full shadow p-2 hover:bg-green-100 transition hidden md:block"
          aria-label="Anterior"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="flex gap-2">
          {cards.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`w-4 h-4 cursor-pointer rounded-full border-2 ${
                idx === current
                  ? "bg-green-400 border-green-400"
                  : "bg-gray-200 border-gray-300"
              } transition`}
              aria-label={`Ir para o slide ${idx + 1}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className=" bg-white rounded-full shadow p-2 hover:bg-green-100 transition hidden md:block"
          aria-label="Próximo"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
