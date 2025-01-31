"use client";

import { Sidebar } from "@/_pages/account/sidebar";
import { AccountData } from "@/_pages/account/account-data/shared";

export const Account = () => {
  return (
    <div
      className={`grid grid-cols-5 gap-5 max-sm:w-[95%] mt-10 sm:w-[85%] mx-auto`}
    >
      <Sidebar />
      <AccountData />
    </div>
  );
};
