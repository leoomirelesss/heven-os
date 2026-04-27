import { useState } from "react";
import { Plus, Play, Pause, Trash2, Edit3, Zap, ArrowRight } from "lucide-react";

const automations = [
  {
    id: 1,
    name: "Welcome New Customers",
    trigger: "Customer signup",
    action: "Send welcome email",
    status: "active",
    runs: 1248,
    successRate: 98.2,
  },
  {
    id: 2,
    name: "Auto-Reply to Messages",
    trigger: "New message received",
    action: "Send auto reply",
    status: "active",
    runs: 3421,
    successRate: 99.1,
  },
  {
    id: 3,
    name: "Abandoned Cart Recovery",
    trigger: "Cart idle for 1h",
    action: "Send reminder email",
    status: "active",
    runs: 892,
    successRate: 97.8,
  },
  {
    id: 4,
    name: "Order Confirmation",
    trigger: "New order placed",
    action: "Send confirmation",
    status: "paused",
    runs: 2156,
    successRate: 99.5,
  },
];

export function Automations() {
  const [items, setItems] = useState(automations);

  const toggleStatus = (id: number) => {
    setItems((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: a.status === "active" ? "paused" : "active" } : a
      )
    );
  };

  return (
    <div className="p-10 max-w-[1400px]">

      {/* Header */}
      <div className="flex items-start justify-between mb-10">
        <div>
          <p className="text-[11px] font-medium text-white/25 uppercase tracking-widest mb-2">Workflows</p>
          <h1 className="text-[28px] font-semibold tracking-tight text-white leading-none">Automations</h1>
          <p className="text-[13px] text-white/40 mt-2">Automate your business workflows and save time.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-[13px] font-semibold hover:bg-white/90 transition-all shadow-lg shadow-white/10">
          <Plus className="w-3.5 h-3.5" />
          New Automation
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { label: "Active", value: "3", accent: "text-emerald-400" },
          { label: "Total Runs", value: "7,717", accent: "text-white" },
          { label: "Success Rate", value: "98.7%", accent: "text-white" },
        ].map((item) => (
          <div key={item.label} className="p-6 bg-white/[0.025] border border-white/[0.06] rounded-xl">
            <p className="text-[11px] font-medium text-white/40 uppercase tracking-widest mb-4">{item.label}</p>
            <p className={`text-[36px] font-semibold tracking-tight leading-none ${item.accent}`}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Automations List */}
      <div className="space-y-2 mb-8">
        {items.map((automation) => (
          <div
            key={automation.id}
            className="flex items-center gap-5 px-6 py-5 bg-white/[0.025] border border-white/[0.06] rounded-xl hover:bg-white/[0.04] hover:border-white/[0.09] transition-all duration-150"
          >
            {/* Status dot */}
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${automation.status === "active" ? "bg-emerald-400" : "bg-white/20"}`} />

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2.5">
                <h3 className="text-[14px] font-semibold text-white">{automation.name}</h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${
                  automation.status === "active"
                    ? "bg-emerald-400/10 text-emerald-400"
                    : "bg-white/[0.07] text-white/35"
                }`}>
                  {automation.status}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.06] rounded-md text-[11px] text-white/50">
                  {automation.trigger}
                </span>
                <ArrowRight className="w-3 h-3 text-white/15 flex-shrink-0" />
                <span className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.06] rounded-md text-[11px] text-white/50">
                  {automation.action}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="hidden lg:flex items-center gap-8 flex-shrink-0">
              <div className="text-right">
                <div className="text-[15px] font-semibold text-white">{automation.runs.toLocaleString()}</div>
                <div className="text-[11px] text-white/30 mt-0.5">Total runs</div>
              </div>
              <div className="text-right">
                <div className="text-[15px] font-semibold text-emerald-400">{automation.successRate}%</div>
                <div className="text-[11px] text-white/30 mt-0.5">Success rate</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={() => toggleStatus(automation.id)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 ${
                  automation.status === "active"
                    ? "bg-amber-400/[0.08] text-amber-400 hover:bg-amber-400/[0.15]"
                    : "bg-emerald-400/[0.08] text-emerald-400 hover:bg-emerald-400/[0.15]"
                }`}
              >
                {automation.status === "active" ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button className="w-8 h-8 rounded-lg hover:bg-white/[0.06] flex items-center justify-center transition-all duration-150">
                <Edit3 className="w-3.5 h-3.5 text-white/35" />
              </button>
              <button className="w-8 h-8 rounded-lg hover:bg-red-400/[0.08] flex items-center justify-center transition-all duration-150">
                <Trash2 className="w-3.5 h-3.5 text-white/25 hover:text-red-400/70" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Workflow Builder */}
      <div className="p-6 bg-white/[0.025] border border-white/[0.06] rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-[15px] font-semibold text-white">Visual Workflow Builder</h3>
            <p className="text-[12px] text-white/35 mt-0.5">Drag and connect nodes to build custom flows</p>
          </div>
          <button className="flex items-center gap-2 px-3.5 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-[12px] font-medium text-white/50 hover:bg-white/[0.08] hover:text-white/70 transition-all">
            <Zap className="w-3.5 h-3.5" />
            Build Workflow
          </button>
        </div>

        <div className="flex items-center justify-center gap-5 py-10 bg-white/[0.015] rounded-xl border border-white/[0.04]">
          <div className="px-4 py-3.5 bg-sky-500/[0.08] border border-sky-500/20 rounded-xl min-w-[130px]">
            <div className="text-[10px] text-sky-400/70 font-semibold mb-1.5 uppercase tracking-widest">Trigger</div>
            <div className="text-[13px] font-medium text-white/75">New Message</div>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="w-8 h-px bg-white/[0.12]" />
            <ArrowRight className="w-3 h-3 text-white/15" />
          </div>

          <div className="px-4 py-3.5 bg-violet-500/[0.08] border border-violet-500/20 rounded-xl min-w-[130px]">
            <div className="text-[10px] text-violet-400/70 font-semibold mb-1.5 uppercase tracking-widest">Condition</div>
            <div className="text-[13px] font-medium text-white/75">If outside hours</div>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="w-8 h-px bg-white/[0.12]" />
            <ArrowRight className="w-3 h-3 text-white/15" />
          </div>

          <div className="px-4 py-3.5 bg-emerald-500/[0.08] border border-emerald-500/20 rounded-xl min-w-[130px]">
            <div className="text-[10px] text-emerald-400/70 font-semibold mb-1.5 uppercase tracking-widest">Action</div>
            <div className="text-[13px] font-medium text-white/75">Send Auto Reply</div>
          </div>
        </div>
      </div>
    </div>
  );
}
