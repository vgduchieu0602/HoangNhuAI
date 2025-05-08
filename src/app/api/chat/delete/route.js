import connectDB from "@/app/lib/mongodb";
import Chat from "@/app/models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("Req JSON: ", await req.json());

    const { userId } = getAuth(req);
    const { chatId } = await req.json();

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "User not authenticated",
      });
    }

    //Connect to the database and delete the chat
    await connectDB();
    await Chat.deleteOne({
      _id: chatId,
      userId,
    });

    return NextResponse.json({
      success: true,
      message: "Chat deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error deleting chat",
      error: error.message,
    });
  }
}
