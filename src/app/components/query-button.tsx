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
      <button disabled={selected !== null} className={classNames("rounded-full py-2.5 px-3.5 text-sm", selected === null ? "bg-[#e2582d] border border-[#e2582d] text-white drop-shadow-md" : classNames("border border-[#b2330b]", selected === query.value ? "bg-[#b2330b] text-white" : "bg-white text-[#b2330b]"))} onClick={onClick}>
        {query.label}
      </button>
    </div>
  );
};
