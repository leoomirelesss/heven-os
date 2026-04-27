import { useState } from "react";
import { Monitor, Smartphone, Eye, Edit3, Image, Type, Layout, Plus, ChevronUp, ChevronDown } from "lucide-react";

export function StoreBuilder() {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [selectedSection, setSelectedSection] = useState<string | null>("hero");

  const sections = [
    { id: "hero", name: "Hero Section", type: "hero" },
    { id: "products", name: "Products", type: "products" },
    { id: "testimonials", name: "Testimonials", type: "testimonials" },
  ];

  return (
    <div className="flex h-full">
      {/* Left Panel */}
      <div className="w-[240px] border-r border-white/[0.07] flex flex-col flex-shrink-0">
        {/* Panel Header */}
        <div className="p-4 border-b border-white/[0.07]">
          <h2 className="text-[14px] font-semibold text-white mb-0.5">Store Builder</h2>
          <p className="text-[11px] text-white/35">Customize your website</p>
        </div>

        {/* View Mode */}
        <div className="p-3 border-b border-white/[0.07]">
          <div className="flex gap-1 p-1 bg-white/[0.04] border border-white/[0.07] rounded-lg">
            <button
              onClick={() => setViewMode("desktop")}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium transition-all ${
                viewMode === "desktop" ? "bg-white text-black shadow-sm" : "text-white/40 hover:text-white/60"
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              Desktop
            </button>
            <button
              onClick={() => setViewMode("mobile")}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium transition-all ${
                viewMode === "mobile" ? "bg-white text-black shadow-sm" : "text-white/40 hover:text-white/60"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              Mobile
            </button>
          </div>
        </div>

        {/* Sections */}
        <div className="p-3 flex-1 overflow-auto">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[11px] font-semibold text-white/25 uppercase tracking-widest">Sections</span>
            <button className="w-5 h-5 rounded-md bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center transition-all">
              <Plus className="w-3 h-3 text-white/40" />
            </button>
          </div>
          <div className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setSelectedSection(section.id === selectedSection ? null : section.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-all duration-150 ${
                  selectedSection === section.id
                    ? "bg-white/[0.08] border border-white/[0.12] text-white"
                    : "bg-white/[0.02] border border-white/[0.04] text-white/50 hover:bg-white/[0.05] hover:text-white/70"
                }`}
              >
                <Layout className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="text-[12px] font-medium flex-1">{section.name}</span>
                {selectedSection === section.id ? (
                  <ChevronUp className="w-3 h-3 text-white/30" />
                ) : (
                  <ChevronDown className="w-3 h-3 text-white/20" />
                )}
              </button>
            ))}
          </div>

          {/* Edit Options */}
          {selectedSection && (
            <div className="mt-4 pt-4 border-t border-white/[0.07]">
              <span className="text-[11px] font-semibold text-white/25 uppercase tracking-widest mb-2 block px-1">Edit Section</span>
              <div className="space-y-1">
                {[
                  { icon: Type, label: "Edit Text" },
                  { icon: Image, label: "Change Images" },
                  { icon: Layout, label: "Layout Settings" },
                ].map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 bg-white/[0.02] border border-white/[0.04] rounded-lg hover:bg-white/[0.06] hover:border-white/[0.08] transition-all duration-150"
                  >
                    <Icon className="w-3.5 h-3.5 text-white/30" />
                    <span className="text-[12px] text-white/50 hover:text-white/70">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 bg-[#060606] p-6 overflow-auto flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            </div>
            <div className="px-3 py-1 bg-white/[0.04] border border-white/[0.07] rounded-md text-[11px] text-white/30">
              hevenstore.com/preview
            </div>
          </div>
          <button className="flex items-center gap-2 px-3.5 py-2 bg-white text-black rounded-lg text-[12px] font-semibold hover:bg-white/90 transition-all shadow-lg shadow-white/10">
            <Eye className="w-3.5 h-3.5" />
            Publish
          </button>
        </div>

        {/* Preview Container */}
        <div className="flex-1 flex items-start justify-center">
          <div
            className={`bg-white text-black rounded-xl overflow-hidden shadow-2xl shadow-black/50 transition-all duration-300 ${
              viewMode === "desktop" ? "w-full max-w-3xl" : "w-80"
            }`}
          >
            {/* Hero */}
            <div className="relative h-72 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
              <div className="text-center px-10">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Handcrafted in Mexico</p>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">Minimalist Jewelry</h1>
                <p className="text-gray-500 mb-6 text-sm">Timeless pieces, ethically made.</p>
                <button className="px-6 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-all">
                  Shop Collection
                </button>
              </div>
            </div>

            {/* Products */}
            <div className="p-10 bg-white">
              <h2 className="text-xl font-bold mb-6 text-center tracking-tight">Featured Products</h2>
              <div className={`grid gap-5 ${viewMode === "desktop" ? "grid-cols-3" : "grid-cols-2"}`}>
                {["Silver Ring", "Gold Necklace", "Pearl Earrings"].slice(0, viewMode === "desktop" ? 3 : 2).map((name, i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className="aspect-square bg-gray-50 rounded-xl mb-3 group-hover:bg-gray-100 transition-all border border-gray-100 overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-gray-200 opacity-60" />
                      </div>
                    </div>
                    <h3 className="text-sm font-medium text-gray-800 mb-0.5">{name}</h3>
                    <p className="text-sm text-gray-500">$89.00</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="p-10 bg-gray-50 border-t border-gray-100">
              <h2 className="text-xl font-bold mb-6 text-center tracking-tight">Customer Love</h2>
              <div className={`grid gap-4 ${viewMode === "desktop" ? "grid-cols-2" : "grid-cols-1"}`}>
                {[1, 2].slice(0, viewMode === "desktop" ? 2 : 1).map((i) => (
                  <div key={i} className="p-5 bg-white rounded-xl border border-gray-100">
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(5)].map((_, s) => (
                        <span key={s} className="text-amber-400 text-xs">★</span>
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      "Beautiful craftsmanship and attention to detail. Absolutely love my new pieces!"
                    </p>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-gray-200 rounded-full" />
                      <div>
                        <div className="text-sm font-medium text-gray-800">Customer Name</div>
                        <div className="text-xs text-gray-400">Verified Buyer</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}