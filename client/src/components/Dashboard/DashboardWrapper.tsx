"use client";

import React, {useEffect} from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import StoreProvider, {useAppSelector} from "@/redux/redux";

interface DashbaordWrapperProps {
  children: React.ReactNode;
}

const DashbaordLayout: React.FunctionComponent<DashbaordWrapperProps> = ({
  children,
}) => {
  const isSideBarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  });
  return (
    <div
      className={`${
        !isDarkMode ? "light" : "dark"
      } flex bg-gray-50 text-gray-900 w-full min-h-screen`}
    >
      <Sidebar />
      <main
        className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 ${
          isSideBarCollapsed ? "md:pl-24" : "md:pl-72"
        }`}
      >
        <Navbar />

        {children}
      </main>
    </div>
  );
};

const DashbaordWrapper: React.FunctionComponent<DashbaordWrapperProps> = ({
  children,
}) => {
  return (
    <StoreProvider>
      <DashbaordLayout>{children}</DashbaordLayout>{" "}
    </StoreProvider>
  );
};

export default DashbaordWrapper;
