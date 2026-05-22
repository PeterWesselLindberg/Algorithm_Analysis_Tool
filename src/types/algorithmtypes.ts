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

/** Different algorithms for input to AnimationManager  */
export type AlgorithmTypes =
  | "insertion"
  | "bubble"
  | "selection"
  | "quick"
  | "rQuick"
  | "heap"
  | "merge"
  | "counting"
  | "radix"
  | "factorial"
  | "fibonacci"
  | "inorderTraversal"
  | "postorderTraversal"
  | "preorderTraversal"
  | "bfsTreeTraversal"
  | "dfsGraphTraversal"
  | "dijkstrasFull"
  | "dijkstrasRandom"
  | "bellmanFordRandom"
  | "bellmanFordFull"
  | "bfsGraphTraversal"
  | "kruskals"
  | "prims"

export type AlgorithmInput = number[] | GraphData
export type AlgorithmFunction =
  (input: AlgorithmInput) => VisualizationStep[]

/**  Translates the algorithm string into an actual function using records*/
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
    prims: primsAlgorithm
}

export default algorithmTypes