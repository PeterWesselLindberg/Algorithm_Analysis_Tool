import type { VisualizationStep } from "../types/VisualizationStep"
import pushStep from "../utils/pushStep"
import toId from "../utils/toId"

const insertionSort = (inputArr: number[]): VisualizationStep[] => {

  const arr = [...inputArr]
  const steps: VisualizationStep[] = []

  const n = arr.length

  for (let i = 1; i < n; i++) {

    const key = arr[i]
    let j = i - 1

    // sorted portion = left side
    let sortedIds = Array.from({ length: i }, (_, k) => toId(k))

    // 🔥 initial comparison
    pushStep(steps, {
      linear: { values: [...arr] },
      activeIds: [toId(j)],
      compareIds: [toId(i)],
      sortedIds
    })

    while (j >= 0 && arr[j] > key) {

      // shift right
      arr[j + 1] = arr[j]

      // 🔥 shift step
      pushStep(steps, {
        linear: { values: [...arr] },
        activeIds: [toId(j)],
        compareIds: [toId(j + 1)],
        sortedIds
      })

      j--
    }

    // insert key
    arr[j + 1] = key

    // 🔥 insertion step (important final action of this iteration)
    pushStep(steps, {
      linear: { values: [...arr] },
      activeIds: [toId(j + 1)],
      compareIds: [toId(i)],
      sortedIds: Array.from({ length: i + 1 }, (_, k) => toId(k))
    })
  }

  // final fully sorted state
  pushStep(steps, {
    linear: { values: [...arr] },
    sortedIds: Array.from({ length: n }, (_, k) => toId(k))
  })

  return steps
}

export default insertionSort