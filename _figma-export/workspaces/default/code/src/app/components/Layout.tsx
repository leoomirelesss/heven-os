import { Outlet, Link, useLocation } from "react-router";
import { LayoutDashboard, Store, Users, MessageSquare, Workflow, BarChart3, Settings, CalendarDays, Package, ChevronDown } from "lucide-react";

export function Layout() {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/app", icon: LayoutDashboard },
    { name: "Store", href: "/app/store", icon: Store },
    { name: "Customers", href: "/app/customers", icon: Users },
    { name: "Inbox", href: "/app/inbox", icon: MessageSquare },
    { name: "Bookings", href: "/app/bookings", icon: CalendarDays },
    { name: "Shipping", href: "/app/shipping", icon: Package },
    { name: "Automations", href: "/app/automations", icon: Workflow },
    { name: "Analytics", href: "/app/analytics", icon: BarChart3 },
    { name: "Settings", href: "/app/settings", icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === "/app") return location.pathname === "/app";
    return location.pathname.startsWith(href);
  };

  return (
    <div className="flex h-screen bg-[#080808] text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[228px] flex-shrink-0 border-r border-white/[0.06] flex flex-col">

        {/* Logo */}
        <div className="flex h-16 items-center px-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shadow-lg shadow-white/10">
              <span className="text-black font-bold text-xs tracking-tight">H</span>
            </div>
            <span className="text-[15px] font-semibold tracking-tight text-white">Hevən OS</span>
          </div>
        </div>

        {/* Workspace */}
        <div className="px-4 py-3 border-b border-white/[0.06]">
          <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/[0.04] transition-colors group">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-400/40 to-violet-600/30 flex-shrink-0" />
            <span className="text-[13px] font-medium text-white/60 flex-1 text-left truncate group-hover:text-white/80 transition-colors">Jewelry Store MX</span>
            <ChevronDown className="w-3.5 h-3.5 text-white/25 flex-shrink-0" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-150 ${
                  active
                    ? "bg-white text-black"
                    : "text-white/40 hover:text-white/70 hover:bg-white/[0.05]"
                }`}
              >
                <Icon className={`w-[15px] h-[15px] flex-shrink-0 ${active ? "text-black" : ""}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="border-t border-white/[0.06] p-4">
          <button className="w-full flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-white/[0.04] transition-colors">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-white/20 to-white/[0.07] border border-white/[0.1] flex items-center justify-center flex-shrink-0">
              <span className="text-[11px] font-semibold text-white/70">JD</span>
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="text-[13px] font-medium text-white/80 leading-tight">John Doe</div>
              <div className="text-[11px] text-white/30 leading-tight truncate">john@heven.com</div>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-[#080808]">
        <Outlet />
      </main>
    </div>
  );
}
