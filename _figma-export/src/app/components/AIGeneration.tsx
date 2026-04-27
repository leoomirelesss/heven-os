import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Check } from "lucide-react";

const steps = [
  { id: 1, name: "Generating brand identity", detail: "Logo, colors, and typography", duration: 2000 },
  { id: 2, name: "Creating pages", detail: "Home, Products, About, Contact", duration: 2500 },
  { id: 3, name: "Setting up products", detail: "Catalog, inventory, pricing", duration: 2000 },
  { id: 4, name: "Configuring automations", detail: "Welcome emails, cart recovery", duration: 1500 },
];

export function AIGeneration() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, steps[currentStep].duration);
      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(() => {
        navigate("/generated");
      }, 800);
      return () => clearTimeout(finalTimer);
    }
  }, [currentStep, navigate]);

  const progress = Math.min((currentStep / steps.length) * 100, 100);

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col items-center justify-center px-6">
      {/* Subtle bg glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-white/[0.015] blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-lg relative"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-14">
          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-xl shadow-white/10">
            <span className="text-black font-bold text-sm">H</span>
          </div>
          <span className="text-xl font-semibold tracking-tight">Hevən OS</span>
        </div>

        {/* Status text */}
        <div className="text-center mb-8">
          <motion.p
            key={currentStep}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[13px] text-white/35"
          >
            {currentStep < steps.length ? "Building your business — this takes about 10 seconds" : "Almost ready..."}
          </motion.p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-white/25 font-medium">{currentStep} of {steps.length} tasks</span>
            <span className="text-[11px] text-white/25 font-medium tabular-nums">{Math.round(progress)}%</span>
          </div>
          <div className="h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-2">
          {steps.map((step, index) => {
            const isComplete = index < currentStep;
            const isCurrent = index === currentStep;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl border transition-all duration-300 ${
                  isCurrent
                    ? "bg-white/[0.06] border-white/[0.12]"
                    : isComplete
                    ? "bg-white/[0.02] border-white/[0.05]"
                    : "bg-transparent border-white/[0.03]"
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    isComplete
                      ? "bg-white"
                      : isCurrent
                      ? "bg-white/10 border border-white/20"
                      : "bg-white/[0.04] border border-white/[0.06]"
                  }`}
                >
                  {isComplete ? (
                    <Check className="w-3.5 h-3.5 text-black" strokeWidth={2.5} />
                  ) : isCurrent ? (
                    <motion.div
                      className="w-2 h-2 rounded-full bg-white"
                      animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  ) : (
                    <span className="text-[10px] text-white/20 font-medium">{step.id}</span>
                  )}
                </div>

                {/* Text */}
                <div className="flex-1">
                  <div
                    className={`text-[13px] font-medium leading-tight transition-all duration-300 ${
                      isCurrent ? "text-white" : isComplete ? "text-white/45" : "text-white/20"
                    }`}
                  >
                    {step.name}
                  </div>
                  <div
                    className={`text-[11px] leading-tight mt-0.5 transition-all duration-300 ${
                      isCurrent ? "text-white/40" : isComplete ? "text-white/20" : "text-white/12"
                    }`}
                  >
                    {step.detail}
                  </div>
                </div>

                {isComplete && (
                  <span className="text-[11px] text-emerald-400/70 font-medium">Done</span>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}