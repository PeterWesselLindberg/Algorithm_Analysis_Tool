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

export type SortingFunction =
  (arr: number[]) => VisualizationStep[]

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
    merge: mergeSort,
    counting: countingSort,
    radix: radixSort,
    factorial: nthFactorial,
    fibonacci: fibonacci
}

export default algorithmTypes