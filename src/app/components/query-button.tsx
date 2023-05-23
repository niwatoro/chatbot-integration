import { FC } from "react";
import { Query } from "../types/query";
import { classNames } from "../utils/class-names";

type Props = {
  query: Query;
  onClick?: () => void;
  selected: string | null;
};
export const QueryButton: FC<Props> = ({ query, onClick, selected }) => {
  return (
    <div className="w-full">
      <button disabled={selected !== null} className={classNames("my-0.5 rounded-full px-3.5 py-2.5 text-sm", selected === null ? "border border-cyan-500 bg-cyan-500 text-white drop-shadow-md" : classNames("border border-cyan-800", selected === query.value ? "bg-cyan-800 text-white" : "bg-white text-cyan-800"))} onClick={onClick}>
        {query.label}
      </button>
    </div>
  );
};
