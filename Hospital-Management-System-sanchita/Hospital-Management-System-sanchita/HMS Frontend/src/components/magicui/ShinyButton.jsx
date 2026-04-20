import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const ShinyButton = ({
  children,
  className,
  ...props
}) => {
  return (
    <motion.button
      {...props}
      initial={{ "--x": "100%", scale: 1 }}
      animate={{ "--x": "-100%" }}
      whileTap={{ scale: 0.95 }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 1,
        type: "spring",
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: {
          type: "spring",
          stiffness: 200,
          damping: 5,
          mass: 0.5,
        },
      }}
      className={cn(
        "relative rounded-xl px-6 py-2.5 font-bold backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow-dark-spread uppercase tracking-widest text-sm",
        "bg-[linear-gradient(110deg,#0d9488,45%,#2dd4bf,55%,#0d9488)] bg-[length:200%_100%] text-white shadow-[0_0_20px_rgba(20,184,166,0.2)]",
        "animate-shine",
        className
      )}
      style={{
        "--duration": "2s",
      }}
    >
      <span
        className="relative block h-full w-full uppercase tracking-tighter text-white"
        style={{
          maskImage:
            "linear-gradient(-75deg,rgba(0,0,0,0.6) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),rgba(0,0,0,1) calc(var(--x) + 100%))",
        }}
      >
        {children}
      </span>
      <span
        style={{
          mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          maskComposite: "exclude",
        }}
        className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,rgba(20,184,166,0.1)_calc(var(--x)+20%),rgba(20,184,166,0.5)_calc(var(--x)+25%),rgba(20,184,166,0.1)_calc(var(--x)+100%))] p-px"
      ></span>
    </motion.button>
  );
};

export default ShinyButton;
