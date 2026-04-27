import { useState } from "react";
import { User, CreditCard, Bell, Shield, Globe, Plug, ChevronRight, Check } from "lucide-react";

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative inline-flex w-9 h-5 rounded-full transition-all duration-200 flex-shrink-0 ${
        enabled ? "bg-white" : "bg-white/15"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-all duration-200 ${
          enabled ? "bg-black translate-x-4" : "bg-white/40"
        }`}
      />
    </button>
  );
}

export function Settings() {
  const [toggles, setToggles] = useState({
    emailNotifications: true,
    orderUpdates: true,
    marketingEmails: false,
  });

  const toggle = (key: keyof typeof toggles) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const integrations = [
    { name: "WhatsApp Business", status: "Connected", description: "Customer messaging", icon: "💬" },
    { name: "Stripe", status: "Connected", description: "Payment processing", icon: "💳" },
    { name: "Shopify", status: "Not Connected", description: "E-commerce sync", icon: "🛍️" },
    { name: "Mailchimp", status: "Not Connected", description: "Email marketing", icon: "📧" },
  ];

  return (
    <div className="p-8 overflow-auto max-w-[900px]">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[11px] font-medium text-white/30 uppercase tracking-widest">Configuration</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">Settings</h1>
        <p className="text-[13px] text-white/40 mt-1">Manage your account, billing, and preferences.</p>
      </div>

      <div className="space-y-4">
        {/* Account */}
        <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
            <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center">
              <User className="w-4 h-4 text-white/40" />
            </div>
            <div>
              <h3 className="text-[14px] font-semibold text-white">Account</h3>
              <p className="text-[11px] text-white/35">Personal information and profile</p>
            </div>
          </div>
          <div className="divide-y divide-white/[0.05]">
            {[
              { label: "Full Name", value: "John Doe" },
              { label: "Email Address", value: "john@heven.com" },
              { label: "Role", value: "Owner" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.02] transition-all group">
                <span className="text-[12px] text-white/40">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-medium text-white/70">{item.value}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-white/[0.05]">
            <button className="text-[12px] font-medium text-white/50 hover:text-white/80 transition-colors">
              Edit Account →
            </button>
          </div>
        </div>

        {/* Billing */}
        <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
            <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-white/40" />
            </div>
            <div className="flex-1">
              <h3 className="text-[14px] font-semibold text-white">Billing</h3>
              <p className="text-[11px] text-white/35">Subscription and payment details</p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-400/10 rounded-full">
              <Check className="w-3 h-3 text-emerald-400" strokeWidth={2.5} />
              <span className="text-[11px] font-semibold text-emerald-400">Pro</span>
            </div>
          </div>
          <div className="divide-y divide-white/[0.05]">
            {[
              { label: "Plan", value: "Pro — $49/month" },
              { label: "Billing Cycle", value: "Monthly" },
              { label: "Next Payment", value: "April 25, 2026" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between px-5 py-3.5">
                <span className="text-[12px] text-white/40">{item.label}</span>
                <span className="text-[13px] font-medium text-white/70">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-white/[0.05] flex items-center gap-4">
            <button className="text-[12px] font-medium text-white/50 hover:text-white/80 transition-colors">
              Manage Billing →
            </button>
            <button className="text-[12px] font-medium text-white/30 hover:text-white/60 transition-colors">
              View Invoices
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
            <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center">
              <Bell className="w-4 h-4 text-white/40" />
            </div>
            <div>
              <h3 className="text-[14px] font-semibold text-white">Notifications</h3>
              <p className="text-[11px] text-white/35">Manage how you receive alerts</p>
            </div>
          </div>
          <div className="divide-y divide-white/[0.05]">
            <div className="flex items-center justify-between px-5 py-3.5">
              <div>
                <div className="text-[13px] font-medium text-white/70">Email Notifications</div>
                <div className="text-[11px] text-white/30">Receive updates via email</div>
              </div>
              <Toggle enabled={toggles.emailNotifications} onChange={() => toggle("emailNotifications")} />
            </div>
            <div className="flex items-center justify-between px-5 py-3.5">
              <div>
                <div className="text-[13px] font-medium text-white/70">Order Updates</div>
                <div className="text-[11px] text-white/30">New orders and status changes</div>
              </div>
              <Toggle enabled={toggles.orderUpdates} onChange={() => toggle("orderUpdates")} />
            </div>
            <div className="flex items-center justify-between px-5 py-3.5">
              <div>
                <div className="text-[13px] font-medium text-white/70">Marketing Emails</div>
                <div className="text-[11px] text-white/30">Tips, product updates, offers</div>
              </div>
              <Toggle enabled={toggles.marketingEmails} onChange={() => toggle("marketingEmails")} />
            </div>
          </div>
        </div>

        {/* Integrations */}
        <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
            <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center">
              <Plug className="w-4 h-4 text-white/40" />
            </div>
            <div>
              <h3 className="text-[14px] font-semibold text-white">Integrations</h3>
              <p className="text-[11px] text-white/35">Connect your favorite tools</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/[0.05]">
            {integrations.map((integration) => (
              <div
                key={integration.name}
                className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-all border-b border-white/[0.04] last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.07] flex items-center justify-center text-lg">
                    {integration.icon}
                  </div>
                  <div>
                    <div className="text-[13px] font-medium text-white/80">{integration.name}</div>
                    <div className="text-[11px] text-white/30">{integration.description}</div>
                  </div>
                </div>
                <button
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${
                    integration.status === "Connected"
                      ? "bg-white/[0.05] text-white/40 hover:bg-red-400/10 hover:text-red-400/70"
                      : "bg-white text-black hover:bg-white/90 shadow-sm shadow-white/10"
                  }`}
                >
                  {integration.status === "Connected" ? "Connected" : "Connect"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Security & Preferences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
              <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center">
                <Shield className="w-4 h-4 text-white/40" />
              </div>
              <h3 className="text-[14px] font-semibold text-white">Security</h3>
            </div>
            <div className="divide-y divide-white/[0.05]">
              {[
                { title: "Change Password", sub: "Last changed 30 days ago" },
                { title: "Two-Factor Auth", sub: "Add extra security" },
              ].map((item) => (
                <button key={item.title} className="w-full text-left flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.03] transition-all group">
                  <div>
                    <div className="text-[13px] font-medium text-white/70">{item.title}</div>
                    <div className="text-[11px] text-white/30">{item.sub}</div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/40 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
              <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center">
                <Globe className="w-4 h-4 text-white/40" />
              </div>
              <h3 className="text-[14px] font-semibold text-white">Preferences</h3>
            </div>
            <div className="divide-y divide-white/[0.05]">
              {[
                { title: "Language", value: "English (US)" },
                { title: "Time Zone", value: "UTC−5 Eastern" },
              ].map((item) => (
                <button key={item.title} className="w-full text-left flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.03] transition-all group">
                  <span className="text-[13px] font-medium text-white/70">{item.title}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[12px] text-white/35">{item.value}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/40 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
