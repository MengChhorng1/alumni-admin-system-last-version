import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-admin-gradient">
      <div className="flex h-full">
        <Sidebar open={open} setOpen={setOpen} />
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <Header onMenu={() => setOpen(true)} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>

      {open && (
        <button
          aria-label="Close sidebar"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
        />
      )}
    </div>
  );
}
