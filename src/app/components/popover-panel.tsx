import { Popover, Transition } from "@headlessui/react";
import Image from "next/image";
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
        <div className="w-full h-[72px] min-h-[72px] bg-gradient-to-r from-[#e2582d] to-[#e2582d]/60 flex items-center">
          <div className="w-1/2 flex justify-center">
            <div className="w-16 h-6">
              <Image src="/images/logo.svg" alt="logo" width={999} height={999} />
            </div>
          </div>
          <div className="border-white border h-10" />
          <div className="w-1/2 flex justify-center">
            <div className="text-white text-lg">Let's chat!</div>
          </div>
        </div>
        <div className="w-full h-full max-h-[569px] overflow-hidden flex flex-col gap-y-3 justify-end bg-white px-3.5">
          <ChatBubble isBot={true} message="Hi, I’m Alto’s new chat assistant. Have a question about gear or need to text a salesperson?" />
          {children}
        </div>
      </Popover.Panel>
    </Transition>
  );
};
