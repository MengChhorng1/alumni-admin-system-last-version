import { Bell, LogOut, Menu, Moon, Search, Sun } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
export default function Header({ onMenu }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="sticky top-0 z-30 border-b border-white/20 bg-white/70 px-4 py-3 backdrop-blur-2xl dark:bg-slate-950/75">
      <div className="flex items-center gap-3">
        <button onClick={onMenu} className="btn-secondary p-2 lg:hidden">
          <Menu className="h-5 w-5" />
        </button>
        <div className="relative hidden flex-1 md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            className="input input-with-icon"
            placeholder="Global search users, events, jobs, donations..."
          />
        </div>
        <button onClick={toggleTheme} className="btn-secondary p-2">
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>
        <button className="btn-secondary relative p-2">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-500" />
        </button>
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold">{user?.name || "Admin"}</p>
          <p className="text-xs text-slate-500">
            {user?.role || "super_admin"}
          </p>
        </div>
        <button onClick={logout} className="btn-secondary p-2">
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
