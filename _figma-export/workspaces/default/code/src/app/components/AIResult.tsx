import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Check, Globe, Package, Workflow, ArrowRight, Sparkles, ExternalLink } from "lucide-react";

const products = [
  { id: 1, name: "Silver Minimalist Ring", price: "$89.00", stock: "42 in stock", bg: "from-slate-800/50 to-slate-900/60", accent: "bg-slate-500/15" },
  { id: 2, name: "Gold Vermeil Necklace", price: "$145.00", stock: "18 in stock", bg: "from-amber-900/25 to-stone-900/50", accent: "bg-amber-500/15" },
  { id: 3, name: "Pearl Drop Earrings", price: "$67.00", stock: "35 in stock", bg: "from-neutral-800/50 to-stone-900/60", accent: "bg-neutral-400/[0.08]" },
];

const generatedStats = [
  { icon: Globe, label: "Pages", value: "6" },
  { icon: Package, label: "Products", value: "12" },
  { icon: Workflow, label: "Automations", value: "4" },
];

export function AIResult() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#080808] text-white">

      {/* Top bar */}
      <div className="flex items-center justify-between px-8 h-16 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shadow-lg shadow-white/10">
            <span className="text-black font-bold text-xs tracking-tight">H</span>
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-white">Hevən OS</span>
        </div>
        <button
          onClick={() => navigate("/")}
          className="text-[12px] text-white/25 hover:text-white/50 transition-colors"
        >
          ← Start over
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-16">

        {/* Success badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center mb-8"
        >
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-emerald-400/[0.08] border border-emerald-400/[0.15] rounded-full">
            <div className="w-4 h-4 rounded-full bg-emerald-400 flex items-center justify-center flex-shrink-0">
              <Check className="w-2.5 h-2.5 text-black" strokeWidth={3} />
            </div>
            <span className="text-[12px] font-semibold text-emerald-400">Business generated successfully</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="text-center mb-12"
        >
          <h1 className="text-[42px] font-semibold tracking-tight text-white mb-3 leading-none">
            Luna Jewelry MX
          </h1>
          <p className="text-[15px] text-white/40 max-w-md mx-auto leading-relaxed">
            Minimalist jewelry handcrafted in Mexico — your complete business is ready to launch.
          </p>

          <div className="flex items-center justify-center gap-3 mt-8">
            {generatedStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-xl"
                >
                  <Icon className="w-3.5 h-3.5 text-white/30" />
                  <span className="text-[14px] font-semibold text-white">{stat.value}</span>
                  <span className="text-[12px] text-white/30">{stat.label}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Website Preview */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <div className="bg-white/[0.025] border border-white/[0.06] rounded-2xl overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-3 px-4 py-3 bg-white/[0.02] border-b border-white/[0.06]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="flex items-center gap-2 px-3 py-1 bg-white/[0.04] border border-white/[0.06] rounded-md">
                  <div className="w-2 h-2 rounded-full bg-emerald-400/50" />
                  <span className="text-[11px] text-white/30">lunajewelry.mx</span>
                </div>
              </div>
              <button className="flex items-center gap-1.5 text-[11px] text-white/20 hover:text-white/45 transition-colors">
                <ExternalLink className="w-3 h-3" />
                Preview
              </button>
            </div>

            {/* Website content */}
            <div className="bg-white text-black overflow-hidden">
              <div className="relative h-52 bg-gradient-to-br from-stone-50 to-gray-100 flex items-center justify-center">
                <div className="text-center px-10">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em] mb-2">Hecho en México</p>
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Luna Jewelry</h2>
                  <p className="text-gray-500 text-sm mb-5">Minimalist pieces, ethically made.</p>
                  <div className="flex items-center justify-center gap-3">
                    <button className="px-5 py-2 bg-gray-900 text-white rounded-lg text-xs font-semibold">Shop Collection</button>
                    <button className="px-5 py-2 border border-gray-200 text-gray-500 rounded-lg text-xs font-medium">Our Story</button>
                  </div>
                </div>
              </div>
              <div className="px-10 py-8 border-t border-gray-100">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-base font-bold tracking-tight">Featured Collection</h3>
                  <span className="text-xs text-gray-400 cursor-pointer hover:text-gray-600">View all →</span>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {["Silver Ring", "Gold Necklace", "Pearl Earrings", "Diamond Bracelet"].map((name, i) => (
                    <div key={i} className="group cursor-pointer">
                      <div className="aspect-square bg-gray-50 border border-gray-100 rounded-xl mb-2 flex items-center justify-center group-hover:bg-gray-100 transition-all">
                        <div className="w-8 h-8 rounded-full bg-gray-200 opacity-50" />
                      </div>
                      <div className="text-xs font-medium text-gray-800 mb-0.5">{name}</div>
                      <div className="text-xs text-gray-400">${[89, 145, 67, 198][i]}.00</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Generated Products */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-medium text-white/25 uppercase tracking-widest">Generated Products</span>
            <button className="text-[12px] text-white/25 hover:text-white/50 transition-colors flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Regenerate all
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.18 + i * 0.06 }}
                className="bg-white/[0.025] border border-white/[0.06] rounded-xl overflow-hidden hover:border-white/[0.1] transition-all duration-200 group"
              >
                <div className={`h-28 bg-gradient-to-br ${product.bg} flex items-center justify-center`}>
                  <div className={`w-14 h-14 rounded-2xl ${product.accent} flex items-center justify-center`}>
                    <Package className="w-6 h-6 text-white/15" />
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-[13px] font-medium text-white/70 mb-1.5 group-hover:text-white transition-colors">{product.name}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-semibold text-white">{product.price}</span>
                    <span className="text-[11px] text-white/25">{product.stock}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex flex-col items-center gap-4"
        >
          <button
            onClick={() => navigate("/app")}
            className="flex items-center gap-2.5 px-8 py-3.5 bg-white text-black rounded-xl text-[15px] font-semibold hover:bg-white/92 transition-all shadow-2xl shadow-white/10 group"
          >
            Continue to Dashboard
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={() => navigate("/")}
            className="text-[12px] text-white/20 hover:text-white/45 transition-colors"
          >
            Build a different business
          </button>
        </motion.div>
      </div>
    </div>
  );
}
