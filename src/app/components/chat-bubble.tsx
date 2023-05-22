import { FC } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Chat } from "../types/chat";
import { classNames } from "../utils/class-names";

type Props = {
  loading?: boolean;
} & Chat;
export const ChatBubble: FC<Props> = ({ isBot, message, loading }) => {
  return (
    <div className={classNames("w-full", !isBot && "flex justify-end")}>
      <div className={classNames("p-3.5 rounded-xl tracking-tight w-fit max-w-[260px] break-all", isBot ? "bg-[#ececec] rounded-bl-none" : "bg-cyan-100 rounded-br-none")}>
        {loading ? (
          <div className="p-2 w-20 flex justify-center">
            <ThreeDots color="black" height={40} width={40} />
          </div>
        ) : (
          message
        )}
      </div>
    </div>
  );
};
