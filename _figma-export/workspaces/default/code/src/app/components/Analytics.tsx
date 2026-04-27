import { ArrowUpRight, MoveRight } from "lucide-react";
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

const metrics = [
  { name: "Total Revenue", value: "$142,847", change: "+24.5%" },
  { name: "Total Users", value: "3,362", change: "+18.2%" },
  { name: "Total Orders", value: "5,248", change: "+12.8%" },
  { name: "Avg. Conversion", value: "3.1%", change: "+0.4%" },
];

export function Analytics() {
  return (
    <div className="p-10 max-w-[1400px]">

      {/* Header */}
      <div className="mb-10">
        <p className="text-[11px] font-medium text-white/25 uppercase tracking-widest mb-2">Reports</p>
        <h1 className="text-[28px] font-semibold tracking-tight text-white leading-none">Analytics</h1>
        <p className="text-[13px] text-white/40 mt-2">Track performance across your entire business.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric) => (
          <div
            key={metric.name}
            className="p-6 bg-white/[0.025] border border-white/[0.06] rounded-xl hover:bg-white/[0.04] transition-all duration-200"
          >
            <p className="text-[11px] font-medium text-white/40 uppercase tracking-widest mb-4">{metric.name}</p>
            <p className="text-[36px] font-semibold tracking-tight text-white leading-none mb-3">{metric.value}</p>
            <div className="flex items-center gap-1 text-[12px] font-medium text-emerald-400">
              <ArrowUpRight className="w-3.5 h-3.5" />
              {metric.change}
              <span className="text-white/25 font-normal ml-0.5">vs last period</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">

        {/* Revenue Trend */}
        <div className="p-6 bg-white/[0.025] border border-white/[0.06] rounded-xl">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-[15px] font-semibold text-white">Revenue Trend</h3>
              <p className="text-[12px] text-white/35 mt-0.5">Jan — Jun 2026</p>
            </div>
            <button className="text-[12px] text-white/30 hover:text-white/60 transition-colors flex items-center gap-1">
              Export <MoveRight className="w-3 h-3" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData} margin={{ top: 4, right: 0, left: -24, bottom: 0 }}>
              <defs>
                <linearGradient id="analyticsRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffffff" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={true} vertical={false} />
              <XAxis dataKey="date" stroke="transparent" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.25)" }} axisLine={false} tickLine={false} />
              <YAxis stroke="transparent" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.25)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip {...tooltipStyle} />
              <Area type="monotone" dataKey="revenue" stroke="rgba(255,255,255,0.7)" strokeWidth={1.5} fillOpacity={1} fill="url(#analyticsRevenue)" dot={false} activeDot={{ r: 4, fill: "#fff", strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* User Growth */}
        <div className="p-6 bg-white/[0.025] border border-white/[0.06] rounded-xl">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-[15px] font-semibold text-white">User Growth</h3>
              <p className="text-[12px] text-white/35 mt-0.5">Monthly active users</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={revenueData} margin={{ top: 4, right: 0, left: -24, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={true} vertical={false} />
              <XAxis dataKey="date" stroke="transparent" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.25)" }} axisLine={false} tickLine={false} />
              <YAxis stroke="transparent" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.25)" }} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyle} />
              <Line type="monotone" dataKey="users" stroke="rgba(255,255,255,0.7)" strokeWidth={1.5} dot={false} activeDot={{ r: 4, fill: "#fff", strokeWidth: 0 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Conversion Rate */}
        <div className="p-6 bg-white/[0.025] border border-white/[0.06] rounded-xl">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-[15px] font-semibold text-white">Conversion Rate</h3>
              <p className="text-[12px] text-white/35 mt-0.5">Weekly breakdown</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={conversionData} margin={{ top: 4, right: 0, left: -24, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={true} vertical={false} />
              <XAxis dataKey="date" stroke="transparent" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.25)" }} axisLine={false} tickLine={false} />
              <YAxis stroke="transparent" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.25)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="rate" fill="rgba(255,255,255,0.1)" radius={[4, 4, 0, 0]} activeBar={{ fill: "rgba(255,255,255,0.22)" }} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="p-6 bg-white/[0.025] border border-white/[0.06] rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[15px] font-semibold text-white">Top Products</h3>
            <button className="text-[12px] text-white/30 hover:text-white/60 transition-colors flex items-center gap-1">
              View all <MoveRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-5">
            {topProducts.map((product, index) => (
              <div key={product.name}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-medium text-white/20 w-4 tabular-nums">{index + 1}</span>
                    <span className="text-[13px] font-medium text-white/65">{product.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[13px] font-semibold text-white/80">{product.revenue}</span>
                    <span className="text-[11px] text-white/25 ml-2">{product.sales} sales</span>
                  </div>
                </div>
                <div className="ml-7 h-[2px] bg-white/[0.05] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white/25 rounded-full transition-all duration-700"
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
