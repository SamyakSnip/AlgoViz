import { AnimationStep } from "@/types";

export const rabinKarp = (text: string, pattern: string): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    if (!pattern || !text) return [];

    const n = text.length;
    const m = pattern.length;
    const d = 256; // Alphabet size
    const q = 101; // Prime number

    if (m > n) return [];

    let p = 0; // hash value for pattern
    let t = 0; // hash value for text window
    let h = 1;

    // The value of h would be "pow(d, m-1)%q"
    for (let i = 0; i < m - 1; i++) {
        h = (h * d) % q;
    }

    // Calculate the hash value of pattern and first window of text
    for (let i = 0; i < m; i++) {
        p = (d * p + pattern.charCodeAt(i)) % q;
        t = (d * t + text.charCodeAt(i)) % q;
    }

    // Initial Hash Visualization
    // We'll use auxiliaryArray[0] for Pattern Hash, auxiliaryArray[1] for Text Hash
    steps.push({ type: "updateAux", indices: [0], value: p });
    steps.push({ type: "updateAux", indices: [1], value: t });

    // Slide the pattern over text one by one
    for (let i = 0; i <= n - m; i++) {
        // Highlight current window
        steps.push({ type: "compare", indices: [i, 0] }); // Index 0 represents start of pattern relative to text index i

        // Compare Hash values
        // We can visualy highlight the hash boxes if we update StringSearchVisualizer

        if (p === t) {
            // Check for characters one by one
            let j = 0;
            let match = true;
            for (j = 0; j < m; j++) {
                steps.push({ type: "compare", indices: [i + j, j] }); // Text idx, Pattern idx
                if (text[i + j] !== pattern[j]) {
                    match = false;
                    steps.push({ type: "highlight", indices: [i + j], value: 2 }); // Mismatch
                    break;
                } else {
                    steps.push({ type: "highlight", indices: [i + j], value: 1 }); // Match
                }
            }

            if (match) {
                // Full match found
                const matchIndices = Array.from({ length: m }, (_, k) => i + k);
                steps.push({ type: "found", indices: matchIndices });
            }
        } else {
            // Hash mismatch, maybe highlight red?
            steps.push({ type: "highlight", indices: [i], value: 2 }); // Brief red to show mismatch at start of window
        }

        // Calculate hash value for next window of text: Remove leading digit, add trailing digit
        if (i < n - m) {
            t = (d * (t - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % q;

            // We might get negative value of t, converting it to positive
            if (t < 0) t = (t + q);

            steps.push({ type: "updateAux", indices: [1], value: t });
        }
    }

    return steps;
};
