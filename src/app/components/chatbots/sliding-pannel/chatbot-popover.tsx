import { Chat } from "@/app/types/chat";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import { FC, useState } from "react";
import { ChatBubble } from "../common/chat-bubble";

type Props = {
  generateResponse: (query: string) => Promise<string>;
  initializing: boolean;
};
export const SlidingChatbotPopover: FC<Props> = ({ generateResponse, initializing }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  const [isBotSpeaking, setIsBotSpeaking] = useState(false);

  const [chats, setChats] = useState<Chat[]>([]);
  const addChat = (chat: Chat) => {
    setChats((prev) => [...prev, chat]);
  };

  const handleSend = async () => {
    addChat({
      isBot: false,
      message: input,
    });
    setInput("");

    setIsBotSpeaking(true);
    const response = await generateResponse(input);
    setIsBotSpeaking(false);

    addChat({
      isBot: true,
      message: response,
    });
  };

  return (
    <div className="relative">
      <Transition show={isOpen}>
        <Transition.Child enter="transition ease duration-300 transform" enterFrom="translate-y-full" enterTo="translate-y-0" leave="transition ease duration-300 transform" leaveFrom="translate-y-0" leaveTo="translate-y-full" className="absolute bottom-0 z-10 h-[400px] w-96 overflow-hidden rounded-tr-md bg-white drop-shadow">
          <div className="flex h-[40px] items-center justify-between bg-violet-600 pl-5 pr-1 text-sm text-white">
            <div>Ask Me Anything - AI Chatbot</div>
            <button className="rounded-full p-1 hover:bg-white/50" onClick={() => setIsOpen(false)}>
              <Image src="/images/close.svg" alt="close" width={20} height={20} />
            </button>
          </div>
          <div className="flex h-[300px] flex-col justify-end">
            <div className="h-fit overflow-y-scroll px-2">
              <ChatBubble isBot message="Hi, ask me anything" />
              {chats.map((chat, i) => (
                <ChatBubble key={i} {...chat} />
              ))}
              {isBotSpeaking && <ChatBubble isBot loading message="" />}
            </div>
          </div>
          <div className="flex h-[60px] items-center overflow-hidden border-t border-t-gray-300 py-1">
            <div className="h-full w-full overflow-hidden">
              <input placeholder="Start typing here" value={input} onChange={(e) => setInput(e.target.value)} className="h-full w-full resize-none px-2 focus:outline-none" />
            </div>
            <button onClick={handleSend} disabled={!input || initializing} className="h-full rounded-full px-2 hover:opacity-50 disabled:opacity-20">
              <Image src="/images/send_black.svg" alt="send" width={24} height={24} />
            </button>
          </div>
        </Transition.Child>
      </Transition>
      <button className="rounded-tr-[60px] bg-violet-600 pb-4 pl-5 pr-12 pt-6 font-montserrat text-lg text-white hover:opacity-50" onClick={() => setIsOpen(!isOpen)}>
        Ask me anything
      </button>
    </div>
  );
};
