"use client";

import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  //Tạo cuộc trò chuyện mới
  //+ Kiểm tra đăng nhập
  //+ Gọi API tạo chat mới
  //+ Cập nhật lại danh sách
  const createNewChat = async () => {
    try {
      if (!user) return null;

      const token = await getToken();

      await axios.post(
        "/api/chat/create",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchUsersChats();
    } catch (error) {
      toast.error(error.message);
    }
  };

  //Lấy danh sách chat của người dùng
  //+ Lấy token xác thực
  //+ Gọi API để lấy danh sách chat
  //+ Nếu không có chat nào, tự động tạo chat mới
  //+ Sắp xếp chat theo thời gian cập nhật
  //+ Chọn chat mới nhất làm chat được chọn
  const fetchUsersChats = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/chat/get", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        console.log(data.data);
        setChats(data.data);

        //If the user has no chats, create one
        if (data.data.length === 0) {
          await createNewChat();
          return fetchUsersChats();
        } else {
          //sort chats by updated date
          data.data.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );

          //set recently updated chat as selected chat
          setSelectedChat(data.data[0]);
          console.log(data.data[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  console.log("User:", user);

  //Tự động lấy danh sách chat khi người dùng đăng nhập
  useEffect(() => {
    if (user) {
      fetchUsersChats();
    }
  }, [user]);

  const value = {
    user,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    createNewChat,
    fetchUsersChats,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
