import type { VisualizationStep } from "../types/VisualizationStep"

import pushStep from "../utils/pushStep"
import toId from "../utils/toId"

const fibonacci = (
  inputArr: number[]
): VisualizationStep[] => {
  
  const n = inputArr[0]
  const steps: VisualizationStep[] = []

  if (n <= 0) return steps

  // FIXED SIZE OUTPUT ARRAY
  const values = new Array(n).fill(0)

  // INITIAL EMPTY STEP
  pushStep(steps, {
    linear: {
      values: [...values]
    }
  })

  // FIRST NUMBER
  values[0] = 0

  pushStep(steps, {
    linear: {
      values: [...values]
    },

    activeIds: [toId(0)],
    sortedIds: [toId(0)]
  })

  if (n === 1) return steps

  // SECOND NUMBER
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

  // BUILD SEQUENCE
  for (let i = 2; i < n; i++) {

    // SHOW COMPARISON
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

    // COMPUTE NEXT FIB NUMBER
    values[i] = values[i - 1] + values[i - 2]

    // SHOW INSERTION
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