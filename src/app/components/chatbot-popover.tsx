import { Popover } from "@headlessui/react";
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
  queries: Query[];
};
export const ChatbotPopover: FC<Props> = ({ queries, initializing, generateResponse }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedQuery, setSelectedQuery] = useState<string | null>(null);

  const [botSpeaking, setBotSpeaking] = useState(false);

  const [input, setInput] = useState("");

  const addChat = (chat: Chat) => {
    setChats((prev) => [...prev, chat]);
  };
  const selectQuery = (query: Query) => {
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
            <PopoverPanel
              isOpen={open.open}
              disabled={botSpeaking || !input}
              input={input}
              setInput={setInput}
              onSubmit={async (e) => {
                e.preventDefault();
                const input_ = e.currentTarget.querySelector("textarea")!.value;
                setInput("");

                addChat({
                  isBot: false,
                  message: input_,
                });

                setBotSpeaking(true);
                const response = await generateResponse(input_);
                setBotSpeaking(false);
                addChat({
                  isBot: true,
                  message: response,
                });
              }}
            >
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
            </PopoverPanel>
          )}
          <PopoverButton isOpen={open.open} />
        </>
      )}
    </Popover>
  );
};
