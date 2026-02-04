"use client";

import type { ReactNode } from "react";

function Tab({ children }: { children: ReactNode }) {
  return <div className="tab-content-panel">{children}</div>;
}

export default Tab;
