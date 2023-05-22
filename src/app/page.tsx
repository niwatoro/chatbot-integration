"use client";

import Image from "next/image";
import { useEffect } from "react";
import { ChatbotPopover } from "./components/chatbot-popover";
import { useLlm } from "./hooks/use-llm";

export default function Page() {
  const { initialize, initializing, generateResponse } = useLlm();

  useEffect(() => {
    initialize();
  }, []);

  return (
    <div className="relative">
      <div className="w-screen h-screen absolute">
        <ChatbotPopover
          initializing={initializing}
          generateResponse={async (input) => {
            const res = await generateResponse(input);
            return res;
          }}
        />
      </div>
      <div className="w-screen h-screen overflow-hidden">
        <Image src="/images/background.png" alt="bg" width={9999} height={9999} />
      </div>
    </div>
  );
}
