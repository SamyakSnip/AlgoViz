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
            cpp: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        int min_idx = i;
        for (int j = i+1; j < n; j++) {
            if (arr[j] < arr[min_idx])
                min_idx = j;
        }
        swap(arr[min_idx], arr[i]);
    }
}`,
            js: `function selectionSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n-1; i++) {
        let min_idx = i;
        for (let j = i+1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]];
    }
    return arr;
}`,
            python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n-1):
        min_idx = i
        for j in range(i+1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]`
        }
    },
    INSERTION: {
        name: "Insertion Sort",
        description: "Builds the final sorted array one item at a time.",
        complexity: { time: "O(n²)", space: "O(1)" },
        category: "Sorting",
        learnMore: "Insertion sort iterates, consuming one input element each repetition, and growing a sorted output list. At each iteration, insertion sort removes one element from the input data, finds the location it belongs within the sorted list, and inserts it there. It repeats until no input elements remain.",
        code: {
            cpp: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
            js: `function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
    return arr;
}`,
            python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key`
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
            cpp: `int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
            js: `function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        let pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}`,
            python: `def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`
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
            cpp: `void shellSort(int arr[], int n) {
    for (int gap = n/2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)
                arr[j] = arr[j - gap];
            arr[j] = temp;
        }
    }
}`,
            js: `function shellSort(arr) {
    let n = arr.length;
    for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {
        for (let i = gap; i < n; i++) {
            let temp = arr[i];
            let j;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
            }
            arr[j] = temp;
        }
    }
    return arr;
}`,
            python: `def shell_sort(arr):
    n = len(arr)
    gap = n // 2
    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            arr[j] = temp
        gap //= 2`
        }
    },
    COUNTING: {
        name: "Counting Sort",
        description: "Sorts integers by counting the occurrence of each unique value.",
        complexity: { time: "O(n + k)", space: "O(k)" },
        category: "Sorting",
        learnMore: "Counting sort is an integer sorting algorithm. It operates by counting the number of objects that have each distinct key value, and using arithmetic on those counts to determine the positions of each key value in the output sequence.",
        code: {
            cpp: `void countingSort(int arr[], int n) {
    int max = *max_element(arr, arr + n);
    int min = *min_element(arr, arr + n);
    int range = max - min + 1;
    
    vector<int> count(range), output(n);
    for (int i = 0; i < n; i++)
        count[arr[i] - min]++;
    
    for (int i = 1; i < count.size(); i++)
        count[i] += count[i - 1];
    
    for (int i = n - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }
    
    for (int i = 0; i < n; i++)
        arr[i] = output[i];
}`,
            js: `function countingSort(arr) {
    let max = Math.max(...arr);
    let min = Math.min(...arr);
    let range = max - min + 1;
    let count = new Array(range).fill(0);
    let output = new Array(arr.length);
    
    for (let i = 0; i < arr.length; i++)
        count[arr[i] - min]++;
    
    for (let i = 1; i < count.length; i++)
        count[i] += count[i - 1];
    
    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }
    
    return output;
}`,
            python: `def counting_sort(arr):
    max_val = max(arr)
    min_val = min(arr)
    range_val = max_val - min_val + 1
    count = [0] * range_val
    output = [0] * len(arr)
    
    for num in arr:
        count[num - min_val] += 1
    
    for i in range(1, len(count)):
        count[i] += count[i - 1]
    
    for i in range(len(arr) - 1, -1, -1):
        output[count[arr[i] - min_val] - 1] = arr[i]
        count[arr[i] - min_val] -= 1
    
    return output`
        }
    },
    RADIX: {
        name: "Radix Sort",
        description: "Sorts numbers digit by digit from least to most significant.",
        complexity: { time: "O(nk)", space: "O(n + k)" },
        category: "Sorting",
        learnMore: "Radix sort avoids comparison by creating and distributing elements into buckets according to their radix. For elements with more than one significant digit, this bucketing process is repeated for each digit.",
        code: {
            cpp: `void countSort(int arr[], int n, int exp) {
    vector<int> output(n);
    int count[10] = {0};
    
    for (int i = 0; i < n; i++)
        count[(arr[i] / exp) % 10]++;
    
    for (int i = 1; i < 10; i++)
        count[i] += count[i - 1];
    
    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }
    
    for (int i = 0; i < n; i++)
        arr[i] = output[i];
}

void radixSort(int arr[], int n) {
    int max = *max_element(arr, arr + n);
    for (int exp = 1; max / exp > 0; exp *= 10)
        countSort(arr, n, exp);
}`,
            js: `function radixSort(arr) {
    const max = Math.max(...arr);
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSortByDigit(arr, exp);
    }
    return arr;
}

function countingSortByDigit(arr, exp) {
    let output = new Array(arr.length);
    let count = new Array(10).fill(0);
    
    for (let i = 0; i < arr.length; i++)
        count[Math.floor(arr[i] / exp) % 10]++;
    
    for (let i = 1; i < 10; i++)
        count[i] += count[i - 1];
    
    for (let i = arr.length - 1; i >= 0; i--) {
        let digit = Math.floor(arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }
    
    for (let i = 0; i < arr.length; i++)
        arr[i] = output[i];
}`,
            python: `def radix_sort(arr):
    max_val = max(arr)
    exp = 1
    while max_val // exp > 0:
        counting_sort_by_digit(arr, exp)
        exp *= 10

def counting_sort_by_digit(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10
    
    for i in range(n):
        index = arr[i] // exp
        count[index % 10] += 1
    
    for i in range(1, 10):
        count[i] += count[i - 1]
    
    i = n - 1
    while i >= 0:
        index = arr[i] // exp
        output[count[index % 10] - 1] = arr[i]
        count[index % 10] -= 1
        i -= 1
    
    for i in range(n):
        arr[i] = output[i]`
        }
    },
    BUCKET: {
        name: "Bucket Sort",
        description: "Distributes elements into buckets, then sorts each bucket individually.",
        complexity: { time: "O(n + k)", space: "O(n)" },
        category: "Sorting",
        learnMore: "Bucket sort works by distributing the elements of an array into a number of buckets. Each bucket is then sorted individually, either using a different sorting algorithm, or by recursively applying the bucket sorting algorithm.",
        code: {
            cpp: `void bucketSort(float arr[], int n) {
    vector<float> buckets[n];
    
    for (int i = 0; i < n; i++) {
        int bi = n * arr[i];
        buckets[bi].push_back(arr[i]);
    }
    
    for (int i = 0; i < n; i++)
        sort(buckets[i].begin(), buckets[i].end());
    
    int index = 0;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < buckets[i].size(); j++)
            arr[index++] = buckets[i][j];
}`,
            js: `function bucketSort(arr, bucketSize = 5) {
    if (arr.length === 0) return arr;
    
    let min = Math.min(...arr);
    let max = Math.max(...arr);
    let bucketCount = Math.floor((max - min) / bucketSize) + 1;
    let buckets = Array.from({length: bucketCount}, () => []);
    
    for (let i = 0; i < arr.length; i++) {
        let bucketIndex = Math.floor((arr[i] - min) / bucketSize);
        buckets[bucketIndex].push(arr[i]);
    }
    
    arr.length = 0;
    for (let i = 0; i < buckets.length; i++) {
        buckets[i].sort((a, b) => a - b);
        arr.push(...buckets[i]);
    }
    
    return arr;
}`,
            python: `def bucket_sort(arr):
    if len(arr) == 0:
        return arr
    
    bucket_count = len(arr)
    max_val = max(arr)
    min_val = min(arr)
    
    buckets = [[] for _ in range(bucket_count)]
    
    for num in arr:
        index = int((num - min_val) * (bucket_count - 1) / (max_val - min_val))
        buckets[index].append(num)
    
    for bucket in buckets:
        bucket.sort()
    
    result = []
    for bucket in buckets:
        result.extend(bucket)
    
    return result`
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
            cpp: `struct Node {
    int x, y, f, g, h;
    bool operator>(const Node& other) const {
        return f > other.f;
    }
};

int heuristic(int x1, int y1, int x2, int y2) {
    return abs(x1 - x2) + abs(y1 - y2); // Manhattan distance
}

void astar(int grid[][], int startX, int startY, int goalX, int goalY) {
    priority_queue<Node, vector<Node>, greater<Node>> pq;
    pq.push({startX, startY, 0, 0, heuristic(startX, startY, goalX, goalY)});
    
    while (!pq.empty()) {
        Node current = pq.top();
        pq.pop();
        
        if (current.x == goalX && current.y == goalY) break;
        
        // Explore neighbors and add to priority queue
        // with f = g + h
    }
}`,
            js: `function astar(grid, start, goal) {
    const openSet = new PriorityQueue();
    const cameFrom = new Map();
    const gScore = new Map();
    const fScore = new Map();
    
    gScore.set(start, 0);
    fScore.set(start, heuristic(start, goal));
    openSet.enqueue(start, fScore.get(start));
    
    while (!openSet.isEmpty()) {
        const current = openSet.dequeue();
        
        if (current === goal) {
            return reconstructPath(cameFrom, current);
        }
        
        for (let neighbor of getNeighbors(current, grid)) {
            const tentativeGScore = gScore.get(current) + 1;
            
            if (tentativeGScore < (gScore.get(neighbor) || Infinity)) {
                cameFrom.set(neighbor, current);
                gScore.set(neighbor, tentativeGScore);
                fScore.set(neighbor, tentativeGScore + heuristic(neighbor, goal));
                openSet.enqueue(neighbor, fScore.get(neighbor));
            }
        }
    }
    return null;
}

function heuristic(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}`,
            python: `import heapq

def heuristic(a, b):
    return abs(a[0] - b[0]) + abs(a[1] - b[1])

def astar(grid, start, goal):
    open_set = []
    heapq.heappush(open_set, (0, start))
    came_from = {}
    g_score = {start: 0}
    f_score = {start: heuristic(start, goal)}
    
    while open_set:
        current = heapq.heappop(open_set)[1]
        
        if current == goal:
            return reconstruct_path(came_from, current)
        
        for neighbor in get_neighbors(current, grid):
            tentative_g_score = g_score[current] + 1
            
            if tentative_g_score < g_score.get(neighbor, float('inf')):
                came_from[neighbor] = current
                g_score[neighbor] = tentative_g_score
                f_score[neighbor] = tentative_g_score + heuristic(neighbor, goal)
                heapq.heappush(open_set, (f_score[neighbor], neighbor))`
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
            cpp: `void greedyBFS(int grid[][], int startX, int startY, int goalX, int goalY) {
    priority_queue<pair<int, pair<int, int>>, 
                   vector<pair<int, pair<int, int>>>,
                   greater<pair<int, pair<int, int>>>> pq;
    
    int h = abs(startX - goalX) + abs(startY - goalY);
    pq.push({h, {startX, startY}});
    bool visited[MAX][MAX] = {false};
    
    while (!pq.empty()) {
        auto current = pq.top();
        pq.pop();
        int x = current.second.first;
        int y = current.second.second;
        
        if (x == goalX && y == goalY) break;
        if (visited[x][y]) continue;
        visited[x][y] = true;
        
        // Add neighbors with heuristic priority
    }
}`,
            js: `function greedyBFS(grid, start, goal) {
    const openSet = new PriorityQueue();
    const visited = new Set();
    const cameFrom = new Map();
    
    openSet.enqueue(start, heuristic(start, goal));
    
    while (!openSet.isEmpty()) {
        const current = openSet.dequeue();
        
        if (current === goal) {
            return reconstructPath(cameFrom, current);
        }
        
        if (visited.has(current)) continue;
        visited.add(current);
        
        for (let neighbor of getNeighbors(current, grid)) {
            if (!visited.has(neighbor)) {
                cameFrom.set(neighbor, current);
                openSet.enqueue(neighbor, heuristic(neighbor, goal));
            }
        }
    }
    return null;
}

function heuristic(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}`,
            python: `import heapq

def heuristic(a, b):
    return abs(a[0] - b[0]) + abs(a[1] - b[1])

def greedy_bfs(grid, start, goal):
    open_set = []
    heapq.heappush(open_set, (heuristic(start, goal), start))
    visited = set()
    came_from = {}
    
    while open_set:
        _, current = heapq.heappop(open_set)
        
        if current == goal:
            return reconstruct_path(came_from, current)
        
        if current in visited:
            continue
        visited.add(current)
        
        for neighbor in get_neighbors(current, grid):
            if neighbor not in visited:
                came_from[neighbor] = current
                heapq.heappush(open_set, (heuristic(neighbor, goal), neighbor))`
        }
    },
    BIDIRECTIONAL: {
        name: "Bidirectional Search",
        description: "Searches from both start and goal simultaneously.",
        complexity: { time: "O(b^(d/2))", space: "O(b^(d/2))" },
        category: "Pathfinding",
        learnMore: "Bidirectional search is a graph search algorithm that finds a shortest path from an initial vertex to a goal vertex in a directed graph. It runs two simultaneous searches: one forward from the initial state, and one backward from the goal, stopping when the two meet.",
        code: {
            cpp: `bool bidirectionalSearch(int start, int goal) {
    queue<int> qStart, qGoal;
    map<int, int> visitedStart, visitedGoal;
    
    qStart.push(start);
    qGoal.push(goal);
    visitedStart[start] = -1;
    visitedGoal[goal] = -1;
    
    while (!qStart.empty() && !qGoal.empty()) {
        // BFS from start
        int u = qStart.front();
        qStart.pop();
        for (int v : adj[u]) {
            if (visitedGoal.count(v)) return true; // Meeting point
            if (!visitedStart.count(v)) {
                visitedStart[v] = u;
                qStart.push(v);
            }
        }
        
        // BFS from goal
        int w = qGoal.front();
        qGoal.pop();
        for (int v : adj[w]) {
            if (visitedStart.count(v)) return true; // Meeting point
            if (!visitedGoal.count(v)) {
                visitedGoal[v] = w;
                qGoal.push(v);
            }
        }
    }
    return false;
}`,
            js: `function bidirectionalSearch(graph, start, goal) {
    const queueStart = [start];
    const queueGoal = [goal];
    const visitedStart = new Map([[start, null]]);
    const visitedGoal = new Map([[goal, null]]);
    
    while (queueStart.length > 0 && queueGoal.length > 0) {
        // Search from start
        const currentStart = queueStart.shift();
        for (let neighbor of graph[currentStart]) {
            if (visitedGoal.has(neighbor)) {
                return constructPath(visitedStart, visitedGoal, neighbor);
            }
            if (!visitedStart.has(neighbor)) {
                visitedStart.set(neighbor, currentStart);
                queueStart.push(neighbor);
            }
        }
        
        // Search from goal
        const currentGoal = queueGoal.shift();
        for (let neighbor of graph[currentGoal]) {
            if (visitedStart.has(neighbor)) {
                return constructPath(visitedStart, visitedGoal, neighbor);
            }
            if (!visitedGoal.has(neighbor)) {
                visitedGoal.set(neighbor, currentGoal);
                queueGoal.push(neighbor);
            }
        }
    }
    return null;
}`,
            python: `from collections import deque

def bidirectional_search(graph, start, goal):
    queue_start = deque([start])
    queue_goal = deque([goal])
    visited_start = {start: None}
    visited_goal = {goal: None}
    
    while queue_start and queue_goal:
        # Search from start
        current_start = queue_start.popleft()
        for neighbor in graph[current_start]:
            if neighbor in visited_goal:
                return construct_path(visited_start, visited_goal, neighbor)
            if neighbor not in visited_start:
                visited_start[neighbor] = current_start
                queue_start.append(neighbor)
        
        # Search from goal
        current_goal = queue_goal.popleft()
        for neighbor in graph[current_goal]:
            if neighbor in visited_start:
                return construct_path(visited_start, visited_goal, neighbor)
            if neighbor not in visited_goal:
                visited_goal[neighbor] = current_goal
                queue_goal.append(neighbor)`
        }
    },
    JPS: {
        name: "Jump Point Search",
        description: "Optimized A* for uniform grids that prunes symmetric paths.",
        complexity: { time: "O(E)", space: "O(V)" },
        category: "Pathfinding",
        learnMore: "Jump Point Search (JPS) is an optimization to the A* search algorithm for uniform-cost grids. It reduces symmetries in the search procedure by means of graph pruning, eliminating certain nodes from the open set and effectively 'jumping' over many nodes.",
        code: {
            cpp: `pair<int, int> jump(int x, int y, int dx, int dy, int goalX, int goalY) {
    int nx = x + dx, ny = y + dy;
    if (!isValid(nx, ny) || isWall(nx, ny)) return {-1, -1};
    if (nx == goalX && ny == goalY) return {nx, ny};
    
    // Check for forced neighbors
    if (dx != 0 && dy != 0) { // Diagonal
        if (jump(nx, ny, dx, 0, goalX, goalY).first != -1 ||
            jump(nx, ny, 0, dy, goalX, goalY).first != -1)
            return {nx, ny};
    }
    
    return jump(nx, ny, dx, dy, goalX, goalY);
}

void jps(int startX, int startY, int goalX, int goalY) {
    priority_queue<Node> pq;
    pq.push({startX, startY, 0});
    
    while (!pq.empty()) {
        Node current = pq.top();
        pq.pop();
        
        // Identify successors using jump points
    }
}`,
            js: `function jump(x, y, dx, dy, grid, goal) {
    const nx = x + dx;
    const ny = y + dy;
    
    if (!isValid(nx, ny, grid) || grid[nx][ny] === 1) return null;
    if (nx === goal.x && ny === goal.y) return {x: nx, y: ny};
    
    // Diagonal movement
    if (dx !== 0 && dy !== 0) {
        if (jump(nx, ny, dx, 0, grid, goal) || 
            jump(nx, ny, 0, dy, grid, goal)) {
            return {x: nx, y: ny};
        }
    }
    
    // Check for forced neighbors
    if (hasForceNeighbor(nx, ny, dx, dy, grid)) {
        return {x: nx, y: ny};
    }
    
    return jump(nx, ny, dx, dy, grid, goal);
}

function jps(grid, start, goal) {
    const openSet = new PriorityQueue();
    openSet.enqueue(start, 0);
    
    while (!openSet.isEmpty()) {
        const current = openSet.dequeue();
        if (current.x === goal.x && current.y === goal.y) break;
        
        identifySuccessors(current, goal, grid, openSet);
    }
}`,
            python: `def jump(x, y, dx, dy, grid, goal):
    nx, ny = x + dx, y + dy
    
    if not is_valid(nx, ny, grid) or grid[nx][ny] == 1:
        return None
    if (nx, ny) == goal:
        return (nx, ny)
    
    # Diagonal movement
    if dx != 0 and dy != 0:
        if jump(nx, ny, dx, 0, grid, goal) or jump(nx, ny, 0, dy, grid, goal):
            return (nx, ny)
    
    # Check for forced neighbors
    if has_forced_neighbor(nx, ny, dx, dy, grid):
        return (nx, ny)
    
    return jump(nx, ny, dx, dy, grid, goal)

def jps(grid, start, goal):
    open_set = PriorityQueue()
    open_set.put((0, start))
    
    while not open_set.empty():
        _, current = open_set.get()
        if current == goal:
            break
        identify_successors(current, goal, grid, open_set)`
        }
    },
    BELLMAN_FORD: {
        name: "Bellman-Ford Algorithm",
        description: "Single-source shortest path algorithm that can handle negative edge weights.",
        complexity: { time: "O(VE)", space: "O(V)" },
        category: "Pathfinding",
        learnMore: "The Bellman-Ford algorithm computes shortest paths from a single source vertex to all other vertices in a weighted graph. Unlike Dijkstra's algorithm, it can handle graphs with negative edge weights and can detect negative cycles. It works by relaxing all edges V-1 times.",
        code: {
            cpp: `void bellmanFord(int src) {
    dist[src] = 0;
    for (int i = 0; i < V - 1; i++) {
        for (auto edge : edges) {
            int u = edge.from;
            int v = edge.to;
            int weight = edge.weight;
            if (dist[u] != INF && dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
            }
        }
    }
    // Check for negative cycles
    for (auto edge : edges) {
        if (dist[edge.from] + edge.weight < dist[edge.to])
            cout << "Negative cycle detected";
    }
}`,
            js: `function bellmanFord(graph, start) {
    const dist = {};
    for (let node in graph) dist[node] = Infinity;
    dist[start] = 0;
    
    for (let i = 0; i < Object.keys(graph).length - 1; i++) {
        for (let u in graph) {
            for (let [v, weight] of graph[u]) {
                if (dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                }
            }
        }
    }
    return dist;
}`,
            python: `def bellman_ford(graph, start):
    dist = {node: float('inf') for node in graph}
    dist[start] = 0
    
    for _ in range(len(graph) - 1):
        for u in graph:
            for v, weight in graph[u]:
                if dist[u] + weight < dist[v]:
                    dist[v] = dist[u] + weight
    return dist`
        }
    },
    FLOYD_WARSHALL: {
        name: "Floyd-Warshall Algorithm",
        description: "All-pairs shortest path algorithm using dynamic programming.",
        complexity: { time: "O(V³)", space: "O(V²)" },
        category: "Pathfinding",
        learnMore: "Floyd-Warshall algorithm finds shortest paths between all pairs of vertices in a weighted graph. It uses dynamic programming with a 3-nested loop structure. The algorithm can handle negative edge weights but not negative cycles. It's particularly useful when you need distances between all pairs of nodes.",
        code: {
            cpp: `void floydWarshall() {
    // Initialize dist matrix
    for (int k = 0; k < V; k++) {
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j])
                    dist[i][j] = dist[i][k] + dist[k][j];
            }
        }
    }
}`,
            js: `function floydWarshall(graph) {
    const dist = {};
    // Initialize
    for (let i in graph) {
        dist[i] = {};
        for (let j in graph) {
            dist[i][j] = i === j ? 0 : Infinity;
        }
    }
    
    for (let k in graph) {
        for (let i in graph) {
            for (let j in graph) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
    return dist;
}`,
            python: `def floyd_warshall(graph):
    dist = {i: {j: 0 if i == j else float('inf') 
                for j in graph} for i in graph}
    
    for k in graph:
        for i in graph:
            for j in graph:
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
    return dist`
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
            cpp: `int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target)
            return i;
    }
    return -1;
}`,
            js: `function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}`,
            python: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`
        }
    },
    BINARY: {
        name: "Binary Search",
        description: "Repeatedly divides the search interval in half. Requires sorted array.",
        complexity: { time: "O(log n)", space: "O(1)" },
        category: "Searching",
        learnMore: "Binary search compares the target value to the middle element of the array. If they are not equal, the half in which the target cannot lie is eliminated and the search continues on the remaining half, again taking the middle element to compare to the target value.",
        code: {
            cpp: `int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target)
            return mid;
        if (arr[mid] < target)
            left = mid + 1;
        else
            right = mid - 1;
    }
    return -1;
}`,
            js: `function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] === target)
            return mid;
        if (arr[mid] < target)
            left = mid + 1;
        else
            right = mid - 1;
    }
    return -1;
}`,
            python: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`
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
            cpp: `void prims(int V) {
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    vector<int> key(V, INT_MAX);
    vector<bool> inMST(V, false);
    vector<int> parent(V, -1);
    
    pq.push({0, 0});
    key[0] = 0;
    
    while (!pq.empty()) {
        int u = pq.top().second;
        pq.pop();
        
        if (inMST[u]) continue;
        inMST[u] = true;
        
        for (auto [v, weight] : adj[u]) {
            if (!inMST[v] && weight < key[v]) {
                key[v] = weight;
                pq.push({key[v], v});
                parent[v] = u;
            }
        }
    }
}`,
            js: `function prims(graph, V) {
    const key = new Array(V).fill(Infinity);
    const parent = new Array(V).fill(-1);
    const inMST = new Array(V).fill(false);
    const pq = new PriorityQueue();
    
    key[0] = 0;
    pq.enqueue(0, 0);
    
    while (!pq.isEmpty()) {
        const u = pq.dequeue();
        
        if (inMST[u]) continue;
        inMST[u] = true;
        
        for (let [v, weight] of graph[u]) {
            if (!inMST[v] && weight < key[v]) {
                key[v] = weight;
                parent[v] = u;
                pq.enqueue(v, key[v]);
            }
        }
    }
    
    return parent;
}`,
            python: `import heapq

def prims(graph, V):
    key = [float('inf')] * V
    parent = [-1] * V
    in_mst = [False] * V
    pq = []
    
    key[0] = 0
    heapq.heappush(pq, (0, 0))
    
    while pq:
        weight, u = heapq.heappop(pq)
        
        if in_mst[u]:
            continue
        in_mst[u] = True
        
        for v, w in graph[u]:
            if not in_mst[v] and w < key[v]:
                key[v] = w
                parent[v] = u
                heapq.heappush(pq, (key[v], v))
    
    return parent`
        }
    },
    KRUSKALS: {
        name: "Kruskal's Algorithm",
        description: "Builds a MST by adding edges in increasing order of weight.",
        complexity: { time: "O(E log E)", space: "O(V)" },
        category: "MST",
        learnMore: "Kruskal's algorithm finds a minimum spanning forest of an undirected edge-weighted graph. If the graph is connected, it finds a minimum spanning tree. It is a greedy algorithm that sorts edges by weight and adds them if they don't form a cycle.",
        code: {
            cpp: `struct Edge {
    int u, v, weight;
    bool operator<(const Edge& other) const {
        return weight < other.weight;
    }
};

int find(int x, vector<int>& parent) {
    if (parent[x] != x)
        parent[x] = find(parent[x], parent);
    return parent[x];
}

void unionSet(int x, int y, vector<int>& parent, vector<int>& rank) {
    int px = find(x, parent), py = find(y, parent);
    if (rank[px] < rank[py]) parent[px] = py;
    else if (rank[px] > rank[py]) parent[py] = px;
    else { parent[py] = px; rank[px]++; }
}

void kruskals(vector<Edge>& edges, int V) {
    sort(edges.begin(), edges.end());
    vector<int> parent(V), rank(V, 0);
    for (int i = 0; i < V; i++) parent[i] = i;
    
    for (auto& edge : edges) {
        if (find(edge.u, parent) != find(edge.v, parent)) {
            unionSet(edge.u, edge.v, parent, rank);
        }
    }
}`,
            js: `class UnionFind {
    constructor(size) {
        this.parent = Array.from({length: size}, (_, i) => i);
        this.rank = new Array(size).fill(0);
    }
    
    find(x) {
        if (this.parent[x] !== x)
            this.parent[x] = this.find(this.parent[x]);
        return this.parent[x];
    }
    
    union(x, y) {
        let px = this.find(x), py = this.find(y);
        if (px === py) return false;
        
        if (this.rank[px] < this.rank[py]) this.parent[px] = py;
        else if (this.rank[px] > this.rank[py]) this.parent[py] = px;
        else { this.parent[py] = px; this.rank[px]++; }
        return true;
    }
}

function kruskals(edges, V) {
    edges.sort((a, b) => a.weight - b.weight);
    const uf = new UnionFind(V);
    const mst = [];
    
    for (let edge of edges) {
        if (uf.union(edge.u, edge.v)) {
            mst.push(edge);
        }
    }
    return mst;
}`,
            python: `class UnionFind:
    def __init__(self, size):
        self.parent = list(range(size))
        self.rank = [0] * size
    
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    
    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return False
        
        if self.rank[px] < self.rank[py]:
            self.parent[px] = py
        elif self.rank[px] > self.rank[py]:
            self.parent[py] = px
        else:
            self.parent[py] = px
            self.rank[px] += 1
        return True

def kruskals(edges, V):
    edges.sort(key=lambda x: x[2])
    uf = UnionFind(V)
    mst = []
    
    for u, v, weight in edges:
        if uf.union(u, v):
            mst.append((u, v, weight))
    
    return mst`
        }
    },
    CONNECTED_COMPONENTS: {
        name: "Connected Components",
        description: "Finds all connected subgraphs in an undirected graph.",
        complexity: { time: "O(V + E)", space: "O(V)" },
        category: "Graph",
        learnMore: "In graph theory, a connected component (or just component) of an undirected graph is a subgraph in which any two vertices are connected to each other by paths, and which is connected to no additional vertices in the supergraph.",
        code: {
            cpp: `void dfs(int u, vector<int> adj[], vector<bool>& visited, vector<int>& component) {
    visited[u] = true;
    component.push_back(u);
    for (int v : adj[u]) {
        if (!visited[v])
            dfs(v, adj, visited, component);
    }
}

vector<vector<int>> connectedComponents(int V, vector<int> adj[]) {
    vector<bool> visited(V, false);
    vector<vector<int>> components;
    
    for (int i = 0; i < V; i++) {
        if (!visited[i]) {
            vector<int> component;
            dfs(i, adj, visited, component);
            components.push_back(component);
        }
    }
    return components;
}`,
            js: `function dfs(node, graph, visited, component) {
    visited.add(node);
    component.push(node);
    
    for (let neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
            dfs(neighbor, graph, visited, component);
        }
    }
}

function connectedComponents(graph) {
    const visited = new Set();
    const components = [];
    
    for (let node in graph) {
        if (!visited.has(node)) {
            const component = [];
            dfs(node, graph, visited, component);
            components.push(component);
        }
    }
    
    return components;
}`,
            python: `def dfs(node, graph, visited, component):
    visited.add(node)
    component.append(node)
    
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs(neighbor, graph, visited, component)

def connected_components(graph):
    visited = set()
    components = []
    
    for node in graph:
        if node not in visited:
            component = []
            dfs(node, graph, visited, component)
            components.append(component)
    
    return components`
        }
    },
    TOPOLOGICAL_SORT: {
        name: "Topological Sort",
        description: "Linear ordering of vertices in a directed acyclic graph (DAG) where for every edge u→v, u comes before v.",
        complexity: { time: "O(V + E)", space: "O(V)" },
        category: "Graph",
        learnMore: "Topological sorting for Directed Acyclic Graph (DAG) is a linear ordering of vertices such that for every directed edge u→v, vertex u comes before v in the ordering. It's commonly used in scheduling tasks, resolving symbol dependencies in linkers, and determining the order of compilation tasks.",
        code: {
            cpp: `void topologicalSortUtil(int v, bool visited[], stack<int>& Stack) {
    visited[v] = true;
    for (int i : adj[v])
        if (!visited[i])
            topologicalSortUtil(i, visited, Stack);
    Stack.push(v);
}

void topologicalSort() {
    stack<int> Stack;
    bool* visited = new bool[V];
    for (int i = 0; i < V; i++) visited[i] = false;
    for (int i = 0; i < V; i++)
        if (!visited[i])
            topologicalSortUtil(i, visited, Stack);
}`,
            js: `function topologicalSort(graph) {
    const visited = new Set();
    const stack = [];
    
    function dfs(node) {
        visited.add(node);
        for (let neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                dfs(neighbor);
            }
        }
        stack.push(node);
    }
    
    for (let node in graph) {
        if (!visited.has(node)) dfs(node);
    }
    return stack.reverse();
}`,
            python: `def topological_sort(graph):
    visited = set()
    stack = []
    
    def dfs(node):
        visited.add(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                dfs(neighbor)
        stack.append(node)
    
    for node in graph:
        if node not in visited:
            dfs(node)
    return stack[::-1]`
        }
    },
    SCC: {
        name: "Strongly Connected Components",
        description: "Finds subgraphs where every vertex is reachable from every other vertex.",
        complexity: { time: "O(V + E)", space: "O(V)" },
        category: "Graph",
        learnMore: "A strongly connected component of a directed graph is a maximal set of vertices such that for every pair of vertices u and v, there is a directed path from u to v and a directed path from v to u.",
        code: {
            cpp: `void dfs1(int u, vector<int> adj[], vector<bool>& visited, stack<int>& st) {
    visited[u] = true;
    for (int v : adj[u])
        if (!visited[v])
            dfs1(v, adj, visited, st);
    st.push(u);
}

void dfs2(int u, vector<int> transpose[], vector<bool>& visited, vector<int>& component) {
    visited[u] = true;
    component.push_back(u);
    for (int v : transpose[u])
        if (!visited[v])
            dfs2(v, transpose, visited, component);
}

vector<vector<int>> kosaraju(int V, vector<int> adj[]) {
    stack<int> st;
    vector<bool> visited(V, false);
    
    for (int i = 0; i < V; i++)
        if (!visited[i])
            dfs1(i, adj, visited, st);
    
    vector<int> transpose[V];
    for (int u = 0; u < V; u++)
        for (int v : adj[u])
            transpose[v].push_back(u);
    
    fill(visited.begin(), visited.end(), false);
    vector<vector<int>> sccs;
    
    while (!st.empty()) {
        int u = st.top();
        st.pop();
        if (!visited[u]) {
            vector<int> component;
            dfs2(u, transpose, visited, component);
            sccs.push_back(component);
        }
    }
    return sccs;
}`,
            js: `function kosaraju(graph, V) {
    const visited = new Array(V).fill(false);
    const stack = [];
    
    function dfs1(u) {
        visited[u] = true;
        for (let v of graph[u]) {
            if (!visited[v]) dfs1(v);
        }
        stack.push(u);
    }
    
    for (let i = 0; i < V; i++) {
        if (!visited[i]) dfs1(i);
    }
    
    const transpose = Array.from({length: V}, () => []);
    for (let u = 0; u < V; u++) {
        for (let v of graph[u]) {
            transpose[v].push(u);
        }
    }
    
    visited.fill(false);
    const sccs = [];
    
    function dfs2(u, component) {
        visited[u] = true;
        component.push(u);
        for (let v of transpose[u]) {
            if (!visited[v]) dfs2(v, component);
        }
    }
    
    while (stack.length > 0) {
        const u = stack.pop();
        if (!visited[u]) {
            const component = [];
            dfs2(u, component);
            sccs.push(component);
        }
    }
    
    return sccs;
}`,
            python: `def kosaraju(graph, V):
    visited = [False] * V
    stack = []
    
    def dfs1(u):
        visited[u] = True
        for v in graph[u]:
            if not visited[v]:
                dfs1(v)
        stack.append(u)
    
    for i in range(V):
        if not visited[i]:
            dfs1(i)
    
    transpose = [[] for _ in range(V)]
    for u in range(V):
        for v in graph[u]:
            transpose[v].append(u)
    
    visited = [False] * V
    sccs = []
    
    def dfs2(u, component):
        visited[u] = True
        component.append(u)
        for v in transpose[u]:
            if not visited[v]:
                dfs2(v, component)
    
    while stack:
        u = stack.pop()
        if not visited[u]:
            component = []
            dfs2(u, component)
            sccs.append(component)
    
    return sccs`
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
            cpp: `bool isSafe(vector<vector<int>>& board, int row, int col, int n) {
    for (int i = 0; i < col; i++)
        if (board[row][i]) return false;
    for (int i = row, j = col; i >= 0 && j >= 0; i--, j--)
        if (board[i][j]) return false;
    for (int i = row, j = col; i < n && j >= 0; i++, j--)
        if (board[i][j]) return false;
    return true;
}

bool solveNQueens(vector<vector<int>>& board, int col, int n) {
    if (col >= n) return true;
    for (int i = 0; i < n; i++) {
        if (isSafe(board, i, col, n)) {
            board[i][col] = 1;
            if (solveNQueens(board, col + 1, n)) return true;
            board[i][col] = 0;
        }
    }
    return false;
}`,
            js: `function isSafe(board, row, col, n) {
    for (let i = 0; i < col; i++)
        if (board[row][i]) return false;
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--)
        if (board[i][j]) return false;
    for (let i = row, j = col; i < n && j >= 0; i++, j--)
        if (board[i][j]) return false;
    return true;
}

function solveNQueens(board, col, n) {
    if (col >= n) return true;
    for (let i = 0; i < n; i++) {
        if (isSafe(board, i, col, n)) {
            board[i][col] = 1;
            if (solveNQueens(board, col + 1, n)) return true;
            board[i][col] = 0;
        }
    }
    return false;
}`,
            python: `def is_safe(board, row, col, n):
    for i in range(col):
        if board[row][i]:
            return False
    i, j = row, col
    while i >= 0 and j >= 0:
        if board[i][j]:
            return False
        i -= 1
        j -= 1
    i, j = row, col
    while i < n and j >= 0:
        if board[i][j]:
            return False
        i += 1
        j -= 1
    return True

def solve_n_queens(board, col, n):
    if col >= n:
        return True
    for i in range(n):
        if is_safe(board, i, col, n):
            board[i][col] = 1
            if solve_n_queens(board, col + 1, n):
                return True
            board[i][col] = 0
    return False`
        }
    },
    SUDOKU: {
        name: "Sudoku Solver",
        description: "Fills a 9x9 grid so that each column, row, and 3x3 box contains 1-9.",
        complexity: { time: "O(9^m)", space: "O(m)" },
        category: "Backtracking",
        learnMore: "The objective is to fill a 9×9 grid with digits so that each column, each row, and each of the nine 3×3 subgrids that compose the grid contain all of the digits from 1 to 9.",
        code: {
            cpp: `bool isSafe(int grid[9][9], int row, int col, int num) {
    for (int x = 0; x < 9; x++)
        if (grid[row][x] == num || grid[x][col] == num) return false;
    int startRow = row - row % 3, startCol = col - col % 3;
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            if (grid[i + startRow][j + startCol] == num) return false;
    return true;
}

bool solveSudoku(int grid[9][9]) {
    for (int row = 0; row < 9; row++) {
        for (int col = 0; col < 9; col++) {
            if (grid[row][col] == 0) {
                for (int num = 1; num <= 9; num++) {
                    if (isSafe(grid, row, col, num)) {
                        grid[row][col] = num;
                        if (solveSudoku(grid)) return true;
                        grid[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}`,
            js: `function isSafe(grid, row, col, num) {
    for (let x = 0; x < 9; x++)
        if (grid[row][x] === num || grid[x][col] === num) return false;
    let startRow = row - row % 3, startCol = col - col % 3;
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            if (grid[i + startRow][j + startCol] === num) return false;
    return true;
}

function solveSudoku(grid) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isSafe(grid, row, col, num)) {
                        grid[row][col] = num;
                        if (solveSudoku(grid)) return true;
                        grid[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}`,
            python: `def is_safe(grid, row, col, num):
    for x in range(9):
        if grid[row][x] == num or grid[x][col] == num:
            return False
    start_row, start_col = row - row % 3, col - col % 3
    for i in range(3):
        for j in range(3):
            if grid[i + start_row][j + start_col] == num:
                return False
    return True

def solve_sudoku(grid):
    for row in range(9):
        for col in range(9):
            if grid[row][col] == 0:
                for num in range(1, 10):
                    if is_safe(grid, row, col, num):
                        grid[row][col] = num
                        if solve_sudoku(grid):
                            return True
                        grid[row][col] = 0
                return False
    return True`
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
            cpp: `int knapsack(int W, int wt[], int val[], int n) {
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));
    
    for (int i = 1; i <= n; i++) {
        for (int w = 1; w <= W; w++) {
            if (wt[i-1] <= w)
                dp[i][w] = max(val[i-1] + dp[i-1][w-wt[i-1]], dp[i-1][w]);
            else
                dp[i][w] = dp[i-1][w];
        }
    }
    return dp[n][W];
}`,
            js: `function knapsack(W, wt, val, n) {
    const dp = Array.from({length: n + 1}, () => Array(W + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= W; w++) {
            if (wt[i-1] <= w)
                dp[i][w] = Math.max(val[i-1] + dp[i-1][w-wt[i-1]], dp[i-1][w]);
            else
                dp[i][w] = dp[i-1][w];
        }
    }
    return dp[n][W];
}`,
            python: `def knapsack(W, wt, val, n):
    dp = [[0 for _ in range(W + 1)] for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(1, W + 1):
            if wt[i-1] <= w:
                dp[i][w] = max(val[i-1] + dp[i-1][w-wt[i-1]], dp[i-1][w])
            else:
                dp[i][w] = dp[i-1][w]
    
    return dp[n][W]`
        }
    },
    LCS: {
        name: "Longest Common Subsequence",
        description: "Finds longest common subsequence in two sequences.",
        complexity: { time: "O(nm)", space: "O(nm)" },
        category: "DP",
        learnMore: "The longest common subsequence (LCS) problem is the problem of finding the longest subsequence common to all sequences in a set of sequences (often just two sequences).",
        code: {
            cpp: `int lcs(string s1, string s2) {
    int m = s1.length(), n = s2.length();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i-1] == s2[j-1])
                dp[i][j] = dp[i-1][j-1] + 1;
            else
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
        }
    }
    return dp[m][n];
}`,
            js: `function lcs(s1, s2) {
    const m = s1.length, n = s2.length;
    const dp = Array.from({length: m + 1}, () => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i-1] === s2[j-1])
                dp[i][j] = dp[i-1][j-1] + 1;
            else
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
        }
    }
    return dp[m][n];
}`,
            python: `def lcs(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    return dp[m][n]`
        }
    },
    LIS: {
        name: "Longest Increasing Subsequence",
        description: "Finds longest subsequence with stored sorted elements.",
        complexity: { time: "O(n²)", space: "O(n)" },
        category: "DP",
        learnMore: "The longest increasing subsequence problem is to find a subsequence of a given sequence in which the subsequence's elements are in sorted order, lowest to highest, and in which the subsequence is as long as possible.",
        code: {
            cpp: `int lis(int arr[], int n) {
    vector<int> dp(n, 1);
    
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (arr[i] > arr[j])
                dp[i] = max(dp[i], dp[j] + 1);
        }
    }
    return *max_element(dp.begin(), dp.end());
}`,
            js: `function lis(arr) {
    const n = arr.length;
    const dp = new Array(n).fill(1);
    
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[i] > arr[j])
                dp[i] = Math.max(dp[i], dp[j] + 1);
        }
    }
    return Math.max(...dp);
}`,
            python: `def lis(arr):
    n = len(arr)
    dp = [1] * n
    
    for i in range(1, n):
        for j in range(i):
            if arr[i] > arr[j]:
                dp[i] = max(dp[i], dp[j] + 1)
    
    return max(dp)`
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
            cpp: `void computeLPS(string pattern, int M, int lps[]) {
    int len = 0;
    lps[0] = 0;
    int i = 1;
    while (i < M) {
        if (pattern[i] == pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len != 0) len = lps[len - 1];
            else { lps[i] = 0; i++; }
        }
    }
}

void KMP(string text, string pattern) {
    int M = pattern.length();
    int N = text.length();
    int lps[M];
    computeLPS(pattern, M, lps);
    
    int i = 0, j = 0;
    while (i < N) {
        if (pattern[j] == text[i]) { j++; i++; }
        if (j == M) { /* Found at i-j */; j = lps[j - 1]; }
        else if (i < N && pattern[j] != text[i]) {
            if (j != 0) j = lps[j - 1];
            else i++;
        }
    }
}`,
            js: `function computeLPS(pattern) {
    const M = pattern.length;
    const lps = new Array(M).fill(0);
    let len = 0, i = 1;
    
    while (i < M) {
        if (pattern[i] === pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) len = lps[len - 1];
            else { lps[i] = 0; i++; }
        }
    }
    return lps;
}

function KMP(text, pattern) {
    const M = pattern.length;
    const N = text.length;
    const lps = computeLPS(pattern);
    
    let i = 0, j = 0;
    const matches = [];
    while (i < N) {
        if (pattern[j] === text[i]) { j++; i++; }
        if (j === M) { matches.push(i - j); j = lps[j - 1]; }
        else if (i < N && pattern[j] !== text[i]) {
            if (j !== 0) j = lps[j - 1];
            else i++;
        }
    }
    return matches;
}`,
            python: `def compute_lps(pattern):
    M = len(pattern)
    lps = [0] * M
    length = 0
    i = 1
    
    while i < M:
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        else:
            if length != 0:
                length = lps[length - 1]
            else:
                lps[i] = 0
                i += 1
    return lps

def kmp(text, pattern):
    M = len(pattern)
    N = len(text)
    lps = compute_lps(pattern)
    
    i = j = 0
    matches = []
    while i < N:
        if pattern[j] == text[i]:
            i += 1
            j += 1
        if j == M:
            matches.append(i - j)
            j = lps[j - 1]
        elif i < N and pattern[j] != text[i]:
            if j != 0:
                j = lps[j - 1]
            else:
                i += 1
    return matches`
        }
    },
    RABIN_KARP: {
        name: "Rabin-Karp",
        description: "Searches for patterns using hashing.",
        complexity: { time: "O(n + m)", space: "O(1)" },
        category: "String",
        learnMore: "The Rabin-Karp algorithm is a string-searching algorithm that uses hashing to find an exact match of a pattern string in a text. It uses a rolling hash to quickly update the hash value for consecutive substrings.",
        code: {
            cpp: `#define d 256
#define q 101

void rabinKarp(string text, string pattern) {
    int M = pattern.length();
    int N = text.length();
    int i, j;
    int p = 0, t = 0, h = 1;
    
    for (i = 0; i < M - 1; i++)
        h = (h * d) % q;
    
    for (i = 0; i < M; i++) {
        p = (d * p + pattern[i]) % q;
        t = (d * t + text[i]) % q;
    }
    
    for (i = 0; i <= N - M; i++) {
        if (p == t) {
            for (j = 0; j < M; j++)
                if (text[i + j] != pattern[j]) break;
            if (j == M) /* Pattern found at i */;
        }
        if (i < N - M) {
            t = (d * (t - text[i] * h) + text[i + M]) % q;
            if (t < 0) t = t + q;
        }
    }
}`,
            js: `function rabinKarp(text, pattern) {
    const d = 256, q = 101;
    const M = pattern.length;
    const N = text.length;
    let p = 0, t = 0, h = 1;
    
    for (let i = 0; i < M - 1; i++)
        h = (h * d) % q;
    
    for (let i = 0; i < M; i++) {
        p = (d * p + pattern.charCodeAt(i)) % q;
        t = (d * t + text.charCodeAt(i)) % q;
    }
    
    const matches = [];
    for (let i = 0; i <= N - M; i++) {
        if (p === t) {
            let j;
            for (j = 0; j < M; j++)
                if (text[i + j] !== pattern[j]) break;
            if (j === M) matches.push(i);
        }
        if (i < N - M) {
            t = (d * (t - text.charCodeAt(i) * h) + text.charCodeAt(i + M)) % q;
            if (t < 0) t = t + q;
        }
    }
    return matches;
}`,
            python: `def rabin_karp(text, pattern):
    d = 256
    q = 101
    M = len(pattern)
    N = len(text)
    p = t = 0
    h = 1
    
    for i in range(M - 1):
        h = (h * d) % q
    
    for i in range(M):
        p = (d * p + ord(pattern[i])) % q
        t = (d * t + ord(text[i])) % q
    
    matches = []
    for i in range(N - M + 1):
        if p == t:
            if text[i:i+M] == pattern:
                matches.append(i)
        if i < N - M:
            t = (d * (t - ord(text[i]) * h) + ord(text[i + M])) % q
            if t < 0:
                t = t + q
    return matches`
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
            cpp: `struct Node {
    int data;
    Node *left, *right;
    Node(int val) : data(val), left(nullptr), right(nullptr) {}
};

Node* insert(Node* root, int key) {
    if (root == nullptr) return new Node(key);
    if (key < root->data)
        root->left = insert(root->left, key);
    else if (key > root->data)
        root->right = insert(root->right, key);
    return root;
}

Node* search(Node* root, int key) {
    if (root == nullptr || root->data == key)
        return root;
    if (key < root->data)
        return search(root->left, key);
    return search(root->right, key);
}`,
            js: `class Node {
    constructor(val) {
        this.data = val;
        this.left = null;
        this.right = null;
    }
}

function insert(root, key) {
    if (root === null) return new Node(key);
    if (key < root.data)
        root.left = insert(root.left, key);
    else if (key > root.data)
        root.right = insert(root.right, key);
    return root;
}

function search(root, key) {
    if (root === null || root.data === key)
        return root;
    if (key < root.data)
        return search(root.left, key);
    return search(root.right, key);
}`,
            python: `class Node:
    def __init__(self, val):
        self.data = val
        self.left = None
        self.right = None

def insert(root, key):
    if root is None:
        return Node(key)
    if key < root.data:
        root.left = insert(root.left, key)
    elif key > root.data:
        root.right = insert(root.right, key)
    return root

def search(root, key):
    if root is None or root.data == key:
        return root
    if key < root.data:
        return search(root.left, key)
    return search(root.right, key)`
        }
    },
    AVL: {
        name: "AVL Tree",
        description: "Self-balancing BST where height difference is at most 1.",
        complexity: { time: "O(log n)", space: "O(n)" },
        category: "Tree",
        learnMore: "An AVL tree is a self-balancing binary search tree. In an AVL tree, the heights of the two child subtrees of any node differ by at most one; if at any time they differ by more than one, rebalancing is done to restore this property.",
        code: {
            cpp: `struct Node {
    int key, height;
    Node *left, *right;
};

int height(Node* N) {
    return N == nullptr ? 0 : N->height;
}

int getBalance(Node* N) {
    return N == nullptr ? 0 : height(N->left) - height(N->right);
}

Node* rightRotate(Node* y) {
    Node* x = y->left;
    Node* T2 = x->right;
    x->right = y;
    y->left = T2;
    y->height = max(height(y->left), height(y->right)) + 1;
    x->height = max(height(x->left), height(x->right)) + 1;
    return x;
}

Node* leftRotate(Node* x) {
    Node* y = x->right;
    Node* T2 = y->left;
    y->left = x;
    x->right = T2;
    x->height = max(height(x->left), height(x->right)) + 1;
    y->height = max(height(y->left), height(y->right)) + 1;
    return y;
}`,
            js: `class Node {
    constructor(key) {
        this.key = key;
        this.height = 1;
        this.left = null;
        this.right = null;
    }
}

function height(N) {
    return N === null ? 0 : N.height;
}

function getBalance(N) {
    return N === null ? 0 : height(N.left) - height(N.right);
}

function rightRotate(y) {
    let x = y.left;
    let T2 = x.right;
    x.right = y;
    y.left = T2;
    y.height = Math.max(height(y.left), height(y.right)) + 1;
    x.height = Math.max(height(x.left), height(x.right)) + 1;
    return x;
}

function leftRotate(x) {
    let y = x.right;
    let T2 = y.left;
    y.left = x;
    x.right = T2;
    x.height = Math.max(height(x.left), height(x.right)) + 1;
    y.height = Math.max(height(y.left), height(y.right)) + 1;
    return y;
}`,
            python: `class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None
        self.height = 1

def height(node):
    return 0 if node is None else node.height

def get_balance(node):
    return 0 if node is None else height(node.left) - height(node.right)

def right_rotate(y):
    x = y.left
    T2 = x.right
    x.right = y
    y.left = T2
    y.height = max(height(y.left), height(y.right)) + 1
    x.height = max(height(x.left), height(x.right)) + 1
    return x

def left_rotate(x):
    y = x.right
    T2 = y.left
    y.left = x
    x.right = T2
    x.height = max(height(x.left), height(x.right)) + 1
    y.height = max(height(y.left), height(y.right)) + 1
    return y`
        }
    },
    MIN_HEAP: {
        name: "Min Heap",
        description: "Binary heap where parent is smaller than children.",
        complexity: { time: "O(log n)", space: "O(n)" },
        category: "Data Structure",
        learnMore: "A Min Heap is a complete binary tree where the value of each node is less than or equal to the values of its children. This property makes it efficient for implementing priority queues and heap sort.",
        code: {
            cpp: `void minHeapify(int arr[], int n, int i) {
    int smallest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    if (left < n && arr[left] < arr[smallest])
        smallest = left;
    if (right < n && arr[right] < arr[smallest])
        smallest = right;
    
    if (smallest != i) {
        swap(arr[i], arr[smallest]);
        minHeapify(arr, n, smallest);
    }
}

void buildMinHeap(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--)
        minHeapify(arr, n, i);
}`,
            js: `function minHeapify(arr, n, i) {
    let smallest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    
    if (left < n && arr[left] < arr[smallest])
        smallest = left;
    if (right < n && arr[right] < arr[smallest])
        smallest = right;
    
    if (smallest !== i) {
        [arr[i], arr[smallest]] = [arr[smallest], arr[i]];
        minHeapify(arr, n, smallest);
    }
}

function buildMinHeap(arr) {
    const n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
        minHeapify(arr, n, i);
}`,
            python: `def min_heapify(arr, n, i):
    smallest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    if left < n and arr[left] < arr[smallest]:
        smallest = left
    if right < n and arr[right] < arr[smallest]:
        smallest = right
    
    if smallest != i:
        arr[i], arr[smallest] = arr[smallest], arr[i]
        min_heapify(arr, n, smallest)

def build_min_heap(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        min_heapify(arr, n, i)`
        }
    },
    MAX_HEAP: {
        name: "Max Heap",
        description: "Binary heap where parent is larger than children.",
        complexity: { time: "O(log n)", space: "O(n)" },
        category: "Data Structure",
        learnMore: "A Max Heap is a complete binary tree where the value of each node is greater than or equal to the values of its children. This property makes it efficient for implementing priority queues and finding maximum elements quickly.",
        code: {
            cpp: `void maxHeapify(int arr[], int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest])
        largest = left;
    if (right < n && arr[right] > arr[largest])
        largest = right;
    
    if (largest != i) {
        swap(arr[i], arr[largest]);
        maxHeapify(arr, n, largest);
    }
}

void buildMaxHeap(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--)
        maxHeapify(arr, n, i);
}`,
            js: `function maxHeapify(arr, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest])
        largest = left;
    if (right < n && arr[right] > arr[largest])
        largest = right;
    
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        maxHeapify(arr, n, largest);
    }
}

function buildMaxHeap(arr) {
    const n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
        maxHeapify(arr, n, i);
}`,
            python: `def max_heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right
    
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        max_heapify(arr, n, largest)

def build_max_heap(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        max_heapify(arr, n, i)`
        }
    }
};
