import React, { useEffect } from "react";
import Image from "next/image";
import logo2 from "../assets/logo-2.png";
import Markdown from "react-markdown";
import { Copy, Pencil, RotateCw, ThumbsUp, ThumbsDown } from "lucide-react";
import toast from "react-hot-toast";
import Prism from "prismjs";
import "prismjs/themes/prism.css";

interface MessageProps {
  role: string;
  content: string;
}

const Message: React.FC<MessageProps> = ({ role, content }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [content]);

  const copyMessage = () => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="flex flex-col items-center w-full max-w-3xl text-sm">
      <div
        className={`flex flex-col w-full mb-8 ${
          role === "user" && "items-end"
        }`}
      >
        <div
          className={`group relative flex max-w-2xl py-3 rounded-xl ${
            role === "user" ? "bg-[#414158] px-5" : "gap-3"
          }`}
        >
          <div
            className={`opacity-0 group-hover:opacity-100 absolute ${
              role === "user" ? "-left-16 top-2.5" : "left-9 -bottom-6"
            } transition-all`}
          >
            <div className="flex items-center gap-2 opacity-70">
              {role === "user" ? (
                <>
                  <Copy onClick={copyMessage} className="text-sm w-5 h-5" />
                  <Pencil className="text-sm w-5 h-5" />
                </>
              ) : (
                <>
                  <Copy onClick={copyMessage} className="text-sm w-5 h-5" />
                  <RotateCw className="text-sm w-5 h-5" />
                  <ThumbsUp className="text-sm w-5 h-5" />
                  <ThumbsDown className="text-sm w-5 h-5" />
                </>
              )}
            </div>
          </div>

          {role === "user" ? (
            <span className="text-white/90">{content}</span>
          ) : (
            <>
              <Image
                src={logo2}
                alt="logo"
                width={60}
                height={60}
                className="h-9 w-9 p-1 border border-white/15 rounded-full"
              />
              <div className="space-y-4 w-full overflow-scroll">
                <Markdown>{content}</Markdown>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
