"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import toast from "react-hot-toast";

const ChatInput = ({ chatId }) => {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();

  //useSWR TO GET MODEL
  const model = "text-davinci-003";

  const sentMessage = async (e) => {
    e.preventDefault();
    if (!prompt) return;
    const input = prompt.trim();
    setPrompt("");

    const message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email,
        name: session?.user?.name,
        avatar: session?.user?.image,
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    const notification = toast.loading("ChatGPT is thinking...");

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      toast.success("ChatGPT has responded", {
        id: notification,
      });
    });
  };

  return (
    <div className="bg-gray-700 text-gray-400 rounded-lg text-sm">
      <form onSubmit={sentMessage} className="p-5 space-x-5 flex">
        <input
          className="bg-transparent focus:outline-none flex-1
           disabled:text-gray-300 "
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          placeholder="Type your message here..."
          disabled={!session}
        />
        <button
          type="submit"
          disabled={!prompt || !session}
          className={`bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded
          disabled:bg-gray-300 disabled:cursor-not-allowed`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </form>
      <div>{/* ModelSelection */}</div>
    </div>
  );
};

export default ChatInput;
