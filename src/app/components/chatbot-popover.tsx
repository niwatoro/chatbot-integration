import { Popover } from "@headlessui/react";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { Chat } from "../types/chat";
import { Query } from "../types/query";
import { ChatBubble } from "./chat-bubble";
import { PopoverButton } from "./popover-button";
import { PopoverPanel } from "./popover-panel";
import { QueryButton } from "./query-button";

type Props = {
  generateResponse: (query: string) => Promise<string>;
  initializing: boolean;
};
export const ChatbotPopover: FC<Props> = ({ initializing, generateResponse }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const queries: Query[] = [
    {
      value: "engineer",
      label: "I need an engineer",
    },
    {
      value: "entrepreneur",
      label: "I need an entrepreneur",
    },
  ];
  const [selectedQuery, setSelectedQuery] = useState<string | null>(null);

  const [botSpeaking, setBotSpeaking] = useState(false);

  const [input, setInput] = useState("");

  const addChat = async (chat: Chat) => {
    setChats((prev) => [...prev, chat]);
  };
  const selectQuery = async (query: Query) => {
    setSelectedQuery(query.value);
    if (!initializing) {
      addChat({
        isBot: true,
        message: "Great! Ask me anything.",
      });
    } else {
      setBotSpeaking(true);
    }
  };

  useEffect(() => {
    if (!initializing && botSpeaking) {
      setBotSpeaking(false);
      addChat({
        isBot: true,
        message: "Great! Ask me anything.",
      });
    }
  }, [initializing]);

  return (
    <Popover className="h-screen max-h-screen fixed bottom-0 right-0 pr-8 pb-14 pt-5 flex flex-col items-end justify-end gap-y-5">
      {(open) => (
        <>
          {open && (
            <PopoverPanel isOpen={open.open}>
              {selectedQuery && <QueryButton query={queries.find((q) => q.value === selectedQuery)!} selected={selectedQuery} />}
              {queries
                .filter((q) => q.value !== selectedQuery)
                .map((query, index) => (
                  <QueryButton key={index} query={query} onClick={() => selectQuery(query)} selected={selectedQuery} />
                ))}
              {chats.map((chat, index) => (
                <ChatBubble key={index} {...chat} />
              ))}
              {botSpeaking && <ChatBubble isBot loading message="" />}
              {selectedQuery && (
                <div className="flex gap-x-3">
                  <div className="flex-1">
                    <textarea value={input} className="w-full h-12 border border-[#d5d5d5] focus:outline-cyan-500 rounded-full px-3.5 resize-none pt-2.5" placeholder="Start typing here..." onChange={(e) => setInput(e.target.value)} />
                  </div>
                  <button
                    disabled={botSpeaking || !input}
                    className="w-12 h-12 bg-cyan-500 hover:bg-cyan-400 rounded-full px-3.5 disabled:opacity-50"
                    onClick={async () => {
                      setInput("");
                      addChat({
                        isBot: false,
                        message: input,
                      });

                      setBotSpeaking(true);
                      const response = await generateResponse(input);
                      setBotSpeaking(false);
                      addChat({
                        isBot: true,
                        message: response,
                      });
                    }}
                  >
                    <Image className="w-full h-full" src="/images/send.svg" alt="send" width={999} height={999} />
                  </button>
                </div>
              )}
            </PopoverPanel>
          )}
          <PopoverButton isOpen={open.open} />
        </>
      )}
    </Popover>
  );
};
