"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

import PromptBox from "../components/PromptBox";
import Message from "../components/Message";

import logo2 from "../assets/logo-2.png";

import { useSidebarContext } from "../context/SidebarContext";
import { useAppContext } from "../context/AppContext";

import { Menu, MessageSquareHeart } from "lucide-react";

interface Message {
  role: string;
  content: string;
}

export default function Home() {
  const { expand, setExpand } = useSidebarContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { selectedChat } = useAppContext();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages);
    }
  }, [selectedChat]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <>
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8 bg-[#292a2d] text-white relative">
        <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full">
          <Menu
            className="h-6 w-6"
            onClick={() => (expand ? setExpand(false) : setExpand(true))}
          />
          <MessageSquareHeart className="h-6 w-6" />
        </div>

        {messages.length === 0 ? (
          <>
            <div className="flex items-center gap-2">
              <Image src={logo2} alt="logo" width={60} height={60} />
              <p className="text-2xl font-bold ">Hi, I'm Nuu.</p>
            </div>
            <p className="text-sm mt-2">How can I help you today?</p>
          </>
        ) : (
          <div
            ref={containerRef}
            className="relative flex flex-col items-center justify-start w-full mt-20 max-h-screen overflow-y-auto"
          >
            <p className="fixed top-8 border border-transparent hover:border-gray-500/50 py-1 px-2 rounded-lg font-semibold mb-6">
              {selectedChat?.name}
            </p>
            {messages.map((msg, index) => (
              <Message key={index} role={msg.role} content={msg.content} />
            ))}

            {/* Animation loading */}
            {isLoading && (
              <div className="flex gap-4 max-w-3xl w-full py-3">
                <Image
                  src={logo2}
                  alt="logo"
                  width={60}
                  height={60}
                  className="border border-white/15 rounded-full"
                />
                <div className="loader flex justify-center items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                  <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                  <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Prompt box */}
        <PromptBox isLoading={isLoading} setIsLoading={setIsLoading} />

        <p className="text-xs absolute bottom-1 text-gray-500">
          AI-generated, for reference only
        </p>
      </div>
    </>
  );
}
