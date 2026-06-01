import type { AlgorithmInput } from "../types/algorithmtypes"
import type { VisualizationStep } from "../types/VisualizationStep"

import pushStep from "../utils/pushStep"
import toId from "../utils/toId"

const fibonacci = (input: AlgorithmInput): VisualizationStep[] => {
  
  // The fibonacci sequence only supports arrays
  if (input.type !== "array") return []
  
  const inputArr = input.data
  const n = inputArr[0]
  const steps: VisualizationStep[] = []

  if (n <= 0) return steps

  // Fixed size output array
  const values = new Array(n).fill(0)

  // Initial empty step
  pushStep(steps, {
    linear: {
      values: [...values]
    }
  })

  // First number
  values[0] = 0

  pushStep(steps, {
    linear: {
      values: [...values]
    },

    activeIds: [toId(0)],
    sortedIds: [toId(0)]
  })

  if (n === 1) return steps

  // Second number
  values[1] = 1

  pushStep(steps, {
    linear: {
      values: [...values]
    },

    activeIds: [toId(1)],

    sortedIds: [
      toId(0),
      toId(1)
    ]
  })

  // Build sequence
  for (let i = 2; i < n; i++) {

    // Show comparisopn
    pushStep(steps, {
      linear: {
        values: [...values]
      },

      activeIds: [toId(i)],

      compareIds: [
        toId(i - 1),
        toId(i - 2)
      ],

      sortedIds: Array.from(
        { length: i },
        (_, k) => toId(k)
      )
    })

    // Compute next fib number
    values[i] = values[i - 1] + values[i - 2]

    // Show insertion
    pushStep(steps, {
      linear: {
        values: [...values]
      },

      activeIds: [toId(i)],
      sortedIds: Array.from(
        { length: i + 1 },
        (_, k) => toId(k)
      )
    })
  }

  return steps
}

export default fibonacci