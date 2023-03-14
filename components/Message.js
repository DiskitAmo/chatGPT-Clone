const Message = ({ message }) => {
  const isChatGPT = message.user.name === "chatGPT";
  return (
    <div className={`py-5 text-white ${isChatGPT ? "bg-[#434654]" : ""}`}>
      <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
        <img
          src={message.user.avatar}
          alt="img"
          className="h-8 w-8 rounded-md"
          referrerPolicy="no-referrer"
        />
        <p className="pt-1 text-sm">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
