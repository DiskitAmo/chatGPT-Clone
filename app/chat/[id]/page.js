import Chat from "../../../components/Chat";
import ChatInput from "../../../components/ChatInput";
//import { useRouter } from "next/navigation";

const ChatPage = (props) => {
  //console.log("the props", props);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* chat */}
      <Chat chatId={props.params.id} />
      {/* chatInput */}
      <ChatInput chatId={props.params.id} />
    </div>
  );
};

export default ChatPage;
