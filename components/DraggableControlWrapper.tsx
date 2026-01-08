import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GripHorizontal, ChevronDown, ChevronUp } from "lucide-react";

interface DraggableControlWrapperProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    icon?: React.ReactNode;
    style?: React.CSSProperties;
}

export const DraggableControlWrapper: React.FC<DraggableControlWrapperProps> = ({
    children,
    className = "",
    title = "Controls",
    icon,
    style
}) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Default centering if no style is provided
    const finalStyle = style || { x: "-50%", left: "50%", top: "1rem" };

    return (
        <motion.div
            drag
            dragMomentum={false}
            className={`absolute z-30 flex flex-col items-center bg-slate-900/90 backdrop-blur border border-white/10 rounded-lg shadow-2xl ${className}`}
            style={finalStyle}
        >
            {/* Header / Drag Handle */}
            <div className="w-full flex items-center justify-between px-2 py-1 bg-white/5 rounded-t-lg cursor-grab active:cursor-grabbing border-b border-white/5">
                <div className="flex items-center gap-2 text-slate-400">
                    {icon || <GripHorizontal size={14} />}
                    <span className="text-[10px] font-bold uppercase tracking-wider">{title}</span>
                </div>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1 hover:bg-white/10 rounded text-slate-400 transition-colors"
                >
                    {isCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                </button>
            </div>

            {/* Content */}
            <AnimatePresence initial={false}>
                {!isCollapsed && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-2">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
