"use client";

import React from "react";
import Image from "next/image";

import logo2 from "../assets/logo-2.png";
import newIcon from "../assets/new_icon.svg";
import qrCode from "../assets/qrcode.png";

import { useSidebarContext } from "../context/SidebarContext";
import { useAppContext } from "../context/AppContext";

import { useClerk, UserButton } from "@clerk/nextjs";

import { Menu } from "lucide-react";
import { PanelRightOpen } from "lucide-react";
import { PanelLeftOpen } from "lucide-react";
import { MessagesSquare } from "lucide-react";
import { QrCode } from "lucide-react";
import { CircleUser } from "lucide-react";

const Sidebar = () => {
  const { expand, setExpand } = useSidebarContext();
  const { openSignIn } = useClerk();
  const { user } = useAppContext();
  return (
    <div className="flex flex-col justify-between bg-[#212327] px-5 py-7 transition-all z-50 max-md:absolute max-md:h-screen max-md:overflow-hidden">
      <div>
        <div
          className={`flex ${
            expand ? "flex-row gap-20" : "flex-col items-center gap-8"
          }`}
        >
          <Image
            src={logo2}
            alt="Logo"
            height={expand ? 120 : 50}
            width={expand ? 120 : 50}
          />

          <div
            onClick={() => {
              expand ? setExpand(false) : setExpand(true);
            }}
            className="group relative flex items-center justify-center hover:bg-gray-500/20 transition-all duration-300 h-9 w-9 aspect-square rounded-lg cursor-pointer"
          >
            <Menu className="md:hidden" />
            {expand ? (
              <PanelRightOpen className="hidden md:block h-8 w-8 text-white" />
            ) : (
              <PanelLeftOpen className="hidden md:block h-8 w-8 text-white" />
            )}
            <div
              className={`absolute w-max ${
                expand ? "left-1/2 -translate-x-1/2 top-12" : "-top-12 left-0"
              } opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none`}
            >
              {expand ? "Close sidebar" : "Open sidebar"}
              <div
                className={`w-3 h-3 absolute bg-black rotate-45 ${
                  expand
                    ? "left-1/2 -top-1.5 -translate-x-1/2"
                    : "left-4 -bottom-1.5"
                }`}
              ></div>
            </div>
          </div>
        </div>

        <button
          className={`mt-8 flex items-center justify-center cursor-pointer ${
            expand
              ? "bg-primary hover:opacity-90 rounded-2xl gap-2 p-2.5 w-max"
              : "group relative h-9 w-9 mx-auto hover:bg-gray-500/30 rounded-lg"
          } text-white`}
        >
          <MessagesSquare className="h-8 w-8" />
          <div className="absolute w-max -top-12 -right-12 opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none">
            New Chat
            <div className="w-3 h-3 absolute bg-black rotate-45 left-4 -bottom-1.5"></div>
          </div>
          {expand && <p className="text-white text font-medium">New Chat</p>}
        </button>

        <div
          className={`mt-8 text-white/25 text-sm ${
            expand ? "block" : "hidden"
          }`}
        >
          <p className="my-1">Recents</p>
          {/* chatLabel */}
        </div>
      </div>

      <div>
        <div
          className={`flex items-center cursor-pointer group relative text-white ${
            expand
              ? "gap-1 text-sm p-2.5 border border-primary rounded-lg hover:bg-white/10 cursor-pointer"
              : "h-10 w-10 mx-auto hover:bg-gray-500/30 rounded-lg"
          }`}
        >
          <QrCode className={expand ? "w-8 h-8" : "w-8 h-8 mx-auto"} />
          <div
            className={`absolute -top-60 pb-8 ${
              !expand && "-right-40"
            } opacity-0 group-hover:opacity-100 hidden group-hover:block transition`}
          >
            <div className="relative w-max bg-black text-white text-sm p-3 rounded-lg shadow-lg">
              <Image src={qrCode} alt="qrcode" height={180} width={180} />
              <p>Scan to download</p>
              <div
                className={`w-3 h-3 absolute bg-black rotate-45 ${
                  expand ? "right-1/2" : "left-4"
                } -bottom-1.5`}
              ></div>
            </div>
          </div>
          {expand && (
            <>
              <span>Get App</span>{" "}
              <Image src={newIcon} alt="New Icon" height={30} width={30} />
            </>
          )}
        </div>

        <div
          onClick={user ? null : openSignIn}
          className={`flex items-center ${
            expand ? "hover:bg-white/10 rounded-lg" : "justify-center w-full"
          } gap-3 text-white text-sm p-2 mt-2 cursor-pointer`}
        >
          {user ? <UserButton /> : <CircleUser className="h-8 w-8" />}
          {expand && <span>Profile</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
