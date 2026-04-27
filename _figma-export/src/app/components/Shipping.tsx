import { useState } from "react";
import { Search, Package, Truck, CheckCircle2, Clock, AlertCircle, X, ExternalLink, Filter, MoveRight } from "lucide-react";

const shipments = [
  {
    id: "SHP-0041",
    order: "#8472",
    customer: "Sarah Johnson",
    initials: "SJ",
    destination: "New York, NY 10001",
    carrier: "FedEx",
    tracking: "FX123456789US",
    status: "Delivered",
    weight: "0.3 kg",
    shippedDate: "Mar 18, 2026",
    deliveredDate: "Mar 20, 2026",
    eta: null,
    steps: [
      { label: "Order Placed", date: "Mar 16", done: true },
      { label: "Processing", date: "Mar 17", done: true },
      { label: "Shipped", date: "Mar 18", done: true },
      { label: "In Transit", date: "Mar 19", done: true },
      { label: "Delivered", date: "Mar 20", done: true },
    ],
  },
  {
    id: "SHP-0040",
    order: "#8471",
    customer: "Michael Chen",
    initials: "MC",
    destination: "San Francisco, CA 94105",
    carrier: "UPS",
    tracking: "1Z999AA10123456784",
    status: "In Transit",
    weight: "0.2 kg",
    shippedDate: "Mar 23, 2026",
    deliveredDate: null,
    eta: "Mar 28, 2026",
    steps: [
      { label: "Order Placed", date: "Mar 21", done: true },
      { label: "Processing", date: "Mar 22", done: true },
      { label: "Shipped", date: "Mar 23", done: true },
      { label: "In Transit", date: "Mar 25", done: true },
      { label: "Delivered", date: "~Mar 28", done: false },
    ],
  },
  {
    id: "SHP-0039",
    order: "#8470",
    customer: "Emma Davis",
    initials: "ED",
    destination: "London, EC1A 1BB, UK",
    carrier: "DHL",
    tracking: "1234567890",
    status: "In Transit",
    weight: "0.5 kg",
    shippedDate: "Mar 22, 2026",
    deliveredDate: null,
    eta: "Mar 30, 2026",
    steps: [
      { label: "Order Placed", date: "Mar 20", done: true },
      { label: "Processing", date: "Mar 21", done: true },
      { label: "Shipped", date: "Mar 22", done: true },
      { label: "In Transit", date: "Mar 24", done: true },
      { label: "Delivered", date: "~Mar 30", done: false },
    ],
  },
  {
    id: "SHP-0038",
    order: "#8469",
    customer: "James Wilson",
    initials: "JW",
    destination: "Toronto, ON M5V 2A5, CA",
    carrier: "Canada Post",
    tracking: "CX123456789CA",
    status: "Processing",
    weight: "0.1 kg",
    shippedDate: null,
    deliveredDate: null,
    eta: "Apr 2, 2026",
    steps: [
      { label: "Order Placed", date: "Mar 25", done: true },
      { label: "Processing", date: "Mar 26", done: true },
      { label: "Shipped", date: "~Mar 28", done: false },
      { label: "In Transit", date: "—", done: false },
      { label: "Delivered", date: "~Apr 2", done: false },
    ],
  },
  {
    id: "SHP-0037",
    order: "#8468",
    customer: "Lisa Anderson",
    initials: "LA",
    destination: "Sydney, NSW 2000, AU",
    carrier: "Australia Post",
    tracking: "EX987654321AU",
    status: "Delivered",
    weight: "0.4 kg",
    shippedDate: "Mar 14, 2026",
    deliveredDate: "Mar 18, 2026",
    eta: null,
    steps: [
      { label: "Order Placed", date: "Mar 12", done: true },
      { label: "Processing", date: "Mar 13", done: true },
      { label: "Shipped", date: "Mar 14", done: true },
      { label: "In Transit", date: "Mar 16", done: true },
      { label: "Delivered", date: "Mar 18", done: true },
    ],
  },
  {
    id: "SHP-0036",
    order: "#8467",
    customer: "Noah Williams",
    initials: "NW",
    destination: "Chicago, IL 60601",
    carrier: "USPS",
    tracking: "9400111899223450982315",
    status: "Failed",
    weight: "0.2 kg",
    shippedDate: "Mar 19, 2026",
    deliveredDate: null,
    eta: null,
    steps: [
      { label: "Order Placed", date: "Mar 17", done: true },
      { label: "Processing", date: "Mar 18", done: true },
      { label: "Shipped", date: "Mar 19", done: true },
      { label: "In Transit", date: "Mar 21", done: true },
      { label: "Delivered", date: "Failed", done: false },
    ],
  },
];

type Status = "Delivered" | "In Transit" | "Processing" | "Failed";

const statusConfig: Record<Status, { label: string; badge: string; dot: string; icon: typeof CheckCircle2 }> = {
  Delivered: { label: "Delivered", badge: "bg-emerald-400/10 text-emerald-400", dot: "bg-emerald-400", icon: CheckCircle2 },
  "In Transit": { label: "In Transit", badge: "bg-sky-400/10 text-sky-400", dot: "bg-sky-400", icon: Truck },
  Processing: { label: "Processing", badge: "bg-amber-400/10 text-amber-400", dot: "bg-amber-400", icon: Clock },
  Failed: { label: "Failed", badge: "bg-red-400/10 text-red-400", dot: "bg-red-400", icon: AlertCircle },
};

const carrierColors: Record<string, string> = {
  FedEx: "text-[#FF6600]",
  UPS: "text-[#FFB500]",
  DHL: "text-[#FFCC00]",
  USPS: "text-sky-400",
  "Canada Post": "text-red-400",
  "Australia Post": "text-amber-400",
};

export function Shipping() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>("SHP-0040");

  const filtered = shipments.filter(
    (s) =>
      s.customer.toLowerCase().includes(search.toLowerCase()) ||
      s.order.includes(search) ||
      s.tracking.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase())
  );

  const selected = shipments.find((s) => s.id === selectedId);

  const stats: { label: string; value: number; status?: Status }[] = [
    { label: "Total Shipments", value: shipments.length },
    { label: "Delivered", value: shipments.filter((s) => s.status === "Delivered").length, status: "Delivered" },
    { label: "In Transit", value: shipments.filter((s) => s.status === "In Transit").length, status: "In Transit" },
    { label: "Processing", value: shipments.filter((s) => s.status === "Processing").length, status: "Processing" },
  ];

  return (
    <div className="flex h-full">
      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-8 pb-0">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-medium text-white/30 uppercase tracking-widest">Logistics</span>
              </div>
              <h1 className="text-2xl font-semibold tracking-tight text-white">Shipping</h1>
              <p className="text-[13px] text-white/40 mt-1">Track and manage all your shipments.</p>
            </div>
            <button className="flex items-center gap-2 px-3.5 py-2 bg-white text-black rounded-lg text-[13px] font-semibold hover:bg-white/90 transition-all shadow-lg shadow-white/10">
              <Package className="w-3.5 h-3.5" />
              Create Shipment
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {stats.map((stat) => {
              const cfg = stat.status ? statusConfig[stat.status] : null;
              return (
                <div
                  key={stat.label}
                  className="p-5 bg-white/[0.03] border border-white/[0.07] rounded-xl"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-medium text-white/35 uppercase tracking-wide">{stat.label}</span>
                    {cfg && <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />}
                  </div>
                  <div className="text-[26px] font-semibold tracking-tight text-white">{stat.value}</div>
                </div>
              );
            })}
          </div>

          {/* Search & filter */}
          <div className="flex gap-2.5 mb-0">
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
              <input
                type="text"
                placeholder="Search by order, tracking, or customer..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-[13px] focus:outline-none focus:border-white/20 transition-all placeholder:text-white/25"
              />
            </div>
            <button className="flex items-center gap-2 px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-[13px] text-white/50 hover:bg-white/[0.06] hover:text-white/70 transition-all">
              <Filter className="w-3.5 h-3.5" />
              Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto px-8 pb-8 mt-4">
          <div className="bg-white/[0.02] border border-white/[0.07] rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.07]">
                  {["Shipment", "Customer", "Carrier", "Status", "ETA / Delivered", ""].map((col) => (
                    <th key={col} className="text-left px-5 py-3.5 text-[11px] font-semibold text-white/30 uppercase tracking-wide whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((shipment, i) => {
                  const status = shipment.status as Status;
                  const cfg = statusConfig[status];
                  const StatusIcon = cfg.icon;
                  const isSelected = selectedId === shipment.id;
                  return (
                    <tr
                      key={shipment.id}
                      onClick={() => setSelectedId(isSelected ? null : shipment.id)}
                      className={`border-b border-white/[0.04] hover:bg-white/[0.03] cursor-pointer transition-all duration-150 ${
                        i === filtered.length - 1 ? "border-b-0" : ""
                      } ${isSelected ? "bg-white/[0.04]" : ""}`}
                    >
                      {/* Shipment ID + Order */}
                      <td className="px-5 py-3.5">
                        <div className="text-[13px] font-semibold text-white/80">{shipment.id}</div>
                        <div className="text-[11px] text-white/30">{shipment.order}</div>
                      </td>

                      {/* Customer */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-white/[0.07] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                            <span className="text-[9px] font-semibold text-white/45">{shipment.initials}</span>
                          </div>
                          <div>
                            <div className="text-[13px] font-medium text-white/75">{shipment.customer}</div>
                            <div className="text-[11px] text-white/30 max-w-[160px] truncate">{shipment.destination}</div>
                          </div>
                        </div>
                      </td>

                      {/* Carrier */}
                      <td className="px-5 py-3.5">
                        <div className={`text-[12px] font-semibold ${carrierColors[shipment.carrier] ?? "text-white/60"}`}>
                          {shipment.carrier}
                        </div>
                        <div className="text-[11px] text-white/25 font-mono mt-0.5">{shipment.tracking.slice(0, 12)}…</div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <StatusIcon className={`w-3.5 h-3.5 ${cfg.badge.split(" ")[1]}`} />
                          <span className={`text-[12px] font-semibold ${cfg.badge.split(" ")[1]}`}>{cfg.label}</span>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-3.5">
                        {shipment.status === "Delivered" ? (
                          <div>
                            <div className="text-[12px] font-medium text-white/60">{shipment.deliveredDate}</div>
                            <div className="text-[11px] text-emerald-400/60">Delivered</div>
                          </div>
                        ) : shipment.eta ? (
                          <div>
                            <div className="text-[12px] font-medium text-white/60">{shipment.eta}</div>
                            <div className="text-[11px] text-white/30">Expected</div>
                          </div>
                        ) : (
                          <span className="text-[12px] text-white/25">—</span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1.5 text-white/20 hover:text-white/50 transition-colors">
                          <MoveRight className="w-3.5 h-3.5" />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Tracking Detail Panel */}
      {selected && (
        <div className="w-80 border-l border-white/[0.07] flex flex-col flex-shrink-0">
          <div className="px-5 py-4 border-b border-white/[0.07] flex items-center justify-between">
            <div>
              <span className="text-[13px] font-semibold text-white">{selected.id}</span>
              <span className="text-[12px] text-white/30 ml-2">{selected.order}</span>
            </div>
            <button
              onClick={() => setSelectedId(null)}
              className="w-6 h-6 rounded-md hover:bg-white/[0.08] flex items-center justify-center transition-all"
            >
              <X className="w-3.5 h-3.5 text-white/35" />
            </button>
          </div>

          <div className="flex-1 overflow-auto p-5">
            {/* Status banner */}
            {(() => {
              const status = selected.status as Status;
              const cfg = statusConfig[status];
              const StatusIcon = cfg.icon;
              return (
                <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border mb-5 ${
                  status === "Delivered" ? "bg-emerald-400/[0.06] border-emerald-400/15" :
                  status === "In Transit" ? "bg-sky-400/[0.06] border-sky-400/15" :
                  status === "Processing" ? "bg-amber-400/[0.06] border-amber-400/15" :
                  "bg-red-400/[0.06] border-red-400/15"
                }`}>
                  <StatusIcon className={`w-4 h-4 ${cfg.badge.split(" ")[1]}`} />
                  <div>
                    <div className={`text-[13px] font-semibold ${cfg.badge.split(" ")[1]}`}>{cfg.label}</div>
                    {selected.eta && status !== "Delivered" && (
                      <div className="text-[11px] text-white/35">Expected {selected.eta}</div>
                    )}
                    {selected.deliveredDate && (
                      <div className="text-[11px] text-white/35">Arrived {selected.deliveredDate}</div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Info rows */}
            <div className="space-y-2.5 mb-5 pb-5 border-b border-white/[0.07]">
              {[
                { label: "Customer", value: selected.customer },
                { label: "Destination", value: selected.destination },
                { label: "Carrier", value: selected.carrier },
                { label: "Tracking #", value: selected.tracking, mono: true },
                { label: "Weight", value: selected.weight },
                ...(selected.shippedDate ? [{ label: "Shipped", value: selected.shippedDate }] : []),
              ].map((row) => (
                <div key={row.label} className="flex items-start justify-between gap-3">
                  <span className="text-[12px] text-white/35 flex-shrink-0">{row.label}</span>
                  <span className={`text-[12px] font-medium text-white/65 text-right ${(row as any).mono ? "font-mono text-[11px]" : ""}`}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Tracking timeline */}
            <div className="mb-5">
              <h4 className="text-[11px] font-semibold text-white/25 uppercase tracking-widest mb-4">Tracking Timeline</h4>
              <div className="space-y-0">
                {selected.steps.map((step, i) => {
                  const isLast = i === selected.steps.length - 1;
                  const isCurrent = step.done && (isLast || !selected.steps[i + 1]?.done);
                  return (
                    <div key={step.label} className="flex gap-3">
                      {/* Timeline column */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                            step.done
                              ? isCurrent
                                ? "bg-white border-2 border-white"
                                : "bg-white/20 border border-white/30"
                              : "bg-white/[0.04] border border-white/[0.08]"
                          }`}
                        >
                          {step.done && !isCurrent && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                          )}
                          {isCurrent && step.done && (
                            <div className="w-2 h-2 rounded-full bg-[#080808]" />
                          )}
                        </div>
                        {!isLast && (
                          <div
                            className={`w-px flex-1 my-0.5 ${
                              selected.steps[i + 1]?.done ? "bg-white/20" : "bg-white/[0.06]"
                            }`}
                            style={{ minHeight: "24px" }}
                          />
                        )}
                      </div>

                      {/* Text */}
                      <div className={`pb-5 ${isLast ? "pb-0" : ""}`}>
                        <div
                          className={`text-[13px] font-medium leading-tight ${
                            isCurrent ? "text-white" : step.done ? "text-white/50" : "text-white/20"
                          }`}
                        >
                          {step.label}
                        </div>
                        <div className="text-[11px] text-white/25 mt-0.5">{step.date}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-[12px] font-medium text-white/50 hover:bg-white/[0.07] hover:text-white/70 transition-all">
                <ExternalLink className="w-3.5 h-3.5" />
                Track on {selected.carrier}
              </button>
              {selected.status === "Failed" && (
                <button className="w-full px-4 py-2.5 bg-white text-black rounded-lg text-[12px] font-semibold hover:bg-white/90 transition-all">
                  Reship Order
                </button>
              )}
              {selected.status !== "Delivered" && selected.status !== "Failed" && (
                <button className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-[12px] font-medium text-white/40 hover:bg-white/[0.06] transition-all">
                  Notify Customer
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}