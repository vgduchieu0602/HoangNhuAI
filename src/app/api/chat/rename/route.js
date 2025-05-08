import Chat from "@/app/models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "User not authenticated",
      });
    }

    const { chatId, name } = await req.json();

    //Connect to the database and update the chat name
    await connectDB();
    Chat.findOneAndUpdate(
      {
        _id: chatId,
        userId,
      },
      {
        name,
      }
    );

    return NextResponse.json({
      success: true,
      message: "Chat renamed successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
