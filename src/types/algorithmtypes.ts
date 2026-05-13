import insertionSort from "../algorithms/insertionSort"
import type { SortStep } from "./SortStep"
import bubbleSort from "../algorithms/bubbleSort"

/** Different algorithms for input to AnimationManager  */
export type AlgorithmTypes =
  | "insertion"
  | "bubble"
//   | "selection"

export type SortingFunction =
  (arr: number[]) => SortStep[]

/**  Translates the algorithm string into an actual function using records*/
const algorithmTypes : Record<
    AlgorithmTypes,
    SortingFunction
> = {
    insertion: insertionSort,
    bubble: bubbleSort,
//   selection: selectionSort
}

export default algorithmTypes