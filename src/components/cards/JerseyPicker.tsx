import { useRef } from "react";
import { useMatch } from "../../../hooks/useMatch";

interface JerseyPickerProps {
  value: string;
  onChange: (val: string) => void;
}

export function JerseyPicker({ value, onChange }: JerseyPickerProps) {
  const { match } = useMatch();
  const scrollRef = useRef<HTMLDivElement>(null);

  const numbers = Array.from({ length: 100 }, (_, i) => i);

  return (
    <div className="flex flex-col items-center sm:items-end gap-2">
      <div className="flex items-center gap-4">
        <span className="font-mono text-sm font-bold uppercase text-slate-500">
          Jersey #
        </span>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-sm font-mono text-red-500 underline font-bold uppercase hover:text-red-700"
          >
            Clear
          </button>
        )}
      </div>

      <div
        ref={scrollRef}
        className="w-48 sm:w-56 h-10 border-2 border-black bg-white flex items-center overflow-x-auto snap-x snap-mandatory scrollbar-none px-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {numbers.map((num) => {
          const strNum = String(num);
          const isSelected = value === strNum;

          return (
            <button
              key={num}
              type="button"
              disabled={match?.status !== "running"}
              onClick={() => onChange(strNum)}
              className={`shrink-0 w-8 h-7 snap-center flex items-center justify-center font-mono text-xs font-bold transition-all border ${
                isSelected
                  ? "bg-black text-white border-black scale-105"
                  : "text-slate-700 border-transparent hover:bg-slate-100"
              }`}
            >
              {num}
            </button>
          );
        })}
      </div>
    </div>
  );
}
