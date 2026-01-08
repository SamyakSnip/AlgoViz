"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Code2, BookOpen, Terminal } from "lucide-react";
import { AlgorithmMetadata } from "@/lib/algorithms/algoMetadata";

interface AlgorithmInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    metadata: AlgorithmMetadata;
}

export const AlgorithmInfoModal: React.FC<AlgorithmInfoModalProps> = ({ isOpen, onClose, metadata }) => {
    const [activeTab, setActiveTab] = useState<"concept" | "cpp" | "js" | "python">("concept");

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" onClick={onClose} />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 m-auto z-[70] w-[90vw] md:w-[700px] h-[80vh] bg-[#0f1115] border border-white/10 rounded-xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5">
                            <div>
                                <h2 className="text-xl font-bold text-white mb-1">{metadata.name}</h2>
                                <div className="flex gap-2">
                                    <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-mono border border-blue-500/30">
                                        Time: {metadata.complexity.time}
                                    </span>
                                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-mono border border-purple-500/30">
                                        Space: {metadata.complexity.space}
                                    </span>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-white/5 bg-black/20 px-6">
                            <TabButton
                                icon={<BookOpen size={14} />}
                                label="Concept"
                                isActive={activeTab === "concept"}
                                onClick={() => setActiveTab("concept")}
                            />
                            <TabButton
                                icon={<Code2 size={14} />}
                                label="C++"
                                isActive={activeTab === "cpp"}
                                onClick={() => setActiveTab("cpp")}
                            />
                            <TabButton
                                icon={<Terminal size={14} />}
                                label="JavaScript"
                                isActive={activeTab === "js"}
                                onClick={() => setActiveTab("js")}
                            />
                            <TabButton
                                icon={<Terminal size={14} />}
                                label="Python"
                                isActive={activeTab === "python"}
                                onClick={() => setActiveTab("python")}
                            />
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-[#0a0a0b]">
                            {activeTab === "concept" ? (
                                <div className="prose prose-invert max-w-none">
                                    <p className="text-slate-300 leading-relaxed text-sm">
                                        {metadata.learnMore}
                                    </p>
                                    <div className="mt-6 p-4 rounded-lg bg-blue-900/10 border border-blue-500/10">
                                        <h4 className="text-blue-400 font-bold text-xs mb-2 uppercase tracking-wider">Verification</h4>
                                        <p className="text-slate-400 text-xs">
                                            This algorithm is visualized interactively. You can adjust the speed, pause, and step through the execution to clarify your understanding.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <CodeBlock code={metadata.code[activeTab]} language={activeTab} />
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

// Helper Components

const TabButton = ({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-3 text-xs font-medium border-b-2 transition-colors ${isActive
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:border-white/10"
            }`}
    >
        {icon}
        {label}
    </button>
);

const CodeBlock = ({ code, language }: { code: string, language: string }) => (
    <div className="relative">
        <pre className="font-mono text-sm bg-black/30 p-4 rounded-lg border border-white/5 overflow-x-auto">
            <code className="text-slate-300">
                {code}
            </code>
        </pre>
        <span className="absolute top-2 right-2 text-[10px] text-slate-500 uppercase font-bold px-2 py-1 bg-white/5 rounded">
            {language}
        </span>
    </div>
);
