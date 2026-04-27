import { Plus, Play, Pause, Trash2, Edit, Zap } from "lucide-react";

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
  return (
    <div className="p-8 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-medium text-white/30 uppercase tracking-widest">Workflows</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Automations</h1>
          <p className="text-[13px] text-white/40 mt-1">Automate your business workflows and save time.</p>
        </div>
        <button className="flex items-center gap-2 px-3.5 py-2 bg-white text-black rounded-lg text-[13px] font-semibold hover:bg-white/90 transition-all shadow-lg shadow-white/10">
          <Plus className="w-3.5 h-3.5" />
          Create Automation
        </button>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Active", value: "3", color: "text-emerald-400" },
          { label: "Total Runs", value: "7,717", color: "text-white" },
          { label: "Success Rate", value: "98.7%", color: "text-white" },
        ].map((item) => (
          <div key={item.label} className="p-5 bg-white/[0.03] border border-white/[0.07] rounded-xl">
            <div className="text-[11px] font-medium text-white/35 uppercase tracking-wide mb-2">{item.label}</div>
            <div className={`text-[26px] font-semibold tracking-tight ${item.color}`}>{item.value}</div>
          </div>
        ))}
      </div>

      {/* Automations List */}
      <div className="space-y-2 mb-6">
        {automations.map((automation) => (
          <div
            key={automation.id}
            className="p-5 bg-white/[0.03] border border-white/[0.07] rounded-xl hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-150"
          >
            <div className="flex items-center gap-4">
              {/* Status indicator */}
              <div
                className={`w-1.5 h-10 rounded-full flex-shrink-0 ${
                  automation.status === "active" ? "bg-emerald-400" : "bg-white/20"
                }`}
              />

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 mb-2">
                  <h3 className="text-[14px] font-semibold text-white">{automation.name}</h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${
                      automation.status === "active"
                        ? "bg-emerald-400/10 text-emerald-400"
                        : "bg-white/10 text-white/40"
                    }`}
                  >
                    {automation.status}
                  </span>
                </div>

                {/* Workflow */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.05] border border-white/[0.07] rounded-md">
                    <span className="text-[11px] text-white/40 font-medium">TRIGGER</span>
                    <span className="text-[11px] text-white/60">{automation.trigger}</span>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/20 flex-shrink-0">
                    <path d="M3 8h10m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.05] border border-white/[0.07] rounded-md">
                    <span className="text-[11px] text-white/40 font-medium">ACTION</span>
                    <span className="text-[11px] text-white/60">{automation.action}</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="hidden lg:flex items-center gap-6 flex-shrink-0 px-4">
                <div className="text-right">
                  <div className="text-[13px] font-semibold text-white">{automation.runs.toLocaleString()}</div>
                  <div className="text-[11px] text-white/30">Total runs</div>
                </div>
                <div className="text-right">
                  <div className="text-[13px] font-semibold text-emerald-400">{automation.successRate}%</div>
                  <div className="text-[11px] text-white/30">Success rate</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 ${
                    automation.status === "active"
                      ? "bg-amber-400/10 text-amber-400 hover:bg-amber-400/20"
                      : "bg-emerald-400/10 text-emerald-400 hover:bg-emerald-400/20"
                  }`}
                >
                  {automation.status === "active" ? (
                    <Pause className="w-3.5 h-3.5" />
                  ) : (
                    <Play className="w-3.5 h-3.5" />
                  )}
                </button>
                <button className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center transition-all duration-150">
                  <Edit className="w-3.5 h-3.5 text-white/50" />
                </button>
                <button className="w-8 h-8 rounded-lg bg-red-400/[0.08] hover:bg-red-400/[0.15] flex items-center justify-center transition-all duration-150">
                  <Trash2 className="w-3.5 h-3.5 text-red-400/70" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Workflow Builder */}
      <div className="p-5 bg-white/[0.03] border border-white/[0.07] rounded-xl">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-[15px] font-semibold text-white">Visual Workflow Builder</h3>
            <p className="text-[12px] text-white/35 mt-0.5">Drag and connect nodes to build custom flows</p>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.06] border border-white/[0.1] rounded-lg text-[12px] font-medium text-white/60 hover:bg-white/[0.1] hover:text-white/80 transition-all">
            <Zap className="w-3.5 h-3.5" />
            Build Custom Workflow
          </button>
        </div>

        <div className="flex items-center justify-center gap-4 py-8 bg-white/[0.02] rounded-xl border border-white/[0.04]">
          {/* Trigger Node */}
          <div className="w-36 px-3.5 py-3 bg-sky-500/10 border border-sky-500/25 rounded-xl">
            <div className="text-[10px] text-sky-400 font-semibold mb-1 uppercase tracking-wide">Trigger</div>
            <div className="text-[13px] font-medium text-white/80">New Message</div>
          </div>

          <svg width="32" height="2" viewBox="0 0 32 2" className="flex-shrink-0">
            <line x1="0" y1="1" x2="28" y2="1" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 3" />
            <path d="M26 -3 L32 1 L26 5" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>

          {/* Condition Node */}
          <div className="w-36 px-3.5 py-3 bg-violet-500/10 border border-violet-500/25 rounded-xl">
            <div className="text-[10px] text-violet-400 font-semibold mb-1 uppercase tracking-wide">Condition</div>
            <div className="text-[13px] font-medium text-white/80">If outside hours</div>
          </div>

          <svg width="32" height="2" viewBox="0 0 32 2" className="flex-shrink-0">
            <line x1="0" y1="1" x2="28" y2="1" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 3" />
            <path d="M26 -3 L32 1 L26 5" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>

          {/* Action Node */}
          <div className="w-36 px-3.5 py-3 bg-emerald-500/10 border border-emerald-500/25 rounded-xl">
            <div className="text-[10px] text-emerald-400 font-semibold mb-1 uppercase tracking-wide">Action</div>
            <div className="text-[13px] font-medium text-white/80">Send Auto Reply</div>
          </div>
        </div>
      </div>
    </div>
  );
}