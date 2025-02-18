const ChatLoading = () => {
  return (
    <div className="flex justify-start">
      <div className="bg-gray-100 rounded-2xl px-4 py-2 rounded-bl-none">
        <div className="flex space-x-2 items-center">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
        </div>
      </div>
    </div>
  );
};

export default ChatLoading;
