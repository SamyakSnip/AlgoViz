import { AlgorithmType, AnimationStep } from "@/types";

export interface PseudocodeDef {
    lines: string[];
    getLine: (step: AnimationStep) => number;
}

// Helper to keep code clean
const createDef = (lines: string[], getLine: (step: AnimationStep) => number): PseudocodeDef => ({
    lines,
    getLine
});

export const PSEUDOCODE_DATA: Partial<Record<AlgorithmType, PseudocodeDef>> = {
    BUBBLE: createDef(
        [
            "for i = 0 to n-1:",
            "  for j = 0 to n-i-1:",
            "    if arr[j] > arr[j+1]:",
            "      swap(arr[j], arr[j+1])",
            "return arr"
        ],
        (step) => {
            if (step.type === "compare") return 2; // if arr[j] > arr[j+1]
            if (step.type === "swap") return 3;    // swap(...)
            return 1; // Default to loop
        }
    ),
    SELECTION: createDef(
        [
            "for i = 0 to n-1:",
            "  min_idx = i",
            "  for j = i+1 to n:",
            "    if arr[j] < arr[min_idx]:",
            "      min_idx = j",
            "  swap(arr[i], arr[min_idx])"
        ],
        (step) => {
            if (step.type === "compare") return 3; // if arr[j] < ...
            if (step.type === "swap") return 5;    // swap(...)
            return 2; // scanning
        }
    ),
    INSERTION: createDef(
        [
            "for i = 1 to n:",
            "  key = arr[i], j = i-1",
            "  while j >= 0 and arr[j] > key:",
            "    arr[j+1] = arr[j]",
            "    j = j - 1",
            "  arr[j+1] = key"
        ],
        (step) => {
            if (step.type === "compare") return 2; // while check
            if (step.type === "swap" || step.type === "overwrite") return 3; // shift
            return 0; // loop
        }
    ),
    BFS: createDef(
        [
            "Q.push(start), mark visited",
            "while Q is not empty:",
            "  u = Q.pop()",
            "  for each neighbor v of u:",
            "    if v not visited:",
            "      mark v visited",
            "      Q.push(v)"
        ],
        (step) => {
            // This is tricky without more step details, assuming generic mapping
            // Many BFS steps are just "visit" or "path"
            if (step.type === "visit") return 2; // u = Q.pop() or processing
            if (step.type === "path") return 5;  // mark visited / push
            return 1;
        }
    ),
    DFS: createDef(
        [
            "function DFS(u):",
            "  mark u as visited",
            "  for each neighbor v of u:",
            "    if v not visited:",
            "      DFS(v)"
        ],
        (step) => {
            if (step.type === "visit") return 1;
            if (step.type === "path") return 3;
            return 0;
        }
    ), // Comma added here
    MERGE: createDef(
        [
            "function mergeSort(arr, l, r):",
            "  if l >= r: return",
            "  m = (l + r) / 2",
            "  mergeSort(arr, l, m)",
            "  mergeSort(arr, m+1, r)",
            "  merge(arr, l, m, r)" // We'll highlight this mostly
        ],
        (step) => {
            // Visualize mostly the merge process
            if (step.type === "overwrite") return 5; // Merging/Copying
            if (step.type === "compare") return 5; // Comparing during merge
            return 2; // dividing
        }
    ),
    QUICK: createDef(
        [
            "function partition(arr, low, high):",
            "  pivot = arr[high]",
            "  i = low - 1",
            "  for j = low to high - 1:",
            "    if arr[j] < pivot:",
            "      i++, swap(arr[i], arr[j])",
            "  swap(arr[i + 1], arr[high])",
            "  return i + 1"
        ],
        (step) => {
            if (step.type === "compare") return 4; // if arr[j] < pivot
            if (step.type === "swap") return 5;    // swap(arr[i], arr[j])
            return 3; // looping
        }
    ),
    HEAP: createDef(
        [
            "buildMaxHeap(arr)",
            "for i = n-1 to 1:",
            "  swap(arr[0], arr[i])",
            "  heapify(arr, 0, i)"
        ],
        (step) => {
            if (step.type === "swap") return 2;
            if (step.type === "compare") return 3; // Heapify internals
            return 1;
        }
    ),
    TOPOLOGICAL_SORT: createDef(
        [
            "function topologicalSort(graph):",
            "  visited = set()",
            "  stack = []",
            "  for each vertex v:",
            "    if v not in visited:",
            "      dfs(v, visited, stack)",
            "  return reversed(stack)"
        ],
        (step) => {
            if (step.type === "visit") return 5; // DFS visit
            if (step.type === "compare") return 5; // Checking neighbors
            if (step.type === "path") return 6; // Adding to stack
            if (step.type === "found") return 6; // Final ordering
            return 3; // Loop iteration
        }
    ),
    BELLMAN_FORD: createDef(
        [
            "function bellmanFord(graph, start):",
            "  dist[start] = 0",
            "  for i = 1 to V-1:",
            "    for each edge (u, v) with weight w:",
            "      if dist[u] + w < dist[v]:",
            "        dist[v] = dist[u] + w",
            "  return dist"
        ],
        (step) => {
            if (step.type === "visit") return 3; // Processing node
            if (step.type === "compare") return 4; // Edge relaxation check
            if (step.type === "path") return 5; // Update distance
            if (step.type === "found") return 6; // Path found
            return 2; // Loop iteration
        }
    ),
    FLOYD_WARSHALL: createDef(
        [
            "function floydWarshall(graph):",
            "  initialize dist matrix",
            "  for k = 0 to V-1:",
            "    for i = 0 to V-1:",
            "      for j = 0 to V-1:",
            "        if dist[i][k] + dist[k][j] < dist[i][j]:",
            "          dist[i][j] = dist[i][k] + dist[k][j]",
            "  return dist"
        ],
        (step) => {
            if (step.type === "visit") return 2; // Processing intermediate vertex k
            if (step.type === "compare") return 5; // Checking if path through k is shorter
            if (step.type === "path") return 6; // Update distance
            if (step.type === "found") return 7; // Final path
            return 3; // Loop iteration
        }
    ),
    // Additional Sorting Algorithms
    SHELL: createDef(
        [
            "for gap = n/2 down to 1 (gap /= 2):",
            "  for i = gap to n:",
            "    temp = arr[i]",
            "    j = i",
            "    while j >= gap and arr[j-gap] > temp:",
            "      arr[j] = arr[j-gap]",
            "      j -= gap",
            "    arr[j] = temp"
        ],
        (step) => {
            if (step.type === "compare") return 4;
            if (step.type === "overwrite") return 5;
            return 1;
        }
    ),
    COUNTING: createDef(
        [
            "find max and min in arr",
            "create count array of size (max-min+1)",
            "for each element in arr:",
            "  count[element-min]++",
            "for i = 1 to count.length:",
            "  count[i] += count[i-1]",
            "build output array using counts"
        ],
        (step) => {
            if (step.type === "compare") return 0;
            if (step.type === "overwrite") return 6;
            return 2;
        }
    ),
    RADIX: createDef(
        [
            "find max element",
            "for exp = 1 to max/exp > 0 (exp *= 10):",
            "  countingSortByDigit(arr, exp)",
            "  // Sort by current digit position"
        ],
        (step) => {
            if (step.type === "overwrite") return 2;
            if (step.type === "moveToBucket") return 2;
            return 1;
        }
    ),
    BUCKET: createDef(
        [
            "create n empty buckets",
            "for each element in arr:",
            "  insert element into bucket[n*element]",
            "sort each bucket individually",
            "concatenate all buckets"
        ],
        (step) => {
            if (step.type === "moveToBucket") return 2;
            if (step.type === "restore") return 4;
            return 1;
        }
    ),
    // Pathfinding Algorithms
    ASTAR: createDef(
        [
            "openSet = {start}",
            "gScore[start] = 0",
            "fScore[start] = h(start, goal)",
            "while openSet not empty:",
            "  current = node in openSet with lowest fScore",
            "  if current == goal: return path",
            "  for each neighbor of current:",
            "    tentativeG = gScore[current] + 1",
            "    if tentativeG < gScore[neighbor]:",
            "      update gScore and fScore",
            "      add neighbor to openSet"
        ],
        (step) => {
            if (step.type === "visit") return 4;
            if (step.type === "compare") return 8;
            if (step.type === "path") return 9;
            return 3;
        }
    ),
    GREEDY_BFS: createDef(
        [
            "openSet = {start}",
            "while openSet not empty:",
            "  current = node with lowest h(current, goal)",
            "  if current == goal: return path",
            "  mark current as visited",
            "  for each neighbor of current:",
            "    if neighbor not visited:",
            "      add neighbor to openSet"
        ],
        (step) => {
            if (step.type === "visit") return 2;
            if (step.type === "path") return 7;
            return 1;
        }
    ),
    BIDIRECTIONAL: createDef(
        [
            "queueStart = {start}, queueGoal = {goal}",
            "while both queues not empty:",
            "  // Search from start",
            "  current = queueStart.dequeue()",
            "  if current in visitedGoal: found path",
            "  explore neighbors from start",
            "  // Search from goal",
            "  current = queueGoal.dequeue()",
            "  if current in visitedStart: found path",
            "  explore neighbors from goal"
        ],
        (step) => {
            if (step.type === "visit") return 3;
            if (step.type === "found") return 4;
            return 1;
        }
    ),
    JPS: createDef(
        [
            "function jump(x, y, dx, dy):",
            "  if not valid or wall: return null",
            "  if (x,y) == goal: return (x,y)",
            "  if has forced neighbor: return (x,y)",
            "  if diagonal: check horizontal and vertical",
            "  return jump(x+dx, y+dy, dx, dy)",
            "identifySuccessors using jump points"
        ],
        (step) => {
            if (step.type === "visit") return 2;
            if (step.type === "found") return 2;
            return 0;
        }
    ),
    DIJKSTRA: createDef(
        [
            "dist[start] = 0",
            "pq.push((0, start))",
            "while pq not empty:",
            "  (d, u) = pq.pop()",
            "  for each neighbor v of u:",
            "    if dist[u] + weight < dist[v]:",
            "      dist[v] = dist[u] + weight",
            "      pq.push((dist[v], v))"
        ],
        (step) => {
            if (step.type === "visit") return 3;
            if (step.type === "compare") return 5;
            if (step.type === "path") return 6;
            return 2;
        }
    ),
    // Graph Algorithms
    PRIMS: createDef(
        [
            "key[0] = 0, all others = infinity",
            "pq.push((0, 0))",
            "while pq not empty:",
            "  u = pq.pop()",
            "  mark u in MST",
            "  for each neighbor v of u:",
            "    if v not in MST and weight < key[v]:",
            "      key[v] = weight, parent[v] = u",
            "      pq.push((key[v], v))"
        ],
        (step) => {
            if (step.type === "visit") return 3;
            if (step.type === "path") return 7;
            return 2;
        }
    ),
    KRUSKALS: createDef(
        [
            "sort all edges by weight",
            "for each edge (u, v) in sorted order:",
            "  if find(u) != find(v):",
            "    union(u, v)",
            "    add edge to MST"
        ],
        (step) => {
            if (step.type === "compare") return 1;
            if (step.type === "path") return 3;
            return 1;
        }
    ),
    CONNECTED_COMPONENTS: createDef(
        [
            "visited = set()",
            "components = []",
            "for each vertex v:",
            "  if v not in visited:",
            "    component = []",
            "    DFS(v, visited, component)",
            "    components.append(component)"
        ],
        (step) => {
            if (step.type === "visit") return 5;
            return 2;
        }
    ),
    SCC: createDef(
        [
            "// Kosaraju's Algorithm",
            "DFS on original graph, push to stack",
            "create transpose graph",
            "while stack not empty:",
            "  v = stack.pop()",
            "  if v not visited:",
            "    DFS on transpose from v",
            "    mark as one SCC"
        ],
        (step) => {
            if (step.type === "visit") return 1;
            if (step.type === "path") return 6;
            return 3;
        }
    ),
    // Searching Algorithms
    LINEAR: createDef(
        [
            "for i = 0 to n:",
            "  if arr[i] == target:",
            "    return i",
            "return -1"
        ],
        (step) => {
            if (step.type === "compare") return 1;
            if (step.type === "found") return 2;
            return 0;
        }
    ),
    BINARY: createDef(
        [
            "left = 0, right = n-1",
            "while left <= right:",
            "  mid = (left + right) / 2",
            "  if arr[mid] == target: return mid",
            "  if arr[mid] < target: left = mid + 1",
            "  else: right = mid - 1",
            "return -1"
        ],
        (step) => {
            if (step.type === "compare") return 3;
            if (step.type === "found") return 3;
            return 1;
        }
    ),
    // Backtracking
    NQUEENS: createDef(
        [
            "function solveNQueens(col):",
            "  if col >= n: return true",
            "  for row = 0 to n:",
            "    if isSafe(row, col):",
            "      place queen at (row, col)",
            "      if solveNQueens(col+1): return true",
            "      remove queen (backtrack)"
        ],
        (step) => {
            if (step.type === "compare") return 3;
            if (step.type === "highlight") return 4;
            return 0;
        }
    ),
    SUDOKU: createDef(
        [
            "for each empty cell:",
            "  for num = 1 to 9:",
            "    if isSafe(row, col, num):",
            "      place num",
            "      if solveSudoku(): return true",
            "      remove num (backtrack)",
            "  return false"
        ],
        (step) => {
            if (step.type === "compare") return 2;
            if (step.type === "highlight") return 3;
            return 0;
        }
    ),
    // Dynamic Programming
    KNAPSACK: createDef(
        [
            "dp[0][0...W] = 0",
            "for i = 1 to n:",
            "  for w = 1 to W:",
            "    if wt[i-1] <= w:",
            "      dp[i][w] = max(val[i-1] + dp[i-1][w-wt[i-1]], dp[i-1][w])",
            "    else:",
            "      dp[i][w] = dp[i-1][w]",
            "return dp[n][W]"
        ],
        (step) => {
            if (step.type === "updateTable") return 4;
            if (step.type === "compare") return 3;
            return 1;
        }
    ),
    LCS: createDef(
        [
            "dp[0][j] = 0, dp[i][0] = 0",
            "for i = 1 to m:",
            "  for j = 1 to n:",
            "    if s1[i-1] == s2[j-1]:",
            "      dp[i][j] = dp[i-1][j-1] + 1",
            "    else:",
            "      dp[i][j] = max(dp[i-1][j], dp[i][j-1])",
            "return dp[m][n]"
        ],
        (step) => {
            if (step.type === "updateTable") return 4;
            if (step.type === "compare") return 3;
            return 1;
        }
    ),
    LIS: createDef(
        [
            "dp[i] = 1 for all i",
            "for i = 1 to n:",
            "  for j = 0 to i:",
            "    if arr[i] > arr[j]:",
            "      dp[i] = max(dp[i], dp[j] + 1)",
            "return max(dp)"
        ],
        (step) => {
            if (step.type === "compare") return 3;
            if (step.type === "updateTable") return 4;
            return 1;
        }
    ),
    // String Algorithms
    KMP: createDef(
        [
            "compute LPS array for pattern",
            "i = 0, j = 0",
            "while i < text.length:",
            "  if pattern[j] == text[i]: i++, j++",
            "  if j == pattern.length: found match",
            "  else if mismatch:",
            "    if j != 0: j = lps[j-1]",
            "    else: i++"
        ],
        (step) => {
            if (step.type === "compare") return 3;
            if (step.type === "found") return 4;
            return 2;
        }
    ),
    RABIN_KARP: createDef(
        [
            "compute hash of pattern",
            "compute hash of first window",
            "for i = 0 to n-m:",
            "  if hash matches:",
            "    check character by character",
            "  if i < n-m:",
            "    update hash (rolling hash)"
        ],
        (step) => {
            if (step.type === "compare") return 3;
            if (step.type === "found") return 4;
            return 2;
        }
    ),
    // Tree Algorithms
    BST: createDef(
        [
            "function insert(root, key):",
            "  if root == null: return new Node(key)",
            "  if key < root.data:",
            "    root.left = insert(root.left, key)",
            "  else if key > root.data:",
            "    root.right = insert(root.right, key)",
            "  return root"
        ],
        (step) => {
            if (step.type === "compare") return 2;
            if (step.type === "highlight") return 3;
            return 0;
        }
    ),
    AVL: createDef(
        [
            "function insert(root, key):",
            "  // Standard BST insert",
            "  update height",
            "  balance = getBalance(root)",
            "  if balance > 1: // Left heavy",
            "    if key < root.left.key: rightRotate(root)",
            "    else: leftRotate(root.left), rightRotate(root)",
            "  if balance < -1: // Right heavy",
            "    perform rotations"
        ],
        (step) => {
            if (step.type === "compare") return 3;
            if (step.type === "highlight") return 5;
            return 1;
        }
    ),
    // Heap Operations
    MIN_HEAP: createDef(
        [
            "function minHeapify(arr, i):",
            "  smallest = i",
            "  left = 2*i + 1, right = 2*i + 2",
            "  if left < n and arr[left] < arr[smallest]:",
            "    smallest = left",
            "  if right < n and arr[right] < arr[smallest]:",
            "    smallest = right",
            "  if smallest != i:",
            "    swap(arr[i], arr[smallest])",
            "    minHeapify(arr, smallest)"
        ],
        (step) => {
            if (step.type === "compare") return 3;
            if (step.type === "swap") return 8;
            return 1;
        }
    ),
    MAX_HEAP: createDef(
        [
            "function maxHeapify(arr, i):",
            "  largest = i",
            "  left = 2*i + 1, right = 2*i + 2",
            "  if left < n and arr[left] > arr[largest]:",
            "    largest = left",
            "  if right < n and arr[right] > arr[largest]:",
            "    largest = right",
            "  if largest != i:",
            "    swap(arr[i], arr[largest])",
            "    maxHeapify(arr, largest)"
        ],
        (step) => {
            if (step.type === "compare") return 3;
            if (step.type === "swap") return 8;
            return 1;
        }
    )
};
