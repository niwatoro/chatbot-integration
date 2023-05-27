import { Chat } from "@/app/types/chat";
import { classNames } from "@/app/utils/class-names";
import { FC } from "react";
import { ThreeDots } from "react-loader-spinner";

type Props = {
  loading?: boolean;
} & Chat;
export const ChatBubble: FC<Props> = ({ isBot, message, loading }) => {
  return (
    <div className={classNames("my-2 w-full", !isBot && "flex justify-end")}>
      <div className={classNames("w-fit max-w-[260px] break-words rounded-xl p-3.5 tracking-tight", isBot ? "rounded-bl-none bg-[#ececec]" : "rounded-br-none bg-cyan-100")}>
        {loading ? (
          <div className="flex w-20 justify-center p-2">
            <ThreeDots color="black" height={40} width={40} />
          </div>
        ) : (
          message
        )}
      </div>
    </div>
  );
};
