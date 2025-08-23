import React from "react";

/**
 * route modal's hard navigation page wrapper (modal like UI wrapper)
 */
export function StandaloneWrapper({ children }: { children: React.ReactNode }) {
  return <div className="bg-white shadow-2xl rounded-md !w-[90%] max-w-lg p-6">{children}</div>;
}
