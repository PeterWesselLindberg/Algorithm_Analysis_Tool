import insertionSort from "../algorithms/insertionSort"
import type { SortStep } from "./SortStep"
import bubbleSort from "../algorithms/bubbleSort"
import selectionSort from "../algorithms/selectionSort"
import quickSort from "../algorithms/quickSort"
import randQuickSort from "../algorithms/randQuickSort"
import heapSort from "../algorithms/heapSort"
import mergeSort from "../algorithms/mergeSort"

/** Different algorithms for input to AnimationManager  */
export type AlgorithmTypes =
  | "insertion"
  | "bubble"
  | "selection"
  | "quick"
  | "rQuick"
  | "heap"
  | "merge"

export type SortingFunction =
  (arr: number[]) => SortStep[]

/**  Translates the algorithm string into an actual function using records*/
const algorithmTypes : Record<
    AlgorithmTypes,
    SortingFunction
> = {
    insertion: insertionSort,
    bubble: bubbleSort,
    selection: selectionSort,
    quick: quickSort,
    rQuick: randQuickSort,
    heap: heapSort,
    merge: mergeSort
}

export default algorithmTypes