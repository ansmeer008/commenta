"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Image = ({
  url,
  className,
  removeHandler,
}: {
  url: string;
  className?: string;
  removeHandler?: () => void;
}) => {
  return (
    <div
      className={cn(
        "relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200",
        className
      )}
    >
      <img src={url} alt={`uploaded-${url}`} className="w-full h-full object-cover" />
      {removeHandler && (
        <button
          type="button"
          onClick={removeHandler}
          className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md"
        >
          <X className="w-3 h-3 text-gray-700" />
        </button>
      )}
    </div>
  );
};
