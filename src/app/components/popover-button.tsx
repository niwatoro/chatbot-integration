import { Popover } from "@headlessui/react";
import Image from "next/image";
import { FC } from "react";
import { classNames } from "../utils/class-names";

type Props = {
  isOpen: boolean;
};
export const PopoverButton: FC<Props> = ({ isOpen }) => {
  return <Popover.Button className={classNames("h-14 w-14 rounded-full p-2 drop-shadow-md", isOpen ? "bg-[#b2330b]" : "bg-[#e2582d] hover:bg-[#FF7448]")}>{isOpen ? <Image className="w-full h-full p-2" src="/images/close.svg" alt="phone" width={999} height={999} /> : <Image className="w-full h-full" src="/images/open.svg" alt="phone" width={999} height={999} />}</Popover.Button>;
};
