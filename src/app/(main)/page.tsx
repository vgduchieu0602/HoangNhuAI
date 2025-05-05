"use client";

import { useState } from "react";
import Image from "next/image";

import PromptBox from "@/app/components/PromptBox";
import Message from "@/app/components/Message";

import logo2 from "../assets/logo-2.png";

import { useSidebarContext } from "@/app/context/SidebarContext";

import { Menu } from "lucide-react";
import { MessageSquareHeart } from "lucide-react";

export default function Home() {
  const { expand, setExpand } = useSidebarContext();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
          <div>
            <Message role="user" content="What's NextJS" />
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
