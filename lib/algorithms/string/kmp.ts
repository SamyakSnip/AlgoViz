import { AnimationStep } from "@/types";

export const kmp = (text: string, pattern: string): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    if (!pattern || !text) return [];

    const n = text.length;
    const m = pattern.length;

    // === PHASE 1: LPS Construction ===
    // We visualize this using the auxiliary array
    const lps: number[] = new Array(m).fill(0);

    // Initial display of empty LPS
    // We can use 'updateAux' to show LPS values filling up.
    // However, the auxiliary array view in VisualizerCanvas is currently designed for sorting (bars).
    // For String Search, we'll need a different view or adapt usage.
    // Let's assume KMP uses a "StringSearchVisualizer" component that interprets 'updateAux' as updating the LPS table display.

    let length = 0; // length of the previous longest prefix suffix
    let i = 1;

    // Highlight start of LPS build
    steps.push({ type: "updateAux", indices: [0], value: 0 });

    while (i < m) {
        // Highlight comparison in pattern
        steps.push({ type: "compare", indices: [i, length], value: -1 }); // Special value -1 to indicate Pattern-Pattern compare? Or just use context?
        // Actually, for KMP we compare pattern[i] and pattern[length].
        // If we use 'compare', the visualizer needs to know we are comparing inside the pattern.
        // Let's use specific indices. 
        // We might need to handle this in the component: if indices are < m, it's pattern check? 
        // Or we add metadata. 
        // For simplicity, we'll just emit steps and let the specialized component handle visualization logic.

        if (pattern[i] === pattern[length]) {
            length++;
            lps[i] = length;
            steps.push({ type: "updateAux", indices: [i], value: length });
            i++;
        } else {
            if (length !== 0) {
                length = lps[length - 1];
                // Visualizer: Highlight jump back in LPS
            } else {
                lps[i] = 0;
                steps.push({ type: "updateAux", indices: [i], value: 0 });
                i++;
            }
        }
    }

    // === PHASE 2: Search ===
    let iText = 0; // index for text
    let jPattern = 0; // index for pattern

    while (iText < n) {
        // Highlight comparison: Text[iText] vs Pattern[jPattern]
        // We need to differentiate Text Index vs Pattern Index in visualization.
        // Let's use indices: [iText, jPattern]
        // The component will interpret index 0 as text, index 1 as pattern.
        steps.push({ type: "compare", indices: [iText, jPattern] });

        if (pattern[jPattern] === text[iText]) {
            // Match
            steps.push({ type: "highlight", indices: [iText], value: 1 }); // 1 = Match Green

            jPattern++;
            iText++;
        }

        if (jPattern === m) {
            // Full Match Found
            // Highlight result range
            const matchStart = iText - jPattern;
            const matchIndices = Array.from({ length: m }, (_, k) => matchStart + k);
            steps.push({ type: "found", indices: matchIndices });

            jPattern = lps[jPattern - 1];
        } else if (iText < n && pattern[jPattern] !== text[iText]) {
            // Mismatch
            steps.push({ type: "highlight", indices: [iText], value: 2 }); // 2 = Mismatch Red

            if (jPattern !== 0) {
                jPattern = lps[jPattern - 1];
            } else {
                iText++;
            }
        }
    }

    return steps;
};
