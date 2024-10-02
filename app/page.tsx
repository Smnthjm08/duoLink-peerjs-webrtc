// app/page.tsx
"use client";

import Hero13 from "@/components/landing/hero";
import Features from "@/components/landing/features";
import Footer from "@/components/landing/footer";
import Testimonial from "@/components/landing/testimonial";
import { useSocket } from "@/context/SocketContext";
import { useEffect } from "react";

const Home: React.FC = () => {
  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Connected to socket page.tsx", socket.id);
      });
    }
  }, [socket]);

  return (
    <div className="flex flex-col min-h-screen bg-bac">
      <main className="flex-grow px-4 sm:px-6 md:px-8 lg:px-20">
        <Hero13 />
        <Features />
        <Testimonial />
        <Footer />
      </main>
    </div>
  );
};

export default Home;