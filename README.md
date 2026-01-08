# Algorithm Visualizer

A comprehensive, interactive web application for visualizing algorithms in real-time. Built with Next.js 14+, TypeScript, and Tailwind CSS.

## 🎯 Project Overview

This is a production-ready algorithm visualization platform that helps users understand how various algorithms work through animated, step-by-step execution. The application supports 30+ algorithms across multiple categories including sorting, pathfinding, graph algorithms, tree operations, and more.

### Key Features

- **Real-time Animation**: Step-by-step visualization with adjustable speed
- **Pseudocode Viewer**: Live code highlighting synced with animation
- **Activity Log**: Human-readable descriptions of each algorithm step
- **Interactive Controls**: Play, pause, reset, and speed adjustment
- **Multiple Algorithm Categories**: Sorting, pathfinding, graphs, trees, dynamic programming, etc.
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Theme**: Modern, professional UI with neon accents

---

## 🏗️ Architecture

### Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React Context API
- **Icons**: Lucide React

### Project Structure

```
algo/
├── app/                      # Next.js app directory
│   └── page.tsx             # Main application page
├── components/              # React components
│   ├── Header.tsx           # Top navigation with controls
│   ├── Sidebar.tsx          # Algorithm selection menu
│   ├── VisualizerCanvas.tsx # Main visualization area
│   ├── PseudocodeViewer.tsx # Code/activity log panel
│   ├── Grid.tsx             # Pathfinding grid
│   ├── GraphVisualizer.tsx  # Graph algorithm visualizer
│   ├── TreeVisualizer.tsx   # Tree structure visualizer
│   └── ...                  # Other specialized components
├── context/
│   └── VisualizerContext.tsx # Global state management
├── lib/
│   └── algorithms/          # Algorithm implementations
│       ├── sorting/         # Sorting algorithms
│       ├── pathfinding/     # Pathfinding algorithms
│       ├── graph/           # Graph algorithms
│       ├── tree/            # Tree algorithms
│       ├── algorithmRegistry.ts # Central algorithm dispatcher
│       ├── algoMetadata.ts  # Algorithm info & complexity
│       └── pseudocode.ts    # Pseudocode definitions
├── types/
│   └── index.ts             # TypeScript type definitions
└── README.md                # This file
```

---

## 📚 Implemented Algorithms

### Sorting Algorithms (10)
- **Bubble Sort** - O(n²) comparison-based
- **Selection Sort** - O(n²) selection-based
- **Insertion Sort** - O(n²) insertion-based
- **Merge Sort** - O(n log n) divide-and-conquer
- **Quick Sort** - O(n log n) average, partition-based
- **Heap Sort** - O(n log n) heap-based
- **Shell Sort** - O(n log n) gap-based
- **Counting Sort** - O(n+k) non-comparison
- **Radix Sort** - O(d(n+k)) digit-based
- **Bucket Sort** - O(n+k) distribution-based

### Pathfinding Algorithms (9)
- **Dijkstra's Algorithm** - Shortest path, weighted graphs
- **A* Search** - Heuristic-based shortest path
- **Breadth-First Search (BFS)** - Unweighted shortest path
- **Depth-First Search (DFS)** - Graph traversal
- **Greedy Best-First Search** - Heuristic-based
- **Bidirectional Search** - Two-way BFS
- **Jump Point Search (JPS)** - Optimized A* for grids
- **Bellman-Ford** - Handles negative weights
- **Floyd-Warshall** - All-pairs shortest path

### Graph Algorithms (5)
- **Prim's Algorithm** - Minimum Spanning Tree
- **Kruskal's Algorithm** - Minimum Spanning Tree
- **Connected Components** - Find graph components
- **Topological Sort** - DAG ordering
- **Strongly Connected Components (SCC)** - Tarjan's algorithm

### Tree Algorithms (2)
- **Binary Search Tree (BST)** - Insert, delete, traversal
- **AVL Tree** - Self-balancing BST with rotations

### Maze Generation (3)
- **Recursive Division** - Divide-and-conquer maze
- **Prim's Maze** - Randomized perfect maze
- **Binary Tree Maze** - Fast diagonal-biased maze

### Data Structures (3)
- **Stack** - LIFO operations
- **Queue** - FIFO operations
- **Linked List** - Node-based list

### String Algorithms (2)
- **KMP (Knuth-Morris-Pratt)** - Pattern matching
- **Rabin-Karp** - Hash-based pattern matching

### Dynamic Programming (3)
- **Longest Common Subsequence (LCS)**
- **Knapsack Problem** - 0/1 knapsack
- **Longest Increasing Subsequence (LIS)**

### Backtracking (2)
- **N-Queens Problem**
- **Sudoku Solver**

---

## 🎨 UI Components

### Header
- Algorithm controls (Play, Pause, Reset, Speed)
- Maze generation dropdown (for pathfinding)
- Graph generation button (for graph algorithms)
- Pseudocode toggle
- Legend dropdown
- Sidebar toggle

### Sidebar
- Categorized algorithm list
- Search/filter functionality
- Algorithm metadata on hover

### Visualizer Canvas
- **Array Visualizer**: Bar chart for sorting algorithms
- **Grid Visualizer**: 2D grid for pathfinding
- **Graph Visualizer**: Nodes and edges for graph algorithms
- **Tree Visualizer**: Hierarchical tree structure
- **DP Table**: Matrix visualization for DP problems

### Pseudocode Viewer
- **Code Tab**: Live pseudocode with line highlighting
- **Activity Log Tab**: Step-by-step textual descriptions
- Auto-scroll functionality
- Draggable panel

---

## 🔧 Core Systems

### Animation System

The application uses a step-based animation system:

1. **Step Generation**: Each algorithm generates an array of `AnimationStep` objects
2. **Step Types**: `compare`, `swap`, `overwrite`, `visit`, `path`, `wall`, `found`, etc.
3. **Step Execution**: Context iterates through steps with delays based on speed
4. **Visual Updates**: Each step triggers state updates that re-render components

```typescript
interface AnimationStep {
    type: string;
    indices: number[];
    value?: number;
    newArray?: number[];
    // ... other properties
}
```

### State Management

Global state managed via React Context (`VisualizerContext`):

- **Array State**: Current array being sorted
- **Grid State**: 2D grid for pathfinding
- **Graph State**: Nodes and edges for graph algorithms
- **Tree State**: Tree root for tree algorithms
- **Animation State**: Current step, playing status, speed
- **UI State**: Sidebar open, pseudocode open, etc.

### Algorithm Registry

Central dispatcher (`algorithmRegistry.ts`) that:
- Maps algorithm types to their implementations
- Generates animation steps for each algorithm
- Handles different input types (array, grid, graph, tree)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd algo

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Usage

1. **Select an Algorithm**: Click sidebar or use the menu
2. **Configure**: Adjust array size, grid size, or generate random data
3. **Visualize**: Click "Visualize" to start animation
4. **Control**: Use play/pause, adjust speed, or reset
5. **Learn**: View pseudocode and activity log in real-time

---

## 🎯 For AI Assistants

### Project Context

This is an educational algorithm visualization tool. When working on this project:

1. **Algorithm Implementations**: Located in `lib/algorithms/[category]/`
2. **Adding New Algorithms**: 
   - Create algorithm file with step generation
   - Add to `algorithmRegistry.ts`
   - Add metadata to `algoMetadata.ts`
   - Add pseudocode to `pseudocode.ts`
   - Add to sidebar in `Sidebar.tsx`
   - Add type to `types/index.ts`

3. **Animation Steps**: All algorithms must return `AnimationStep[]`
4. **State Updates**: Use context setters, never mutate state directly
5. **Styling**: Use Tailwind CSS classes, maintain dark theme
6. **Type Safety**: Maintain strict TypeScript typing

### Common Tasks

- **Bug Fixes**: Check `VisualizerContext.tsx` for animation issues
- **UI Changes**: Modify components in `components/`
- **Algorithm Updates**: Edit files in `lib/algorithms/`
- **New Features**: Update context, components, and types

### Code Patterns

```typescript
// Algorithm implementation pattern
export const algorithmName = (input: InputType): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    // Algorithm logic
    steps.push({ type: "compare", indices: [i, j] });
    // More steps
    return steps;
};
```

---

## 📝 Recent Updates

- ✅ Pseudocode Viewer with Activity Log
- ✅ AVL Tree with rotations
- ✅ Heap Sort algorithm
- ✅ Topological Sort
- ✅ Bellman-Ford & Floyd-Warshall pathfinding
- ✅ Multiple maze generation algorithms
- ✅ Graph visualizer infrastructure
- ✅ Enhanced UI with legend dropdown
- ✅ Wall interaction improvements
- ✅ Critical bug fixes (animation loop, maze generation)

---

## 🐛 Known Issues

- Graph algorithms (MST, SCC) need algorithm updates to work with new graph structure
- Heap operations visualization incomplete (core logic done, UI pending)
- Some pathfinding algorithms may have performance issues on large grids

---

## 🤝 Contributing

When contributing:
1. Maintain TypeScript strict mode
2. Follow existing code patterns
3. Add tests for new algorithms
4. Update documentation
5. Ensure responsive design

---

## 📄 License

[Add your license here]

---

## 🙏 Acknowledgments

Built with modern web technologies and best practices for algorithm education.
