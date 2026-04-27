import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles, ArrowRight, ShoppingBag, Briefcase, CalendarDays,
  Globe, Layers, Plus, Command, CornerDownLeft, ChevronRight,
  Store, Users, Workflow, BarChart3, MessageSquare, Package, Zap
} from "lucide-react";

const ROTATING_WORDS = [
  "jewelry brand",
  "fitness studio",
  "SaaS product",
  "consulting firm",
  "coffee brand",
  "booking service",
  "online course",
];

const BUSINESS_TYPES = [
  { id: "ecommerce", label: "Ecommerce", icon: ShoppingBag, description: "Sell physical products", accent: "violet" },
  { id: "services", label: "Services", icon: Briefcase, description: "Offer expertise", accent: "sky" },
  { id: "bookings", label: "Bookings", icon: CalendarDays, description: "Appointments & classes", accent: "emerald" },
  { id: "digital", label: "Digital", icon: Globe, description: "Sell digital products", accent: "amber" },
  { id: "saas", label: "SaaS", icon: Layers, description: "Software product", accent: "rose" },
];

const SMART_ADDONS: Record<string, string[]> = {
  ecommerce: ["+ Stripe checkout", "+ Abandoned cart emails", "+ Instagram catalog sync", "+ Inventory alerts"],
  services: ["+ Client portal", "+ Automated invoicing", "+ Proposal builder", "+ Project milestones"],
  bookings: ["+ Online scheduling", "+ SMS reminders", "+ Membership tiers", "+ Waitlist management"],
  digital: ["+ License key delivery", "+ Members-only area", "+ Affiliate program", "+ Usage analytics"],
  saas: ["+ 14-day free trial", "+ Usage-based billing", "+ Onboarding checklist", "+ Team seats"],
};

const EXAMPLES: Record<string, { icon: string; title: string; prompt: string }[]> = {
  ecommerce: [
    { icon: "💍", title: "Jewelry Brand", prompt: "Minimalist jewelry brand from Mexico City — Stripe checkout, abandoned cart emails, and WhatsApp order notifications" },
    { icon: "🧴", title: "Skincare Store", prompt: "Korean skincare store with curated bundles, subscription boxes, and influencer referral tracking" },
    { icon: "🏺", title: "Ceramics Shop", prompt: "Handcrafted ceramics shop with international shipping, studio visit bookings, and email newsletter" },
    { icon: "👟", title: "Sneaker Boutique", prompt: "Limited-edition sneaker boutique with drop scheduling, waitlist signup, and resell market integration" },
  ],
  services: [
    { icon: "🏠", title: "Interior Design", prompt: "Boutique interior design studio with project intake, mood board sharing, and milestone-based invoicing" },
    { icon: "🎬", title: "Video Agency", prompt: "Freelance video editing agency with brief intake, revision tracking, automated contracts, and Stripe payments" },
    { icon: "📈", title: "Marketing Studio", prompt: "Growth marketing consultancy with retainer management, weekly report automation, and client-facing portal" },
    { icon: "⚖️", title: "Legal Firm", prompt: "Boutique legal consultancy with intake questionnaire, e-signature, and secure document delivery" },
  ],
  bookings: [
    { icon: "🧘", title: "Yoga Studio", prompt: "Yoga studio with live class scheduling, membership tiers, automated 24h reminders, and Zoom integration" },
    { icon: "🚗", title: "Car Detailing", prompt: "Premium car detailing service with appointment slots, mobile booking, and loyalty discount system" },
    { icon: "👨‍🍳", title: "Private Chef", prompt: "Private chef service with event intake, dietary preferences capture, and automated post-booking prep sheet" },
    { icon: "💆", title: "Wellness Spa", prompt: "Luxury wellness spa with treatment booking, gift card system, membership tiers, and therapist assignment" },
  ],
  digital: [
    { icon: "🎨", title: "Design Courses", prompt: "Online course platform for designers with drip lessons, community access, and completion certificates" },
    { icon: "📷", title: "Stock Photos", prompt: "Stock photo marketplace with license tiers, instant delivery, and photographer revenue share" },
    { icon: "📝", title: "Notion Templates", prompt: "Notion templates shop with instant download, bundle deals, and affiliate commission tracking" },
    { icon: "🎵", title: "Sample Packs", prompt: "Music producer selling sample packs and presets with license management and resale prevention" },
  ],
  saas: [
    { icon: "🛠", title: "Dev Tool", prompt: "Developer tool with 14-day trial, usage metering, team seats, Stripe billing portal, and usage dashboard" },
    { icon: "✍️", title: "AI Writer", prompt: "AI writing assistant with free tier, usage credits, team collaboration, and monthly usage reports" },
    { icon: "📋", title: "Form Builder", prompt: "No-code form builder with template library, embed codes, response analytics, and webhook integrations" },
    { icon: "🔗", title: "Link Manager", prompt: "Smart link management SaaS with click analytics, A/B routing, team workspaces, and custom domains" },
  ],
};

const CAPABILITIES: Record<string, { icon: typeof Store; label: string }[]> = {
  ecommerce: [{ icon: Store, label: "Store" }, { icon: Users, label: "CRM" }, { icon: Package, label: "Shipping" }, { icon: Workflow, label: "Automations" }, { icon: BarChart3, label: "Analytics" }],
  services: [{ icon: Globe, label: "Portfolio" }, { icon: Users, label: "CRM" }, { icon: MessageSquare, label: "Inbox" }, { icon: Workflow, label: "Contracts" }, { icon: BarChart3, label: "Analytics" }],
  bookings: [{ icon: CalendarDays, label: "Scheduler" }, { icon: Users, label: "CRM" }, { icon: MessageSquare, label: "Reminders" }, { icon: Workflow, label: "Automations" }, { icon: BarChart3, label: "Analytics" }],
  digital: [{ icon: Store, label: "Products" }, { icon: Users, label: "Members" }, { icon: Globe, label: "Delivery" }, { icon: Workflow, label: "Affiliates" }, { icon: BarChart3, label: "Analytics" }],
  saas: [{ icon: Layers, label: "Dashboard" }, { icon: Users, label: "Users" }, { icon: Workflow, label: "Onboarding" }, { icon: BarChart3, label: "Analytics" }, { icon: MessageSquare, label: "Support" }],
};

const ACCENT_CLASSES: Record<string, { pill: string; glow: string; ring: string }> = {
  ecommerce: { pill: "bg-violet-400/10 border-violet-400/20 text-violet-300", glow: "shadow-violet-500/10", ring: "border-violet-400/30" },
  services: { pill: "bg-sky-400/10 border-sky-400/20 text-sky-300", glow: "shadow-sky-500/10", ring: "border-sky-400/30" },
  bookings: { pill: "bg-emerald-400/10 border-emerald-400/20 text-emerald-300", glow: "shadow-emerald-500/10", ring: "border-emerald-400/30" },
  digital: { pill: "bg-amber-400/10 border-amber-400/20 text-amber-300", glow: "shadow-amber-500/10", ring: "border-amber-400/30" },
  saas: { pill: "bg-rose-400/10 border-rose-400/20 text-rose-300", glow: "shadow-rose-500/10", ring: "border-rose-400/30" },
};

export function AIBuilder() {
  const [prompt, setPrompt] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [addedAddons, setAddedAddons] = useState<Set<string>>(new Set());
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % ROTATING_WORDS.length), 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => { setAddedAddons(new Set()); }, [selectedType]);

  const handleGenerate = () => { if (prompt.trim()) navigate("/generating"); };
  const handleAddon = (addon: string) => {
    const tag = addon.replace("+ ", "");
    if (addedAddons.has(addon)) return;
    setAddedAddons((prev) => new Set([...prev, addon]));
    setPrompt((p) => (p.trim() ? `${p.trim()}, ${tag.toLowerCase()}` : tag));
    textareaRef.current?.focus();
  };
  const handleExample = (exPrompt: string) => {
    setPrompt(exPrompt);
    setAddedAddons(new Set());
    textareaRef.current?.focus();
  };

  const activeAccent = selectedType ? ACCENT_CLASSES[selectedType] : null;
  const activeExamples = selectedType ? EXAMPLES[selectedType] : EXAMPLES.ecommerce;
  const activeAddons = selectedType ? SMART_ADDONS[selectedType] : null;
  const activeCapabilities = selectedType ? CAPABILITIES[selectedType] : null;
  const charCount = prompt.length;
  const charMax = 400;

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">

      {/* Ambient grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.022) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[800px] h-[500px] rounded-full bg-white/[0.012] blur-[120px]" />
      </div>

      {/* Type-based glows */}
      <AnimatePresence>
        {selectedType === "ecommerce" && (
          <motion.div key="glow-v" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-violet-500/[0.035] blur-[90px] pointer-events-none" />
        )}
        {selectedType === "services" && (
          <motion.div key="glow-s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-sky-500/[0.04] blur-[90px] pointer-events-none" />
        )}
        {selectedType === "bookings" && (
          <motion.div key="glow-e" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute bottom-1/3 left-1/3 w-72 h-72 rounded-full bg-emerald-500/[0.035] blur-[90px] pointer-events-none" />
        )}
        {selectedType === "digital" && (
          <motion.div key="glow-a" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute top-1/4 right-1/3 w-72 h-72 rounded-full bg-amber-500/[0.035] blur-[90px] pointer-events-none" />
        )}
        {selectedType === "saas" && (
          <motion.div key="glow-r" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full bg-rose-500/[0.035] blur-[90px] pointer-events-none" />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="w-full max-w-2xl relative z-10"
      >

        {/* Logo + badge */}
        <div className="flex items-center justify-center gap-3 mb-14">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-xl shadow-white/10">
              <span className="text-black font-bold text-sm">H</span>
            </div>
            <span className="text-xl font-semibold tracking-tight text-white">Hevən OS</span>
          </div>
          <div className="h-4 w-px bg-white/[0.08]" />
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.04] border border-white/[0.07] rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] text-white/35 font-medium">AI Builder</span>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-10">
          <h1 className="text-[42px] font-semibold tracking-tight mb-4 text-white leading-none">
            Build your{" "}
            <span className="relative inline-block">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="inline-block text-white/45"
                >
                  {ROTATING_WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <br />
            in one prompt.
          </h1>
          <p className="text-[14px] text-white/30 max-w-sm mx-auto leading-relaxed">
            Describe your idea. We'll generate your store, CRM, automations,
            analytics — everything, instantly.
          </p>
        </div>

        {/* Business type selector */}
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-white/20 uppercase tracking-widest mb-3 px-0.5">
            What type of business?
          </p>
          <div className="flex gap-2 flex-wrap">
            {BUSINESS_TYPES.map((type, i) => {
              const Icon = type.icon;
              const isSelected = selectedType === type.id;
              const accent = ACCENT_CLASSES[type.id];
              return (
                <motion.button
                  key={type.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.3 }}
                  onClick={() => setSelectedType(isSelected ? null : type.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all duration-200 ${
                    isSelected
                      ? `${accent.pill} shadow-lg ${accent.glow}`
                      : "bg-white/[0.025] border-white/[0.06] text-white/40 hover:bg-white/[0.05] hover:text-white/60 hover:border-white/[0.1]"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isSelected ? "" : "text-white/25"}`} />
                  <span className="text-[13px] font-medium">{type.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Main input */}
        <div className="mb-4">
          <div
            className={`relative rounded-2xl transition-all duration-300 ${
              isFocused ? `shadow-2xl ${activeAccent ? activeAccent.glow : "shadow-white/5"}` : ""
            }`}
          >
            <div
              className={`absolute -inset-px rounded-2xl transition-all duration-300 pointer-events-none ${
                isFocused
                  ? activeAccent
                    ? `border ${activeAccent.ring} opacity-100`
                    : "border border-white/20 opacity-100"
                  : "opacity-0"
              }`}
            />

            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => { if (e.target.value.length <= charMax) setPrompt(e.target.value); }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleGenerate(); }}
              placeholder={
                selectedType === "ecommerce"
                  ? "e.g. A minimalist jewelry brand selling handmade rings and necklaces across Mexico, with Stripe checkout..."
                  : selectedType === "services"
                  ? "e.g. A boutique branding studio offering identity design, strategy, and brand guidelines to startups..."
                  : selectedType === "bookings"
                  ? "e.g. A yoga studio with 6 class types, online scheduling, membership tiers, and automated reminders..."
                  : selectedType === "digital"
                  ? "e.g. An online course platform teaching UI/UX design with video lessons, quizzes, and certificates..."
                  : selectedType === "saas"
                  ? "e.g. A no-code form builder with templates, embed codes, analytics, and Stripe subscription billing..."
                  : "Describe the business you want to build — be as detailed as you like..."
              }
              className="w-full h-[152px] px-5 pt-4 pb-[60px] bg-white/[0.035] border border-white/[0.07] rounded-2xl text-[14px] resize-none focus:outline-none focus:bg-white/[0.05] transition-all placeholder:text-white/18 leading-relaxed"
            />

            {/* Input footer */}
            <div className="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-center justify-between border-t border-white/[0.05]">
              <div className="flex items-center gap-1.5 text-white/18">
                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06]">
                  <Command className="w-3 h-3" />
                  <CornerDownLeft className="w-3 h-3" />
                </div>
                <span className="text-[11px]">to generate</span>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-[11px] tabular-nums transition-colors ${charCount > charMax * 0.85 ? "text-amber-400/50" : "text-white/18"}`}>
                  {charCount}/{charMax}
                </span>
                <button
                  onClick={handleGenerate}
                  disabled={!prompt.trim()}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200 ${
                    prompt.trim()
                      ? "bg-white text-black hover:bg-white/90 shadow-lg shadow-white/10"
                      : "bg-white/[0.05] text-white/20 cursor-not-allowed"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Smart add-ons */}
        <AnimatePresence>
          {activeAddons && (
            <motion.div
              key={selectedType + "-addons"}
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-2 flex-wrap pt-1">
                <span className="text-[11px] text-white/20 font-semibold uppercase tracking-widest mr-1 flex-shrink-0">
                  Quick add
                </span>
                {activeAddons.map((addon) => {
                  const added = addedAddons.has(addon);
                  return (
                    <button
                      key={addon}
                      onClick={() => handleAddon(addon)}
                      disabled={added}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[12px] font-medium transition-all duration-150 ${
                        added
                          ? "bg-white/[0.04] border-white/[0.07] text-white/30 cursor-default"
                          : `${activeAccent ? `${activeAccent.pill} hover:opacity-80` : "bg-white/[0.025] border-white/[0.06] text-white/40 hover:bg-white/[0.05] hover:text-white/60"}`
                      }`}
                    >
                      {added ? (
                        <span className="w-3 h-3 flex-shrink-0 text-white/25">✓</span>
                      ) : (
                        <Plus className="w-3 h-3 flex-shrink-0" />
                      )}
                      {addon.replace("+ ", "")}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Capability chain */}
        <AnimatePresence>
          {activeCapabilities && (
            <motion.div
              key={selectedType + "-caps"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.25 }}
              className="mb-6"
            >
              <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.015] border border-white/[0.05] rounded-xl">
                <Zap className="w-3 h-3 text-white/18 flex-shrink-0" />
                <span className="text-[11px] text-white/20 font-medium mr-2">Generates</span>
                <div className="flex items-center gap-0 flex-1 overflow-hidden">
                  {activeCapabilities.map((cap, i) => {
                    const Icon = cap.icon;
                    return (
                      <div key={cap.label} className="flex items-center">
                        <div className="flex items-center gap-1.5 px-2 py-1">
                          <Icon className="w-3 h-3 text-white/25 flex-shrink-0" />
                          <span className="text-[11px] text-white/35 font-medium whitespace-nowrap">{cap.label}</span>
                        </div>
                        {i < activeCapabilities.length - 1 && (
                          <ChevronRight className="w-3 h-3 text-white/[0.08] flex-shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Example prompts */}
        <div>
          <div className="flex items-center justify-between mb-3 px-0.5">
            <p className="text-[11px] font-semibold text-white/20 uppercase tracking-widest">
              {selectedType ? `${BUSINESS_TYPES.find(t => t.id === selectedType)?.label} examples` : "Try an example"}
            </p>
            {selectedType && (
              <button
                onClick={() => setSelectedType(null)}
                className="text-[11px] text-white/18 hover:text-white/35 transition-colors"
              >
                See all →
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {activeExamples.map((example, i) => (
              <motion.button
                key={`${selectedType}-${i}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * i, duration: 0.3 }}
                onClick={() => handleExample(example.prompt)}
                className="text-left p-4 bg-white/[0.025] border border-white/[0.06] rounded-xl hover:bg-white/[0.045] hover:border-white/[0.1] transition-all duration-150 group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl leading-none mt-0.5 flex-shrink-0">{example.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[13px] font-semibold text-white/65 group-hover:text-white/85 transition-colors">
                        {example.title}
                      </span>
                      <ArrowRight className="w-3 h-3 text-white/18 group-hover:text-white/45 transition-all group-hover:translate-x-0.5 flex-shrink-0" />
                    </div>
                    <p className="text-[11px] text-white/25 leading-relaxed line-clamp-2 group-hover:text-white/40 transition-colors">
                      {example.prompt}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="absolute bottom-8 flex items-center gap-5"
      >
        <p className="text-[11px] text-white/15">
          Powered by AI · Your business in seconds · No coding required
        </p>
      </motion.div>
    </div>
  );
}
