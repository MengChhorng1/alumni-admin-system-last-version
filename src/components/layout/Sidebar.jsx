import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  GraduationCap,
  Briefcase,
  Calendar,
  HeartHandshake,
  Shield,
  Settings,
  FileText,
  Bell,
  ChevronDown,
  X,
  Database,
} from "lucide-react";
import { resources } from "../../constants/resources";
import { cn } from "../../utils/cn";

const getResource = (name) =>
  resources.find((resource) => resource.name === name);

const sidebarGroups = [
  {
    title: "Users",
    icon: Users,
    items: [
      "User",
      "Alumnus",
      "Alumni Office",
      "Connections",
      "Social Medias",
      "Alumnus Skills",
      "User Roles",
      "User Notifications",
    ],
  },
  {
    title: "Groups",
    icon: Shield,
    items: [
      "Community Group",
      "Group Members",
      "Group Role",
      "Group Role Permissions",
      "Report Groups",
    ],
  },
  {
    title: "Events",
    icon: Calendar,
    items: ["Event Announcement", "Event Participants", "Event Category"],
  },
  {
    title: "Jobs",
    icon: Briefcase,
    items: ["Job Announcement", "Job Skills", "Skill"],
  },
  {
    title: "Donations",
    icon: HeartHandshake,
    items: [
      "Donation Campaign",
      "Campaign Category",
      "Donations",
      "Payment Transactions Logs",
      "TransactionQrHash",
      "BankAccountInfo",
    ],
  },
  {
    title: "Academic",
    icon: GraduationCap,
    items: ["Department", "Majors", "Batch", "Department Batches"],
  },
  {
    title: "Posts",
    icon: FileText,
    items: [
      "Posts",
      "Comments",
      "Post Reactions",
      "Comment Reactions",
      "Group Post",
      "Mark Posts",
      "Medias",
      "Report Posts",
    ],
  },
  {
    title: "Admin Access",
    icon: Building2,
    items: [
      "Permission",
      "Role",
      "Role Permissions",
      "Report Users",
      "Notifications",
      "Process Domain Events",
    ],
  },
];

function GroupLink({ resource, onClick }) {
  if (!resource) return null;

  return (
    <NavLink
      to={`/app/resources/${resource.slug}`}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "group relative block truncate rounded-xl py-2 pl-8 pr-3 text-sm font-medium transition",
          isActive
            ? "bg-brand text-white shadow-lg shadow-brand/20"
            : "text-slate-500 hover:bg-brand/10 hover:text-brand dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white",
        )
      }
    >
      <span className="absolute left-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-current opacity-60" />
      {resource.name}
    </NavLink>
  );
}

function SidebarGroup({ group, isOpen, onToggle, closeSidebar }) {
  const location = useLocation();
  const items = group.items.map(getResource).filter(Boolean);
  const isGroupActive = items.some((resource) =>
    location.pathname.includes(`/app/resources/${resource.slug}`),
  );
  const Icon = group.icon;

  return (
    <div className="group/sidebar">
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "flex w-full cursor-pointer items-center justify-between rounded-2xl px-3 py-3 text-left text-sm font-semibold transition",
          isGroupActive
            ? "bg-brand/10 text-brand dark:bg-white/5 dark:text-white"
            : "text-slate-700 hover:bg-slate-100 hover:text-brand dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white",
        )}
      >
        <span className="flex items-center gap-3">
          <Icon
            className={cn(
              "h-5 w-5",
              isGroupActive
                ? "text-brand"
                : "text-slate-500 dark:text-slate-300",
            )}
          />
          {group.title}
        </span>
        <ChevronDown
          className={cn("h-4 w-4 transition", isOpen && "rotate-180")}
        />
      </button>

      {isOpen && (
        <div className="ml-6 mt-1 space-y-1 border-l border-slate-200 pb-2 pl-3 dark:border-white/10">
          {items.map((resource) => (
            <GroupLink
              key={resource.slug}
              resource={resource}
              onClick={closeSidebar}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ open, setOpen }) {
  const location = useLocation();
  const closeSidebar = () => setOpen(false);

  const activeGroupTitle = useMemo(() => {
    return sidebarGroups.find((group) => {
      const items = group.items.map(getResource).filter(Boolean);
      return items.some((resource) =>
        location.pathname.includes(`/app/resources/${resource.slug}`),
      );
    })?.title;
  }, [location.pathname]);

  const [openGroups, setOpenGroups] = useState(() =>
    activeGroupTitle ? new Set([activeGroupTitle]) : new Set(),
  );

  useEffect(() => {
    if (!activeGroupTitle) return;

    setOpenGroups((current) => {
      const next = new Set(current);
      next.add(activeGroupTitle);
      return next;
    });
  }, [activeGroupTitle]);

  const toggleGroup = (title) => {
    setOpenGroups((current) => {
      const next = new Set(current);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  };

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex h-screen w-80 flex-col overflow-hidden border-r border-slate-200 bg-white text-slate-900 shadow-2xl transition dark:border-white/10 dark:bg-[#050816] dark:text-white lg:static lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand text-lg font-black text-white shadow-lg shadow-brand/30">
            A
          </div>
          <div>
            <h1 className="text-lg font-extrabold leading-tight text-slate-900 dark:text-white">
              Alumni Admin
            </h1>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Enterprise Console
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={closeSidebar}
          className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-brand dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white lg:hidden"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-5 sidebar-scroll">
        <NavLink
          to="/app/dashboard"
          onClick={closeSidebar}
          className={({ isActive }) =>
            cn(
              "mb-3 flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition",
              isActive
                ? "bg-brand text-white shadow-lg shadow-brand/25"
                : "text-slate-700 hover:bg-slate-100 hover:text-brand dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white",
            )
          }
        >
          <LayoutDashboard className="h-5 w-5" />
          Dashboard
        </NavLink>

        {sidebarGroups.map((group) => (
          <SidebarGroup
            key={group.title}
            group={group}
            isOpen={openGroups.has(group.title)}
            onToggle={() => toggleGroup(group.title)}
            closeSidebar={closeSidebar}
          />
        ))}
      </nav>

      <div className="border-t border-slate-200 p-4 dark:border-white/10">
        <NavLink
          to="/app/resources/notifications"
          onClick={closeSidebar}
          className="mb-2 flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-brand dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
        >
          <Bell className="h-5 w-5 text-brand" />
          Notifications
        </NavLink>
        <NavLink
          to="/app/settings"
          onClick={closeSidebar}
          className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-brand dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
        >
          <Settings className="h-5 w-5 text-brand" />
          Settings
        </NavLink>
        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
          <div className="mb-1 flex items-center gap-2 font-bold uppercase tracking-widest text-brand">
            <Database className="h-4 w-4" />
            All fields kept
          </div>
          Every original table and column is still available in the resource
          pages.
        </div>
      </div>
    </aside>
  );
}
