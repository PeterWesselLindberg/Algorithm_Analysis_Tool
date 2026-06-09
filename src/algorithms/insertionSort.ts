import type { AlgorithmInput } from "../types/algorithmtypes"
import type { VisualizationStep } from "../types/VisualizationStep"
import { pushStep } from "../utils/pushStep"
import toId from "../utils/toId"

const insertionSort = (input: AlgorithmInput): VisualizationStep[] => {

  // Insertion sort only supports arrays
  if (input.type !== "array") {
    return []
  }
  const inputArr = input.data
  const arr = [...inputArr]
  const steps: VisualizationStep[] = []

  const n = arr.length

  for (let i = 1; i < n; i++) {

    const key = arr[i]
    let j = i - 1

    // Sorted portion = left side
    let sortedIds = Array.from({ length: i }, (_, k) => toId(k))

    // Initial comparison
    pushStep(steps, {
      linear: { values: [...arr] },
      activeIds: [toId(j)],
      compareIds: [toId(i)],
      sortedIds
    })

    while (j >= 0 && arr[j] > key) {

      // Shift right
      arr[j + 1] = arr[j]

      // Shift step
      pushStep(steps, {
        linear: { values: [...arr] },
        activeIds: [toId(j)],
        compareIds: [toId(j + 1)],
        sortedIds
      })

      j--
    }

    // Insert key
    arr[j + 1] = key

    // Insertion step
    pushStep(steps, {
      linear: { values: [...arr] },
      activeIds: [toId(j + 1)],
      compareIds: [toId(i)],
      sortedIds: Array.from({ length: i + 1 }, (_, k) => toId(k))
    })
  }

  // Final fully sorted state
  pushStep(steps, {
    linear: { values: [...arr] },
    sortedIds: Array.from({ length: n }, (_, k) => toId(k))
  })

  return steps
}

export default insertionSort