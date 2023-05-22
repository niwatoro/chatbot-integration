"use client";

import { useEffect } from "react";
import { ChatbotPopover } from "./components/chatbot-popover";
import { useLlm } from "./hooks/use-llm";

export default function Page() {
  const { initialize, initializing, generateResponse } = useLlm();

  useEffect(() => {
    initialize();
  }, []);

  return (
    <div className="relative bg-black w-screen h-screen">
      <ChatbotPopover
        initializing={initializing}
        generateResponse={async (input) => {
          const res = await generateResponse(input);
          return res;
        }}
      />
    </div>
  );
}
