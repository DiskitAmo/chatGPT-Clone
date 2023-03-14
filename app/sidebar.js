"use client";
import { useSession, signOut } from "next-auth/react";
import React from "react";
import NewChat from "../components/NewChat";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import ChatRow from "../components/ChatRow";
//import ModelSelection from "../components/ModelSelection";

const Sidebar = ({ session }) => {
  //const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  //console.log(chats);
  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          {/* NextChat */}
          <NewChat session={session} />
          <div className="hidden sm:inline ">
            {/* ModelSelector */}
            {/* <ModelSelection /> */}
          </div>

          {/* Map through the ChatRows */}
          {chats?.docs.map((chat) => (
            <ChatRow key={chat.id} id={chat.id} session={session} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <img
          onClick={() => signOut()}
          className="rounded-full  mb-4"
          src={session.user.image}
          alt="profile pic"
          width={30}
          height={30}
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
};

export default Sidebar;
