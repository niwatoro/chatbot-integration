import { Popover } from "@headlessui/react";
import Image from "next/image";
import { FC } from "react";
import { classNames } from "../utils/class-names";

type Props = {
  isOpen: boolean;
};
export const PopoverButton: FC<Props> = ({ isOpen }) => {
  return <Popover.Button className={classNames("h-14 w-14 rounded-full drop-shadow-md", isOpen ? "bg-cyan-800" : "bg-cyan-500 hover:bg-cyan-400 p-3")}>{isOpen ? <Image className="w-full h-full p-2" src="/images/close.svg" alt="phone" width={999} height={999} /> : <Image className="w-full h-full" src="/images/open.svg" alt="phone" width={999} height={999} />}</Popover.Button>;
};
