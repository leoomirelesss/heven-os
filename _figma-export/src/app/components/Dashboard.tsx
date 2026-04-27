import { ArrowUpRight, ArrowDownRight, MoveRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const revenueData = [
  { date: "Jan", revenue: 12400 },
  { date: "Feb", revenue: 18500 },
  { date: "Mar", revenue: 22100 },
  { date: "Apr", revenue: 28400 },
  { date: "May", revenue: 31200 },
  { date: "Jun", revenue: 35800 },
];

const statsCards = [
  { name: "Revenue", value: "$35,847", change: "+12.5%", trend: "up", sub: "vs last month" },
  { name: "Orders", value: "1,248", change: "+8.2%", trend: "up", sub: "vs last month" },
  { name: "Customers", value: "847", change: "+18.7%", trend: "up", sub: "vs last month" },
  { name: "Conversion", value: "3.24%", change: "-2.1%", trend: "down", sub: "vs last month" },
];

const orders = [
  { id: "#8472", customer: "Sarah Johnson", initials: "SJ", amount: "$124.00", status: "Completed" },
  { id: "#8471", customer: "Michael Chen", initials: "MC", amount: "$89.50", status: "Processing" },
  { id: "#8470", customer: "Emma Davis", initials: "ED", amount: "$256.00", status: "Completed" },
  { id: "#8469", customer: "James Wilson", initials: "JW", amount: "$45.99", status: "Shipped" },
  { id: "#8468", customer: "Lisa Anderson", initials: "LA", amount: "$178.00", status: "Completed" },
];

const statusStyles: Record<string, string> = {
  Completed: "text-emerald-400 bg-emerald-400/[0.08]",
  Processing: "text-amber-400 bg-amber-400/[0.08]",
  Shipped: "text-sky-400 bg-sky-400/[0.08]",
};

const tooltipStyle = {
  contentStyle: {
    backgroundColor: "#0f0f0f",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "10px",
    fontSize: "12px",
    color: "white",
    padding: "10px 14px",
  },
  itemStyle: { color: "rgba(255,255,255,0.6)" },
  labelStyle: { color: "rgba(255,255,255,0.35)", marginBottom: "4px" },
  cursor: { stroke: "rgba(255,255,255,0.08)", strokeWidth: 1 },
};

export function Dashboard() {
  return (
    <div className="p-10 max-w-[1400px]">

      {/* Header */}
      <div className="flex items-start justify-between mb-10">
        <div>
          <p className="text-[11px] font-medium text-white/25 uppercase tracking-widest mb-2">Overview</p>
          <h1 className="text-[28px] font-semibold tracking-tight text-white leading-none">Dashboard</h1>
          <p className="text-[13px] text-white/40 mt-2">Welcome back — here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[13px] text-white/40 hover:text-white/60 transition-colors cursor-pointer">
          <span>June 2026</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsCards.map((card) => (
          <div
            key={card.name}
            className="p-6 bg-white/[0.025] border border-white/[0.06] rounded-xl hover:bg-white/[0.04] transition-all duration-200"
          >
            <p className="text-[11px] font-medium text-white/40 uppercase tracking-widest mb-4">{card.name}</p>
            <p className="text-[36px] font-semibold tracking-tight text-white leading-none mb-3">{card.value}</p>
            <div className="flex items-center gap-1.5">
              <span className={`flex items-center gap-0.5 text-[12px] font-medium ${card.trend === "up" ? "text-emerald-400" : "text-red-400"}`}>
                {card.trend === "up" ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {card.change}
              </span>
              <span className="text-[12px] text-white/25">{card.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

        {/* Revenue Chart */}
        <div className="lg:col-span-3 p-6 bg-white/[0.025] border border-white/[0.06] rounded-xl">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-[15px] font-semibold text-white">Revenue Overview</h3>
              <p className="text-[12px] text-white/35 mt-0.5">Monthly revenue for 2026</p>
            </div>
            <button className="flex items-center gap-1.5 text-[12px] text-white/30 hover:text-white/60 transition-colors">
              View report
              <MoveRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={revenueData} margin={{ top: 4, right: 0, left: -24, bottom: 0 }}>
              <defs>
                <linearGradient id="dashboardRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffffff" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={true} vertical={false} />
              <XAxis dataKey="date" stroke="transparent" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.25)" }} axisLine={false} tickLine={false} />
              <YAxis stroke="transparent" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.25)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip {...tooltipStyle} />
              <Area type="monotone" dataKey="revenue" stroke="rgba(255,255,255,0.6)" strokeWidth={1.5} fillOpacity={1} fill="url(#dashboardRevenue)" dot={false} activeDot={{ r: 4, fill: "#fff", strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Orders */}
        <div className="lg:col-span-2 p-6 bg-white/[0.025] border border-white/[0.06] rounded-xl flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[15px] font-semibold text-white">Recent Orders</h3>
            <button className="text-[12px] text-white/30 hover:text-white/60 transition-colors flex items-center gap-1">
              See all <MoveRight className="w-3 h-3" />
            </button>
          </div>
          <div className="flex-1 space-y-0.5">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-white/[0.04] transition-all duration-150 cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.07] flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-semibold text-white/40">{order.initials}</span>
                  </div>
                  <div>
                    <div className="text-[13px] font-medium text-white/70 group-hover:text-white transition-colors leading-tight">{order.customer}</div>
                    <div className="text-[11px] text-white/25 leading-tight">{order.id}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[13px] font-semibold text-white/80">{order.amount}</div>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${statusStyles[order.status]}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
