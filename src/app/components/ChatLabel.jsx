import React from "react";

import { Ellipsis } from "lucide-react";
import { SquarePen } from "lucide-react";
import { Trash2 } from "lucide-react";

const ChatLabel = ({ openMenu, setOpenMenu }) => {
  return (
    <div className="flex items-center justify-between p-2 text-white/80 hover:bg-white/10 rounded-lg text-sm group cursor-pointer">
      <p className="group-hover:max-w-5/6 truncate">Chat Name Here</p>
      <div className="group relative flex items-center justify-center h-6 w-6 aspect-square hover:bg-black/80 rounded-lg">
        <Ellipsis
          className={`${openMenu.open ? "" : "hidden"} group-hover:block`}
        />
        <div
          className={`${
            openMenu.open ? "block" : "hidden"
          } absolute -right-36 top-6 bg-gray-700 rounded-xl w-max p-2`}
        >
          <div className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg">
            <SquarePen />
            <p>Rename</p>
          </div>
          <div className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg">
            <Trash2 />
            <p>Delete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLabel;
