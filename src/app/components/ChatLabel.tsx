import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Ellipsis, SquarePen, Trash2 } from "lucide-react";
import { useAppContext } from "../context/AppContext";

interface ChatLabelProps {
  openMenu: { id: number; open: boolean };
  setOpenMenu: (menu: { id: number; open: boolean }) => void;
  id: string;
  name: string;
}

const ChatLabel: React.FC<ChatLabelProps> = ({
  openMenu,
  setOpenMenu,
  id,
  name,
}) => {
  const { fetchUsersChats, chats, setSelectedChat } = useAppContext();

  const selectChat = () => {
    const chatData = chats.find((chat) => chat._id === id);
    setSelectedChat(chatData);
    console.log(chatData);
  };

  const renameHandler = async () => {
    try {
      const newName = prompt("Enter new name: ");
      if (!newName) return;
      const { data } = await axios.post("/api/chat/rename", {
        chatId: id,
        name: newName,
      });
      if (data.success) {
        fetchUsersChats();
        setOpenMenu({ id: 0, open: false });
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteHandler = async () => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this chat?"
      );
      if (!confirm) return;
      const { data } = await axios.post("/api/chat/delete", { chatId: id });
      if (data.success) {
        fetchUsersChats();
        setOpenMenu({ id: 0, open: false });
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      onClick={selectChat}
      className="flex items-center justify-between p-2 text-white/80 hover:bg-white/10 rounded-lg text-sm group cursor-pointer"
    >
      <p className="group-hover:max-w-5/6 truncate">{name}</p>
      <div className="group relative flex items-center justify-center h-6 w-6 aspect-square hover:bg-black/80 rounded-lg">
        <Ellipsis
          className={`${openMenu.open ? "" : "hidden"} group-hover:block`}
        />
        <div
          className={`${
            openMenu.open ? "block" : "hidden"
          } absolute -right-36 top-6 bg-gray-700 rounded-xl w-max p-2`}
        >
          <div
            onClick={renameHandler}
            className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg cursor-pointer"
          >
            <SquarePen />
            <p>Rename</p>
          </div>
          <div
            onClick={deleteHandler}
            className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg cursor-pointer"
          >
            <Trash2 />
            <p>Delete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLabel;
