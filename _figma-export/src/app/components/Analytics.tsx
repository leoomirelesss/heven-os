import { TrendingUp, Users, ShoppingCart, DollarSign, ArrowUpRight, MoveRight } from "lucide-react";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const revenueData = [
  { date: "Jan", revenue: 12400, users: 245 },
  { date: "Feb", revenue: 18500, users: 389 },
  { date: "Mar", revenue: 22100, users: 512 },
  { date: "Apr", revenue: 28400, users: 648 },
  { date: "May", revenue: 31200, users: 721 },
  { date: "Jun", revenue: 35800, users: 847 },
];

const conversionData = [
  { date: "Wk 1", rate: 2.8 },
  { date: "Wk 2", rate: 3.1 },
  { date: "Wk 3", rate: 2.9 },
  { date: "Wk 4", rate: 3.4 },
];

const topProducts = [
  { name: "Silver Ring", sales: 342, revenue: "$30,438", pct: 85 },
  { name: "Gold Necklace", sales: 289, revenue: "$28,900", pct: 72 },
  { name: "Pearl Earrings", sales: 234, revenue: "$23,400", pct: 58 },
  { name: "Diamond Bracelet", sales: 198, revenue: "$19,800", pct: 49 },
];

const tooltipStyle = {
  contentStyle: {
    backgroundColor: "#111111",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px",
    fontSize: "12px",
    color: "white",
    padding: "10px 14px",
  },
  itemStyle: { color: "rgba(255,255,255,0.7)" },
  labelStyle: { color: "rgba(255,255,255,0.4)", marginBottom: "4px" },
  cursor: { stroke: "rgba(255,255,255,0.08)", strokeWidth: 1 },
};

export function Analytics() {
  return (
    <div className="p-8 overflow-auto max-w-[1400px]">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[11px] font-medium text-white/30 uppercase tracking-widest">Reports</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">Analytics</h1>
        <p className="text-[13px] text-white/40 mt-1">Track performance across your entire business.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { name: "Total Revenue", value: "$142,847", change: "+24.5%", icon: DollarSign },
          { name: "Total Users", value: "3,362", change: "+18.2%", icon: Users },
          { name: "Total Orders", value: "5,248", change: "+12.8%", icon: ShoppingCart },
          { name: "Avg. Conversion", value: "3.1%", change: "+0.4%", icon: TrendingUp },
        ].map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.name}
              className="p-5 bg-white/[0.03] border border-white/[0.07] rounded-xl hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-medium text-white/35 uppercase tracking-wide">{metric.name}</span>
                <div className="w-7 h-7 rounded-lg bg-white/[0.05] flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5 text-white/30" />
                </div>
              </div>
              <div className="text-[26px] font-semibold tracking-tight text-white mb-2">{metric.value}</div>
              <div className="flex items-center gap-1 text-[12px] font-medium text-emerald-400">
                <ArrowUpRight className="w-3.5 h-3.5" />
                {metric.change}
                <span className="text-white/25 font-normal ml-0.5">vs last period</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Revenue Trend */}
        <div className="p-5 bg-white/[0.03] border border-white/[0.07] rounded-xl">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="text-[15px] font-semibold text-white">Revenue Trend</h3>
              <p className="text-[12px] text-white/35 mt-0.5">Jan — Jun 2026</p>
            </div>
            <button className="text-[12px] text-white/35 hover:text-white/60 transition-colors flex items-center gap-1">
              Export <MoveRight className="w-3 h-3" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="analyticsRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffffff" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={true} vertical={false} />
              <XAxis dataKey="date" stroke="transparent" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.3)" }} axisLine={false} tickLine={false} />
              <YAxis stroke="transparent" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.3)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip {...tooltipStyle} />
              <Area type="monotone" dataKey="revenue" stroke="#ffffff" strokeWidth={1.5} fillOpacity={1} fill="url(#analyticsRevenue)" dot={false} activeDot={{ r: 4, fill: "#fff", strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* User Growth */}
        <div className="p-5 bg-white/[0.03] border border-white/[0.07] rounded-xl">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="text-[15px] font-semibold text-white">User Growth</h3>
              <p className="text-[12px] text-white/35 mt-0.5">Monthly active users</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={revenueData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={true} vertical={false} />
              <XAxis dataKey="date" stroke="transparent" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.3)" }} axisLine={false} tickLine={false} />
              <YAxis stroke="transparent" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.3)" }} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyle} />
              <Line type="monotone" dataKey="users" stroke="#ffffff" strokeWidth={1.5} dot={false} activeDot={{ r: 4, fill: "#fff", strokeWidth: 0 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Conversion Rate */}
        <div className="p-5 bg-white/[0.03] border border-white/[0.07] rounded-xl">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="text-[15px] font-semibold text-white">Conversion Rate</h3>
              <p className="text-[12px] text-white/35 mt-0.5">Weekly breakdown</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={conversionData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={true} vertical={false} />
              <XAxis dataKey="date" stroke="transparent" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.3)" }} axisLine={false} tickLine={false} />
              <YAxis stroke="transparent" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.3)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="rate" fill="rgba(255,255,255,0.12)" radius={[4, 4, 0, 0]} activeBar={{ fill: "rgba(255,255,255,0.25)" }} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="p-5 bg-white/[0.03] border border-white/[0.07] rounded-xl">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[15px] font-semibold text-white">Top Products</h3>
            <button className="text-[12px] text-white/35 hover:text-white/60 transition-colors flex items-center gap-1">
              View all <MoveRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={product.name} className="group">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[11px] font-medium text-white/25 w-4 tabular-nums">{index + 1}</span>
                    <span className="text-[13px] font-medium text-white/70 group-hover:text-white/90 transition-colors">{product.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[13px] font-semibold text-white/80">{product.revenue}</span>
                    <span className="text-[11px] text-white/30 ml-2">{product.sales} sales</span>
                  </div>
                </div>
                <div className="ml-6 h-[2px] bg-white/[0.05] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white/30 rounded-full transition-all duration-500"
                    style={{ width: `${product.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}