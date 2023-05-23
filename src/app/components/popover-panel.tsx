import { Popover, Transition } from "@headlessui/react";
import Image from "next/image";
import { FC, FormEventHandler, ReactNode } from "react";
import { ChatBubble } from "./chat-bubble";

type Props = {
  isOpen: boolean;
  children?: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
  input: string;
  setInput: (input: string) => void;
  disabled: boolean;
};
export const PopoverPanel: FC<Props> = ({ isOpen, children, onSubmit, input, setInput, disabled }) => {
  return (
    <Transition className="h-[500px]" show={isOpen} enter="transition duration-100 ease-out" enterFrom="transform scale-95 opacity-0" enterTo="transform scale-100 opacity-100" leave="transition duration-75 ease-out" leaveFrom="transform scale-100 opacity-100" leaveTo="transform scale-95 opacity-0">
      <Popover.Panel className="w-[342px] h-[500px] flex flex-col bg-white rounded-lg drop-shadow-md pb-6 overflow-hidden">
        <div className="w-full h-[75px] bg-gradient-to-r from-cyan-500 to-cyan-500/60 flex items-center justify-center">
          <div className="text-center text-white font-bold text-xl">INTEGRATED CHATBOT</div>
        </div>
        <div className="w-full h-[425px] bg-white px-3.5">
          <div className="h-[355px] overflow-y-scroll">
            <ChatBubble isBot={true} message="Hi, I’m a chatbot" />
            {children}
          </div>
          <form className="flex gap-x-3 pt-2 h-[60px]" onSubmit={onSubmit}>
            <div className="flex-1">
              <textarea value={input} className="w-full h-12 border border-[#d5d5d5] focus:outline-cyan-500 rounded-full px-3.5 resize-none pt-2.5" placeholder="Start typing here..." onChange={(e) => setInput(e.target.value)} />
            </div>
            <button type="submit" disabled={disabled} className="w-12 h-12 bg-cyan-500 hover:bg-cyan-400 rounded-full px-3.5 disabled:opacity-50">
              <Image className="w-full h-full" src="/images/send.svg" alt="send" width={999} height={999} />
            </button>
          </form>
        </div>
      </Popover.Panel>
    </Transition>
  );
};
