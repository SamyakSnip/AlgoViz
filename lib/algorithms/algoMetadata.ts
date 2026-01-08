import { AlgorithmType } from "@/types";

export interface AlgorithmMetadata {
    name: string;
    description: string;
    complexity: {
        time: string;
        space: string;
    };
    category: string;
    learnMore: string;
    code: {
        cpp: string;
        js: string;
        python: string;
    };
}

const placeholderCode = (lang: string) => `// ${lang} implementation coming soon...`;

export const ALGORITHM_METADATA: Record<AlgorithmType, AlgorithmMetadata> = {
    // Sorting
    BUBBLE: {
        name: "Bubble Sort",
        description: "A simple sorting algorithm that repeatedly swaps adjacent elements if they are in the wrong order.",
        complexity: { time: "O(n²)", space: "O(1)" },
        category: "Sorting",
        learnMore: "Bubble Sort works by repeatedly stepping through the list, comparing each pair of adjacent items and swapping them if they are in the wrong order. The pass through the list is repeated until no swaps are needed, which indicates that the list is sorted. It is named for the way smaller or larger elements 'bubble' to the top of the list.",
        code: {
            cpp: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1])
                swap(arr[j], arr[j+1]);
        }
    }
}`,
            js: `function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n-1; i++) {
        for (let j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
            }
        }
    }
    return arr;
}`,
            python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]`
        }
    },
    SELECTION: {
        name: "Selection Sort",
        description: "Divides list into sorted and unsorted parts, repeatedly selecting the smallest element.",
        complexity: { time: "O(n²)", space: "O(1)" },
        category: "Sorting",
        learnMore: "Selection Sort works by dividing the input list into two parts: the sublist of items already sorted and the sublist of items remaining to be sorted. Initially, the sorted sublist is empty and the unsorted sublist is the entire input list. The algorithm proceeds by finding the smallest (or largest) element in the unsorted sublist, exchanging it with the leftmost unsorted element, and moving the sublist boundaries one element to the right.",
        code: {
            cpp: placeholderCode("C++"),
            js: placeholderCode("JS"),
            python: placeholderCode("Python")
        }
    },
    INSERTION: {
        name: "Insertion Sort",
        description: "Builds the final sorted array one item at a time.",
        complexity: { time: "O(n²)", space: "O(1)" },
        category: "Sorting",
        learnMore: "Insertion sort iterates, consuming one input element each repetition, and growing a sorted output list. At each iteration, insertion sort removes one element from the input data, finds the location it belongs within the sorted list, and inserts it there. It repeats until no input elements remain.",
        code: {
            cpp: placeholderCode("C++"),
            js: placeholderCode("JS"),
            python: placeholderCode("Python")
        }
    },
    MERGE: {
        name: "Merge Sort",
        description: "A divide and conquer algorithm that splits the array, sorts the parts, and merges them.",
        complexity: { time: "O(n log n)", space: "O(n)" },
        category: "Sorting",
        learnMore: "Merge Sort is an efficient, stable sorting algorithm. It works by dividing the unsorted list into n sublists, each containing one element (a list of one element is considered sorted), and then repeatedly merging sublists to produce new sorted sublists until there is only one sublist remaining.",
        code: {
            cpp: `void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    int L[n1], R[n2];
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    // Merge...
}`,
            js: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}`,
            python: `def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr)//2
        L = arr[:mid]
        R = arr[mid:]
        merge_sort(L)
        merge_sort(R)
        # Merge logic...`
        }
    },
    QUICK: {
        name: "Quick Sort",
        description: "Partitions the array into two sub-arrays around a pivot, then recursively sorts them.",
        complexity: { time: "O(n log n)", space: "O(log n)" },
        category: "Sorting",
        learnMore: "Quicksort is a divide-and-conquer algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively.",
        code: {
            cpp: placeholderCode("C++"),
            js: placeholderCode("JavaScript"),
            python: placeholderCode("Python")
        }
    },
    HEAP: {
        name: "Heap Sort",
        description: "Converts the array into a heap structure, then repeatedly extracts the max element.",
        complexity: { time: "O(n log n)", space: "O(1)" },
        category: "Sorting",
        learnMore: "Heapsort involves preparing the list by first turning it into a Max Heap. The algorithm then repeatedly swaps the first (largest) element with the last element and reduces the heap size by one, sifthing the new first element down to its proper position.",
        code: {
            cpp: `void heapify(int arr[], int n, int i) {
    int largest = i;
    int l = 2 * i + 1;
    int r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}`,
            js: `function heapSort(arr) {
    // Helper heapify...
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
        heapify(arr, arr.length, i);
    }
    for (let i = arr.length - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }
    return arr;
}`,
            python: `def heapify(arr, n, i):
    largest = i
    l = 2 * i + 1
    r = 2 * i + 2
    if l < n and arr[l] > arr[largest]: largest = l
    if r < n and arr[r] > arr[largest]: largest = r
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heapSort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1): heapify(arr, n, i)
    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)`
        }
    },
    SHELL: {
        name: "Shell Sort",
        description: "An optimization of insertion sort that exchanges far-apart elements.",
        complexity: { time: "O(n log² n)", space: "O(1)" },
        category: "Sorting",
        learnMore: "Shell Sort improves upon insertion sort by exchanging elements that are far apart. The method starts by sorting pairs of elements far apart from each other, then progressively reducing the gap between elements to be compared.",
        code: {
            cpp: placeholderCode("C++"),
            js: placeholderCode("JavaScript"),
            python: placeholderCode("Python")
        }
    },
    COUNTING: {
        name: "Counting Sort",
        description: "Sorts integers by counting the occurrence of each unique value.",
        complexity: { time: "O(n + k)", space: "O(k)" },
        category: "Sorting",
        learnMore: "Counting sort is an integer sorting algorithm. It operates by counting the number of objects that have each distinct key value, and using arithmetic on those counts to determine the positions of each key value in the output sequence.",
        code: {
            cpp: placeholderCode("C++"),
            js: placeholderCode("JavaScript"),
            python: placeholderCode("Python")
        }
    },
    RADIX: {
        name: "Radix Sort",
        description: "Sorts numbers digit by digit from least to most significant.",
        complexity: { time: "O(nk)", space: "O(n + k)" },
        category: "Sorting",
        learnMore: "Radix sort avoids comparison by creating and distributing elements into buckets according to their radix. For elements with more than one significant digit, this bucketing process is repeated for each digit.",
        code: {
            cpp: placeholderCode("C++"),
            js: placeholderCode("JavaScript"),
            python: placeholderCode("Python")
        }
    },
    BUCKET: {
        name: "Bucket Sort",
        description: "Distributes elements into buckets, then sorts each bucket individually.",
        complexity: { time: "O(n + k)", space: "O(n)" },
        category: "Sorting",
        learnMore: "Bucket sort works by distributing the elements of an array into a number of buckets. Each bucket is then sorted individually, either using a different sorting algorithm, or by recursively applying the bucket sorting algorithm.",
        code: {
            cpp: placeholderCode("C++"),
            js: placeholderCode("JavaScript"),
            python: placeholderCode("Python")
        }
    },

    // Pathfinding
    DIJKSTRA: {
        name: "Dijkstra's Algorithm",
        description: "Finds shortest paths from a source to all other nodes in a weighted graph.",
        complexity: { time: "O(E + V log V)", space: "O(V)" },
        category: "Pathfinding",
        learnMore: "Dijkstra's algorithm is an algorithm for finding the shortest paths between nodes in a graph. It maintains a set of unvisited nodes and calculates tentative distance values for every node. It always selects the unvisited node with the smallest tentative distance.",
        code: {
            cpp: `// Standard Dijkstra using Priority Queue
void dijkstra(int src) {
    priority_queue<pii, vector<pii>, greater<pii>> pq;
    pq.push({0, src});
    dist[src] = 0;
    while(!pq.empty()) {
        int u = pq.top().second;
        pq.pop();
        for(auto x : adj[u]) {
            int v = x.first;
            int weight = x.second;
            if(dist[v] > dist[u] + weight) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
}`,
            js: `function dijkstra(graph, start) {
  // Using a Min Priority Queue...
  // Initial implementation logic would be here
}`,
            python: `import heapq
def dijkstra(graph, start):
    pq = [(0, start)]
    dist = {start: 0}
    while pq:
        d, u = heapq.heappop(pq)
        for v, weight in graph[u]:
            if dist.get(v, float('inf')) > d + weight:
                dist[v] = d + weight
                heapq.heappush(pq, (dist[v], v))`
        }
    },
    ASTAR: {
        name: "A* Search",
        description: "An informed search algorithm using heuristics to find the shortest path faster.",
        complexity: { time: "O(E)", space: "O(V)" },
        category: "Pathfinding",
        learnMore: "A* is an informed search algorithm, meaning it is formulated in terms of weighted graphs: starting from a specific starting node of a graph, it aims to find a path to the given goal node having the smallest cost. It uses a distance-plus-cost heuristic function (f(n) = g(n) + h(n)) to determine the order in which the search visits nodes.",
        code: {
            cpp: placeholderCode("C++"),
            js: placeholderCode("JavaScript"),
            python: placeholderCode("Python")
        }
    },
    BFS: {
        name: "Breadth-First Search",
        description: "Explores all neighbor nodes at the present depth before moving to the next depth level.",
        complexity: { time: "O(V + E)", space: "O(V)" },
        category: "Pathfinding",
        learnMore: "BFS is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root (or some arbitrary node of a graph, sometimes referred to as a 'search key'), and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.",
        code: {
            cpp: `void BFS(int start) {
    queue<int> q;
    q.push(start);
    visited[start] = true;
    while(!q.empty()) {
        int u = q.front(); q.pop();
        for(int v : adj[u]) {
            if(!visited[v]) {
                 visited[v] = true;
                 q.push(v);
            }
        }
    }
}`,
            js: `function bfs(startNode) {
    let queue = [startNode];
    let visited = new Set();
    visited.add(startNode);
    while (queue.length > 0) {
        let node = queue.shift();
        // process node
        for (let neighbor of getNeighbors(node)) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
}`,
            python: `def bfs(graph, start):
    visited = set()
    queue = [start]
    visited.add(start)
    while queue:
        vertex = queue.pop(0)
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)`
        }
    },
    DFS: {
        name: "Depth-First Search",
        description: "Explores as far as possible along each branch before backtracking.",
        complexity: { time: "O(V + E)", space: "O(V)" },
        category: "Pathfinding",
        learnMore: "DFS is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node (selecting some arbitrary node as the root node in the case of a graph) and explores as far as possible along each branch before backtracking.",
        code: {
            cpp: `void DFS(int u) {
    visited[u] = true;
    for(int v : adj[u]) {
        if(!visited[v]) DFS(v);
    }
}`,
            js: `function dfs(node, visited) {
    visited.add(node);
    for (let neighbor of getNeighbors(node)) {
        if (!visited.has(neighbor)) {
            dfs(neighbor, visited);
        }
    }
}`,
            python: `def dfs(graph, start, visited=None):
    if visited is None: visited = set()
    visited.add(start)
    for next in graph[start] - visited:
        dfs(graph, next, visited)`
        }
    },
    GREEDY_BFS: {
        name: "Greedy Best-First Search",
        description: "Expands the most promising node according to a heuristic.",
        complexity: { time: "O(b^d)", space: "O(b^d)" },
        category: "Pathfinding",
        learnMore: "Greedy Best-First Search tries to expand the node that is closest to the goal, on the grounds that this is likely to lead to a solution quickly. It evaluates nodes by using just the heuristic function; that is, f(n) = h(n).",
        code: {
            cpp: placeholderCode("C++"),
            js: placeholderCode("JavaScript"),
            python: placeholderCode("Python")
        }
    },
    BIDIRECTIONAL: {
        name: "Bidirectional Search",
        description: "Searches from both start and goal simultaneously.",
        complexity: { time: "O(b^(d/2))", space: "O(b^(d/2))" },
        category: "Pathfinding",
        learnMore: "Bidirectional search is a graph search algorithm that finds a shortest path from an initial vertex to a goal vertex in a directed graph. It runs two simultaneous searches: one forward from the initial state, and one backward from the goal, stopping when the two meet.",
        code: {
            cpp: placeholderCode("C++"),
            js: placeholderCode("JavaScript"),
            python: placeholderCode("Python")
        }
    },
    JPS: {
        name: "Jump Point Search",
        description: "Optimized A* for uniform grids that prunes symmetric paths.",
        complexity: { time: "O(E)", space: "O(V)" },
        category: "Pathfinding",
        learnMore: "Jump Point Search (JPS) is an optimization to the A* search algorithm for uniform-cost grids. It reduces symmetries in the search procedure by means of graph pruning, eliminating certain nodes from the open set and effectively 'jumping' over many nodes.",
        code: {
            cpp: placeholderCode("C++"),
            js: placeholderCode("JavaScript"),
            python: placeholderCode("Python")
        }
    },

    // Searching
    LINEAR: {
        name: "Linear Search",
        description: "Sequentially checks each element.",
        complexity: { time: "O(n)", space: "O(1)" },
        category: "Searching",
        learnMore: "Linear search is a method for finding an element within a list. It sequentially checks each element of the list until a match is found or the whole list has been searched.",
        code: {
            cpp: placeholderCode("C++"),
            js: placeholderCode("JavaScript"),
            python: placeholderCode("Python")
        }
    },
    BINARY: {
        name: "Binary Search",
        description: "Repeatedly divides the search interval in half. Requires sorted array.",
        complexity: { time: "O(log n)", space: "O(1)" },
        category: "Searching",
        learnMore: "Binary search compares the target value to the middle element of the array. If they are not equal, the half in which the target cannot lie is eliminated and the search continues on the remaining half, again taking the middle element to compare to the target value.",
        code: {
            cpp: placeholderCode("C++"),
            js: placeholderCode("JavaScript"),
            python: placeholderCode("Python")
        }
    },

    // Graph (MST / General)
    PRIMS: {
        name: "Prim's Algorithm",
        description: "Builds a Minimum Spanning Tree from a starting vertex.",
        complexity: { time: "O(E log V)", space: "O(V)" },
        category: "MST",
        learnMore: "Prim's algorithm is a greedy algorithm that finds a minimum spanning tree for a weighted undirected graph. It operates by building this tree one vertex at a time, from an arbitrary starting vertex, at each step adding the cheapest possible connection from the tree to another vertex.",
        code: {
            cpp: placeholderCode("C++"),
            js: placeholderCode("JavaScript"),
            python: placeholderCode("Python")
        }
    },
    KRUSKALS: {
        name: "Kruskal's Algorithm",
        description: "Builds a MST by adding edges in increasing order of weight.",
        complexity: { time: "O(E log E)", space: "O(V)" },
        category: "MST",
        learnMore: "Kruskal's algorithm finds a minimum spanning forest of an undirected edge-weighted graph. If the graph is connected, it finds a minimum spanning tree. It is a greedy algorithm that sorts edges by weight and adds them if they don't form a cycle.",
        code: {
            cpp: placeholderCode("C++"),
            js: placeholderCode("JavaScript"),
            python: placeholderCode("Python")
        }
    },
    CONNECTED_COMPONENTS: {
        name: "Connected Components",
        description: "Finds all connected subgraphs in an undirected graph.",
        complexity: { time: "O(V + E)", space: "O(V)" },
        category: "Graph",
        learnMore: "In graph theory, a connected component (or just component) of an undirected graph is a subgraph in which any two vertices are connected to each other by paths, and which is connected to no additional vertices in the supergraph.",
        code: {
            cpp: placeholderCode("C++"),
            js: placeholderCode("JavaScript"),
            python: placeholderCode("Python")
        }
    },
    SCC: {
        name: "Strongly Connected Components",
        description: "Finds subgraphs where every vertex is reachable from every other vertex.",
        complexity: { time: "O(V + E)", space: "O(V)" },
        category: "Graph",
        learnMore: "A strongly connected component of a directed graph is a maximal set of vertices such that for every pair of vertices u and v, there is a directed path from u to v and a directed path from v to u.",
        code: {
            cpp: placeholderCode("C++"),
            js: placeholderCode("JavaScript"),
            python: placeholderCode("Python")
        }
    },

    // Backtracking
    NQUEENS: {
        name: "N-Queens",
        description: "Places N queens on an NxN board so no two threaten each other.",
        complexity: { time: "O(N!)", space: "O(N)" },
        category: "Backtracking",
        learnMore: "The N-Queens puzzle is the problem of placing N chess queens on an N×N chessboard so that no two queens threaten each other. Thus, a solution requires that no two queens share the same row, column, or diagonal.",
        code: {
            cpp: placeholderCode("C++"),
            js: placeholderCode("JavaScript"),
            python: placeholderCode("Python")
        }
    },
    SUDOKU: {
        name: "Sudoku Solver",
        description: "Fills a 9x9 grid so that each column, row, and 3x3 box contains 1-9.",
        complexity: { time: "O(9^m)", space: "O(m)" },
        category: "Backtracking",
        learnMore: "The objective is to fill a 9×9 grid with digits so that each column, each row, and each of the nine 3×3 subgrids that compose the grid contain all of the digits from 1 to 9.",
        code: {
            cpp: placeholderCode("C++"),
            js: placeholderCode("JavaScript"),
            python: placeholderCode("Python")
        }
    },

    // Dynamic Programming
    KNAPSACK: {
        name: "0/1 Knapsack",
        description: "Maximizes value of items in a knapsack of limited capacity.",
        complexity: { time: "O(nW)", space: "O(nW)" },
        category: "DP",
        learnMore: "The knapsack problem is a problem in combinatorial optimization: Given a set of items, each with a weight and a value, determine the number of each item to include in a collection so that the total weight is less than or equal to a given limit and the total value is as large as possible.",
        code: {
            cpp: placeholderCode("C++"),
            js: placeholderCode("JavaScript"),
            python: placeholderCode("Python")
        }
    },
    LCS: {
        name: "Longest Common Subsequence",
        description: "Finds longest common subsequence in two sequences.",
        complexity: { time: "O(nm)", space: "O(nm)" },
        category: "DP",
        learnMore: "The longest common subsequence (LCS) problem is the problem of finding the longest subsequence common to all sequences in a set of sequences (often just two sequences).",
        code: {
            cpp: placeholderCode("C++"),
            js: placeholderCode("JavaScript"),
            python: placeholderCode("Python")
        }
    },
    LIS: {
        name: "Longest Increasing Subsequence",
        description: "Finds longest subsequence with stored sorted elements.",
        complexity: { time: "O(n²)", space: "O(n)" },
        category: "DP",
        learnMore: "The longest increasing subsequence problem is to find a subsequence of a given sequence in which the subsequence's elements are in sorted order, lowest to highest, and in which the subsequence is as long as possible.",
        code: {
            cpp: placeholderCode("C++"),
            js: placeholderCode("JavaScript"),
            python: placeholderCode("Python")
        }
    },

    // String
    KMP: {
        name: "KMP Algorithm",
        description: "Searches for occurrences of a pattern in a text using a prefix table.",
        complexity: { time: "O(n + m)", space: "O(m)" },
        category: "String",
        learnMore: "The Knuth-Morris-Pratt string-searching algorithm searches for occurrences of a 'word' within a main 'text string' by employing the observation that when a mismatch occurs, the word itself embodies sufficient information to determine where the next match could begin.",
        code: {
            cpp: placeholderCode("C++"),
            js: placeholderCode("JavaScript"),
            python: placeholderCode("Python")
        }
    },
    RABIN_KARP: {
        name: "Rabin-Karp",
        description: "Searches for patterns using hashing.",
        complexity: { time: "O(n + m)", space: "O(1)" },
        category: "String",
        learnMore: "The Rabin-Karp algorithm is a string-searching algorithm that uses hashing to find an exact match of a pattern string in a text. It uses a rolling hash to quickly update the hash value for consecutive substrings.",
        code: {
            cpp: placeholderCode("C++"),
            js: placeholderCode("JavaScript"),
            python: placeholderCode("Python")
        }
    },

    // Data Structures
    STACK: {
        name: "Stack",
        description: "LIFO (Last In First Out) data structure.",
        complexity: { time: "O(1)", space: "O(n)" },
        category: "Data Structure",
        learnMore: "A stack is an abstract data type that serves as a collection of elements, with two main principal operations: Push, which adds an element to the collection, and Pop, which removes the most recently added element that was not yet removed.",
        code: {
            cpp: `// Standard Stack using STL
#include <stack>
stack<int> s;
s.push(10);
s.pop();
`,
            js: `// JS array as stack
const stack = [];
stack.push(10);
const val = stack.pop();`,
            python: `# Python list as stack
stack = []
stack.append(10)
val = stack.pop()`
        }
    },
    QUEUE: {
        name: "Queue",
        description: "FIFO (First In First Out) data structure.",
        complexity: { time: "O(1)", space: "O(n)" },
        category: "Data Structure",
        learnMore: "A queue is a collection of entities that are maintained in a sequence and can be modified by the addition of entities at one end of the sequence and the removal of entities from the other end of the sequence.",
        code: {
            cpp: `// Standard Queue using STL
#include <queue>
queue<int> q;
q.push(10);
q.pop();`,
            js: `// Using Array (shift is O(n), ideally use LinkedList)
const queue = [];
queue.push(10);
const val = queue.shift();`,
            python: `from collections import deque
queue = deque()
queue.append(10)
val = queue.popleft()`
        }
    },
    LINKED_LIST: {
        name: "Linked List",
        description: "Elements stored in nodes with pointers to next node.",
        complexity: { time: "O(n)", space: "O(n)" },
        category: "Data Structure",
        learnMore: "A linked list is a linear collection of data elements whose order is not given by their physical placement in memory. Instead, each element points to the next.",
        code: {
            cpp: `struct Node {
    int data;
    Node* next;
};`,
            js: `class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}`,
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next`
        }
    },

    // Tree
    BST: {
        name: "Binary Search Tree",
        description: "Sorted binary tree for fast lookup, addition, and removal.",
        complexity: { time: "O(h)", space: "O(h)" },
        category: "Tree",
        learnMore: "Binary Search Tree is a node-based binary tree data structure which has the following properties: The left subtree of a node contains only nodes with keys lesser than the node's key. The right subtree of a node contains only nodes with keys greater than the node's key.",
        code: {
            cpp: placeholderCode("C++"),
            js: placeholderCode("JavaScript"),
            python: placeholderCode("Python")
        }
    },
    AVL: {
        name: "AVL Tree",
        description: "Self-balancing BST where height difference is at most 1.",
        complexity: { time: "O(log n)", space: "O(n)" },
        category: "Tree",
        learnMore: "An AVL tree is a self-balancing binary search tree. In an AVL tree, the heights of the two child subtrees of any node differ by at most one; if at any time they differ by more than one, rebalancing is done to restore this property.",
        code: {
            cpp: placeholderCode("C++"),
            js: placeholderCode("JavaScript"),
            python: placeholderCode("Python")
        }
    }
};
