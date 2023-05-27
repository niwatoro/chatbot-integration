"use client";

import { useEffect } from "react";
import { FloatingChatbotPopover } from "./components/chatbots/floating-pannel/chatbot-popover";
import { SlidingChatbotPopover } from "./components/chatbots/sliding-pannel/chatbot-popover";
import { useLlm } from "./hooks/use-llm";

export default function Page() {
  const { initialize, initializing, generateResponse } = useLlm();

  useEffect(() => {
    initialize();
  }, []);

  return (
    <div className="relative h-screen w-screen bg-white">
      <div className="fixed bottom-0 right-0">
        <FloatingChatbotPopover
          initializing={initializing}
          generateResponse={async (input) => {
            const res = await generateResponse(input);
            return res;
          }}
          queries={[
            {
              value: "engineer",
              label: "I need an engineer",
            },
            {
              value: "entrepreneur",
              label: "I need an entrepreneur",
            },
          ]}
        />
      </div>
      <div className="fixed bottom-0 left-0">
        <SlidingChatbotPopover
          initializing={initializing}
          generateResponse={async (input) => {
            const res = await generateResponse(input);
            return res;
          }}
        />
      </div>
    </div>
  );
}
