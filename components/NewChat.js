"use client";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { db } from "../firebase";

const NewChat = ({ session }) => {
  const router = useRouter();
  const createNewChat = async () => {
    const doc = await addDoc(
      collection(db, "users", session?.user?.email, "chats"),
      {
        userId: session?.user?.email,
        createdAt: serverTimestamp(),
      }
    );
    router.push(`/chat/${doc.id}`);
  };

  return (
    <div
      onClick={createNewChat}
      className="chatRow border-gray border-solid border-2 "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4 mr-0 md:mr-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
      <span className="hidden md:inline-flex">NewChat</span>
    </div>
  );
};

export default NewChat;
