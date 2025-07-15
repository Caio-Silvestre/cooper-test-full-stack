"use client";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

interface HeaderProps {
  onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  const { data: session } = useSession();
  return (
    <header className="flex justify-between items-center px-8 py-4 border-b border-gray-200 z-20 fixed top-0 left-0 right-0 bg-white/50">
      <div className="flex items-center gap-2 z-20">
        <Image
          src="/logo-coopers.png"
          alt="Coopers logo"
          width={150}
          height={150}
        />
      </div>
      {session?.user ? (
        <button
          className="bg-black text-white px-6 py-2 rounded hover:cursor-pointer hover:bg-gray-800 transition-all z-20"
          onClick={() => signOut()}
        >
          SAIR
        </button>
      ) : (
        <button
          className="bg-black text-white px-6 py-2 rounded hover:cursor-pointer hover:bg-gray-800 transition-all z-20"
          onClick={onLoginClick}
        >
          ENTRAR
        </button>
      )}
    </header>
  );
};

export default Header;
