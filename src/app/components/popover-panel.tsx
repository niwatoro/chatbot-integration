import { Popover, Transition } from "@headlessui/react";
import Image from "next/image";
import { FC, FormEventHandler, ReactNode } from "react";
import { classNames } from "../utils/class-names";
import { ChatBubble } from "./chat-bubble";

type Props = {
  isOpen: boolean;
  children?: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
  input: string;
  setInput: (input: string) => void;
  sendDisabled: boolean;
  showInput: boolean;
};
export const PopoverPanel: FC<Props> = ({ isOpen, children, onSubmit, input, setInput, sendDisabled, showInput }) => {
  return (
    <Transition className="h-[500px]" show={isOpen} enter="transition duration-100 ease-out" enterFrom="transform scale-95 opacity-0" enterTo="transform scale-100 opacity-100" leave="transition duration-75 ease-out" leaveFrom="transform scale-100 opacity-100" leaveTo="transform scale-95 opacity-0">
      <Popover.Panel className="flex h-[500px] w-[342px] flex-col overflow-hidden rounded-lg bg-white pb-6 drop-shadow-md">
        <div className="flex h-[75px] w-full items-center justify-center bg-gradient-to-r from-cyan-500 to-cyan-500/60">
          <div className="text-center text-xl font-bold text-white">INTEGRATED CHATBOT</div>
        </div>
        <div className={classNames("flex w-full flex-col justify-end bg-white px-3.5", showInput ? "h-[425px]" : "h-full")}>
          <div className="h-[355px] overflow-y-scroll">
            <ChatBubble isBot={true} message="Hi, I’m a chatbot" />
            {children}
          </div>
          {showInput && (
            <form className="flex h-[60px] gap-x-3 pt-2" onSubmit={onSubmit}>
              <div className="flex-1">
                <textarea value={input} className="h-12 w-full resize-none rounded-full border border-[#d5d5d5] px-3.5 pt-2.5 focus:outline-cyan-500" placeholder="Start typing here..." onChange={(e) => setInput(e.target.value)} />
              </div>
              <button type="submit" disabled={sendDisabled} className="h-12 w-12 rounded-full bg-cyan-500 px-3.5 hover:bg-cyan-400 disabled:opacity-50">
                <Image className="h-full w-full" src="/images/send.svg" alt="send" width={999} height={999} />
              </button>
            </form>
          )}
        </div>
      </Popover.Panel>
    </Transition>
  );
};
