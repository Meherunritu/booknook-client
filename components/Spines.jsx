"use client";
import { motion, useReducedMotion } from "framer-motion";

// A shelf of book spines that rises into place: the one memorable moment of the hero.
export default function Spines({ colors }) {
  const reduce = useReducedMotion();
  const heights = [62, 80, 70, 92, 66, 86, 74, 96, 68, 84, 72];
  const widths = [26, 34, 30, 38, 28, 36, 32, 40, 30, 34, 28];

  return (
    <div className="hidden md:block" aria-hidden="true">
      <div className="flex items-end gap-1.5">
        {heights.map((h, i) => (
          <motion.div
            key={i}
            style={{ height: `${h * 2.4}px`, width: `${widths[i]}px`, background: colors[i % colors.length], transformOrigin: "bottom" }}
            className="relative rounded-t-sm shadow-md"
            initial={reduce ? false : { scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.6, delay: 0.12 * i, ease: "easeOut" }}
          >
            <span className="absolute inset-x-1 top-3 h-0.5 bg-black/25" />
            <span className="absolute inset-x-1 top-5 h-0.5 bg-black/25" />
            <span className="absolute inset-x-1 bottom-4 h-5 border-y border-black/25" />
          </motion.div>
        ))}
      </div>
      <div className="h-2 rounded-sm bg-black/30" />
    </div>
  );
}
