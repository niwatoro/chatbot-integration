import { Popover, Transition } from "@headlessui/react";
import { FC, ReactNode } from "react";
import { ChatBubble } from "./chat-bubble";

type Props = {
  isOpen: boolean;
  children?: ReactNode;
};
export const PopoverPanel: FC<Props> = ({ isOpen, children }) => {
  return (
    <Transition className="h-full max-h-[700px]" show={isOpen} enter="transition duration-100 ease-out" enterFrom="transform scale-95 opacity-0" enterTo="transform scale-100 opacity-100" leave="transition duration-75 ease-out" leaveFrom="transform scale-100 opacity-100" leaveTo="transform scale-95 opacity-0">
      <Popover.Panel className="w-[342px] h-full flex flex-col bg-white rounded-lg drop-shadow-md overflow-hidden pb-6">
        <div className="w-full h-[72px] min-h-[72px] bg-gradient-to-r from-cyan-500 to-cyan-500/60 flex items-center justify-center">
          <div className="text-center text-white font-bold text-xl">INTEGRATED CHATBOT</div>
        </div>
        <div className="w-full h-full max-h-[569px] overflow-hidden flex flex-col gap-y-3 justify-end bg-white px-3.5">
          <ChatBubble isBot={true} message="Hi, I’m a chatbot" />
          {children}
        </div>
      </Popover.Panel>
    </Transition>
  );
};
