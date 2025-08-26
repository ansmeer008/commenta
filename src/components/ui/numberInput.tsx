import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

type NumberInputProps = {
  value?: number | null; // controlled 모드
  defaultValue?: number | null; // uncontrolled 초기값
  onChange?: (val: number | null) => void;
  min?: number;
  max?: number;
  step?: number; //단위
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  name?: string;
};

export function NumberInput({
  value,
  defaultValue = null,
  onChange,
  min,
  max,
  step = 1,
  disabled,
  className = "",
  inputClassName = "",
  placeholder,
  name,
}: NumberInputProps) {
  const isControlled = value !== undefined;
  const [inner, setInner] = useState<string>(() =>
    (defaultValue ?? defaultValue === 0) ? String(defaultValue) : ""
  );

  const display = isControlled ? ((value ?? value === 0) ? String(value) : "") : inner;

  const parseAndClamp = (raw: string): number | null => {
    if (raw.trim() === "") return null;
    const n = Number(raw);
    if (Number.isNaN(n)) return null;
    let c = n;
    if (typeof min === "number") c = Math.max(c, min);
    if (typeof max === "number") c = Math.min(c, max);
    return c;
  };

  const commit = (raw: string) => {
    const next = parseAndClamp(raw);
    if (!isControlled) setInner(next === null ? "" : String(next));
    onChange?.(next);
  };

  const increment = () => {
    const base = parseAndClamp(display) ?? 0;
    const next = typeof max === "number" ? Math.min(base + step, max) : base + step;
    if (!isControlled) setInner(String(next));
    onChange?.(next);
  };

  const decrement = () => {
    const base = parseAndClamp(display) ?? 0;
    const next = typeof min === "number" ? Math.max(base - step, min) : base - step;
    if (!isControlled) setInner(String(next));
    onChange?.(next);
  };

  return (
    <div
      className={[
        "relative inline-flex h-10 w-40 items-stretch rounded-md border border-gray-300 bg-white shadow-sm",
        disabled ? "opacity-50" : "hover:border-gray-400",
        className,
      ].join(" ")}
    >
      <input
        type="text"
        inputMode="numeric"
        name={name}
        value={display}
        placeholder={placeholder}
        disabled={disabled}
        onChange={e => {
          if (!isControlled) setInner(e.target.value);
          onChange?.(parseAndClamp(e.target.value));
        }}
        onBlur={e => {
          commit(e.target.value);
        }}
        className={[
          "peer w-full rounded-md pl-3 pr-10 text-sm outline-none",
          "focus:ring-2 focus:ring-gray-200",
          "placeholder:text-gray-300",
          "disabled:cursor-not-allowed",
          inputClassName,
        ].join(" ")}
      />

      {/* 우측 버튼 */}
      <div className="absolute right-0 top-0 grid h-full w-10 grid-rows-2 overflow-hidden rounded-r-md">
        <button
          type="button"
          aria-label="증가"
          disabled={disabled}
          onClick={increment}
          className="flex items-center justify-center border-l border-b border-gray-300 text-xs hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronUp size="md" />
        </button>
        <button
          type="button"
          aria-label="감소"
          disabled={disabled}
          onClick={decrement}
          className="flex items-center justify-center border-l border-gray-300 text-xs hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronDown size="md" />
        </button>
      </div>
    </div>
  );
}
