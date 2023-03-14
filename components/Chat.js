"use client";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";

const Chat = ({ chatId }) => {
  const { data: session } = useSession();
  // console.log("the id:", chatId);

  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session?.user.email,
          "chats",
          chatId,
          "messages"
        ),
        orderBy("createdAt", "asc")
      )
  );

  // console.log("the messages:", messages?.docs);
  return (
    <div className="flex-1 text-white overflow-y-auto overflow-x-hidden ">
      {messages?.empty && (
        <>
          <p className="mt-10 text-center text-white">
            Type a prompt in below to get started!
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 mx-auto mt-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </>
      )}

      {messages?.docs.map((message) => (
        <Message key={message.id} message={message.data()} />
      ))}
    </div>
  );
};

export default Chat;
