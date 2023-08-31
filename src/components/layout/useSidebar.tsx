import { useState } from "react";

const useSidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  return {isSidebarOpen, openSidebar, closeSidebar};
}

export default useSidebar;