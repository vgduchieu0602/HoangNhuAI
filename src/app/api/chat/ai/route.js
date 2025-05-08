export const maxDuration = 60; //Giới hạn thời gian xử lý request là 60s
import OpenAI from "openai";
import { getAuth } from "@clerk/nextjs/server";
import Chat from "@/app/models/Chat";
import connectDB from "@/app/config/db";

//Initialize the OpenAI client with Deepseek API key and base URL
const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function POST(req) {
  try {
    const { userId } = getAuth(req);

    //Extract chatId and prompt from the request body
    const { chatId, prompt } = await req.json();
    console.log("Request body:", { chatId, prompt });

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "User not authenticated",
      });
    }

    //Find the chat document in the database based on userId and chatId
    console.log("Connecting to database...");
    await connectDB();
    const data = await Chat.findOne({ _id: chatId, userId });
    console.log("Chat data found:", data ? "Yes" : "No");

    //Create a user message object
    const userPrompt = {
      role: "user",
      content: prompt,
      timestamp: Date.now(),
    };
    console.log("User prompt created:", userPrompt);

    //Lưu dữ liệu đầu vào của người dùng nhập
    data.messages.push(userPrompt);

    //Call the Deepseek API to get a chat completion
    console.log("Calling Deepseek API...");
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "deepseek-chat",
      store: true,
    });
    console.log("Deepseek API response:", completion);

    //Lấy câu trả lời từ AI
    const message = completion.choices[0].message;
    message.timestamp = Date.now();

    //Lưu câu trả lời vào db
    data.messages.push(message);
    console.log("Saving chat data...");
    await data.save();
    console.log("Chat data saved successfully");

    return NextResponse.json({ success: true, data: message });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
