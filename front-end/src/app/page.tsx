"use client";
import { SessionProvider } from "next-auth/react";
import ContentPage from "./contentpage";

export default function Home() {
  return (
    <SessionProvider>
      <ContentPage />
    </SessionProvider>
  );
}
