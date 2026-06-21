import insertionSort from "../algorithms/insertionSort"
import bubbleSort from "../algorithms/bubbleSort"
import selectionSort from "../algorithms/selectionSort"
import quickSort from "../algorithms/quickSort"
import randQuickSort from "../algorithms/randQuickSort"
import heapSort from "../algorithms/heapSort"
import mergeSort from "../algorithms/mergeSort"
import type { VisualizationStep } from "./VisualizationStep"
import countingSort from "../algorithms/countingSort"
import radixSort from "../algorithms/radixSort"
import nthFactorial from "../algorithms/factorial"
import fibonacci from "../algorithms/fibonacci"
import inorderTrace from "../algorithms/inorderTraversal"
import postorderTrace from "../algorithms/postorderTraversal"
import preorderTrace from "../algorithms/preorderTraversal"
import bfsTreeTraversal from "../algorithms/bfsTreeTraversal"
import dfsGraphTrace from "../algorithms/dfsGraphTraversal"
import type { GraphData } from "../dataStructures/GraphData"
import { dijkstraFull, dijkstraRandom } from "../algorithms/dijkstrasAlgorithm"
import { bellmanFordFull, bellmanFordRandom } from "../algorithms/bellmanFord"
import bfsGraphTraversal from "../algorithms/bfsGraphTraversal"
import kruskalsAlgorithm from "../algorithms/kruskalAlgorithm"
import primsAlgorithm from "../algorithms/primsAlgorithm"
import bstInsertion from "../algorithms/bstInsertion"
import bfsTreeSearch, { bfsRedBlackSearch } from "../algorithms/bfsTreeSearch"
import dfsTreeSearch, { depthLimitedSearch, dfsRedBlackSearch } from "../algorithms/dfsTreeSearch"
import binarySearch from "../algorithms/binarySearch"
import bstDelete from "../algorithms/bstDeletion"
import redBlackInsert from "../algorithms/redBlackTreeInsertion"
import RBDelete from "../algorithms/redBlackTreeDeletion"
import bstTreeSearch, { bstRedBlackSearch }  from "../algorithms/bstTreeSearch"

/** Different algorithms for input to AnimationManager  */
export const Algorithm = {
  InsertionSort: "insertion",
  BubbleSort: "bubble",
  SelectionSort: "selection",
  QuickSort: "quick",
  RQuickSort: "rQuick",
  HeapSort: "heap",
  MergeSort: "merge",
  CountingSort: "counting",
  RadixSort: "radix",
  Factorial: "factorial",
  Fibonacci: "fibonacci",
  Inorder: "inorderTraversal",
  PostOrder: "postorderTraversal",
  PreOrder: "preorderTraversal",
  BFSTreeTraversal: "bfsTreeTraversal",
  DFSGraphTraversal: "dfsGraphTraversal",
  DijkstrasFull: "dijkstrasFull",
  DijkstrasRand: "dijkstrasRandom",
  BellmanFordRand: "bellmanFordRandom",
  BellmanFordFull: "bellmanFordFull",
  BFSGraph: "bfsGraphTraversal",
  Kruskals: "kruskals",
  Prims: "prims",
  BSTinsert: "bstInsertion",
  BFSTreeSearch: "bfsTreeSearch",
  DFSTreeSearch: "dfsTreeSearch",
  DepthLimitedSearch: "depthLimitedSearch",
  BinarySearch: "binarySearch",
  BSTDelete: "bstDeletion",
  DFSRBSearch: "dfsRedBlackSearch",
  BFSRBSearch: "bfsRedBlackSearch",
  RBInsert: "redBlackInsert",
  RBDelete: "redBlackDelete",
  BSTTreeSearch: "bstSearch",
  RBTreeSearch: "redBlackSearch"
  } as const

export type AlgorithmTypes = typeof Algorithm[keyof typeof Algorithm]

/** The input types that the algorithms can take */
export type AlgorithmInput = 
  | { type: "array"; data: number[]}
  | { type: "graph"; data: GraphData}
  | { type: "bst"; values: number[]; target: number }
  | { type: "search"; data: number[]; target: number }
  
/** The type of the algorithms */
export type AlgorithmFunction =
  (input: AlgorithmInput) => VisualizationStep[]

/**  Translates the algorithm string into an actual function using records */
const algorithmTypes : Record<
    AlgorithmTypes,
    AlgorithmFunction
> = {
    insertion: insertionSort,
    bubble: bubbleSort,
    selection: selectionSort,
    quick: quickSort,
    rQuick: randQuickSort,
    heap: heapSort,
    merge: mergeSort,
    counting: countingSort,
    radix: radixSort,
    factorial: nthFactorial,
    fibonacci: fibonacci,
    inorderTraversal: inorderTrace,
    postorderTraversal: postorderTrace,
    preorderTraversal: preorderTrace,
    bfsTreeTraversal: bfsTreeTraversal,
    dfsGraphTraversal: dfsGraphTrace,
    dijkstrasFull: dijkstraFull,
    dijkstrasRandom: dijkstraRandom,
    bellmanFordRandom: bellmanFordRandom,
    bellmanFordFull: bellmanFordFull,
    bfsGraphTraversal: bfsGraphTraversal,
    kruskals: kruskalsAlgorithm,
    prims: primsAlgorithm,
    bstInsertion: bstInsertion,
    bfsTreeSearch: bfsTreeSearch,
    dfsTreeSearch: dfsTreeSearch,
    depthLimitedSearch: depthLimitedSearch,
    binarySearch: binarySearch,
    bstDeletion: bstDelete,
    dfsRedBlackSearch: dfsRedBlackSearch,
    bfsRedBlackSearch: bfsRedBlackSearch,
    redBlackInsert: redBlackInsert,
    redBlackDelete: RBDelete,
    bstSearch: bstTreeSearch,
    redBlackSearch: bstRedBlackSearch
}

export default algorithmTypes