import { useState } from "react";
import { Search, Filter, MoreVertical, Mail, Phone, MapPin, X, MoveRight } from "lucide-react";

const customers = [
  {
    id: 1,
    name: "Sarah Johnson",
    initials: "SJ",
    email: "sarah.j@email.com",
    orders: 12,
    spent: "$1,248.00",
    status: "Active",
    location: "New York, US",
    phone: "+1 (555) 123-4567",
  },
  {
    id: 2,
    name: "Michael Chen",
    initials: "MC",
    email: "m.chen@email.com",
    orders: 8,
    spent: "$892.50",
    status: "Active",
    location: "San Francisco, US",
    phone: "+1 (555) 234-5678",
  },
  {
    id: 3,
    name: "Emma Davis",
    initials: "ED",
    email: "emma.d@email.com",
    orders: 15,
    spent: "$2,156.00",
    status: "VIP",
    location: "London, UK",
    phone: "+44 20 1234 5678",
  },
  {
    id: 4,
    name: "James Wilson",
    initials: "JW",
    email: "j.wilson@email.com",
    orders: 5,
    spent: "$445.99",
    status: "Active",
    location: "Toronto, CA",
    phone: "+1 (555) 345-6789",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    initials: "LA",
    email: "lisa.a@email.com",
    orders: 3,
    spent: "$278.00",
    status: "New",
    location: "Sydney, AU",
    phone: "+61 2 1234 5678",
  },
];

const statusStyles: Record<string, string> = {
  VIP: "bg-amber-400/10 text-amber-400",
  Active: "bg-emerald-400/10 text-emerald-400",
  New: "bg-sky-400/10 text-sky-400",
};

export function Customers() {
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selected = customers.find((c) => c.id === selectedCustomer);

  return (
    <div className="flex h-full">
      {/* Customer List */}
      <div className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-medium text-white/30 uppercase tracking-widest">CRM</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">Customers</h1>
            <p className="text-[13px] text-white/40 mt-1">Manage your customer relationships.</p>
          </div>
          <button className="flex items-center gap-2 px-3.5 py-2 bg-white text-black rounded-lg text-[13px] font-semibold hover:bg-white/90 transition-all shadow-lg shadow-white/10">
            Export
            <MoveRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-2.5 mb-5">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-[13px] focus:outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all placeholder:text-white/25"
            />
          </div>
          <button className="flex items-center gap-2 px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-[13px] text-white/50 hover:text-white/70 hover:bg-white/[0.06] transition-all">
            <Filter className="w-3.5 h-3.5" />
            Filter
          </button>
        </div>

        {/* Table */}
        <div className="bg-white/[0.02] border border-white/[0.07] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.07]">
                {["Customer", "Orders", "Total Spent", "Status", ""].map((col) => (
                  <th key={col} className="text-left px-5 py-3.5 text-[11px] font-semibold text-white/30 uppercase tracking-wide">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer, i) => (
                <tr
                  key={customer.id}
                  onClick={() => setSelectedCustomer(customer.id === selectedCustomer ? null : customer.id)}
                  className={`border-b border-white/[0.04] hover:bg-white/[0.03] cursor-pointer transition-all duration-150 ${
                    i === filteredCustomers.length - 1 ? "border-b-0" : ""
                  } ${selectedCustomer === customer.id ? "bg-white/[0.05]" : ""}`}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/[0.08] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] font-semibold text-white/50">{customer.initials}</span>
                      </div>
                      <div>
                        <div className="text-[13px] font-medium text-white/80">{customer.name}</div>
                        <div className="text-[11px] text-white/30">{customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-[13px] text-white/60">{customer.orders}</td>
                  <td className="px-5 py-3.5 text-[13px] font-medium text-white/80">{customer.spent}</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${statusStyles[customer.status]}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white/[0.08] transition-all"
                    >
                      <MoreVertical className="w-3.5 h-3.5 text-white/30" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-3 text-[11px] text-white/25 px-1">
          {filteredCustomers.length} customer{filteredCustomers.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Customer Detail Panel */}
      {selected && (
        <div className="w-80 border-l border-white/[0.07] bg-[#080808] flex flex-col overflow-auto">
          <div className="p-5 border-b border-white/[0.07] flex items-center justify-between">
            <span className="text-[13px] font-semibold text-white">Customer Details</span>
            <button
              onClick={() => setSelectedCustomer(null)}
              className="w-7 h-7 rounded-md bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center transition-all"
            >
              <X className="w-3.5 h-3.5 text-white/40" />
            </button>
          </div>

          <div className="flex-1 p-5">
            {/* Profile */}
            <div className="flex items-center gap-3.5 mb-5 pb-5 border-b border-white/[0.07]">
              <div className="w-12 h-12 rounded-full bg-white/[0.08] border border-white/[0.1] flex items-center justify-center flex-shrink-0">
                <span className="text-[14px] font-semibold text-white/60">
                  {selected.name.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
              <div>
                <div className="text-[15px] font-semibold text-white leading-tight">{selected.name}</div>
                <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold mt-1 ${statusStyles[selected.status]}`}>
                  {selected.status}
                </span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-5 pb-5 border-b border-white/[0.07]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-white/[0.05] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-3.5 h-3.5 text-white/30" />
                </div>
                <span className="text-[12px] text-white/50 truncate">{selected.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-white/[0.05] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-3.5 h-3.5 text-white/30" />
                </div>
                <span className="text-[12px] text-white/50">{selected.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-white/[0.05] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-white/30" />
                </div>
                <span className="text-[12px] text-white/50">{selected.location}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              <div className="p-3 bg-white/[0.03] border border-white/[0.06] rounded-lg">
                <div className="text-[11px] text-white/35 mb-1">Total Orders</div>
                <div className="text-[22px] font-semibold text-white">{selected.orders}</div>
              </div>
              <div className="p-3 bg-white/[0.03] border border-white/[0.06] rounded-lg">
                <div className="text-[11px] text-white/35 mb-1">Total Spent</div>
                <div className="text-[18px] font-semibold text-white">{selected.spent}</div>
              </div>
            </div>

            {/* Recent Orders */}
            <div>
              <h4 className="text-[11px] font-semibold text-white/30 uppercase tracking-widest mb-3">Recent Orders</h4>
              <div className="space-y-2">
                {[
                  { id: "#8472", date: "Mar 20, 2026", amount: "$124.00", status: "Completed" },
                  { id: "#8445", date: "Mar 15, 2026", amount: "$89.50", status: "Shipped" },
                  { id: "#8401", date: "Mar 10, 2026", amount: "$256.00", status: "Completed" },
                ].map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between px-3 py-2.5 bg-white/[0.03] border border-white/[0.05] rounded-lg hover:bg-white/[0.05] transition-all cursor-pointer"
                  >
                    <div>
                      <div className="text-[12px] font-medium text-white/70">{order.id}</div>
                      <div className="text-[11px] text-white/30">{order.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[12px] font-semibold text-white/80">{order.amount}</div>
                      <div className={`text-[10px] font-medium ${statusStyles[order.status]?.includes("emerald") ? "text-emerald-400" : "text-sky-400"}`}>
                        {order.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}