import insertionSort from "../algorithms/insertionSort"
import type { SortStep } from "./SortStep"


export type AlgorithmTypes =
  | "insertion"
//   | "bubble"
//   | "selection"

export type SortingFunction =
  (arr: number[]) => SortStep[]

const algorithmTypes : Record<
    AlgorithmTypes,
    SortingFunction
> = {
    insertion: insertionSort,
//   bubble: bubbleSort,
//   selection: selectionSort
}

export default algorithmTypes