import type { VisualizationStep } from "../types/VisualizationStep"

import pushStep from "../utils/pushStep"
import toId from "../utils/toId"

const nthFactorial = (inputArr: number[]): VisualizationStep[] => {
  
  const n = inputArr[0]
  const steps: VisualizationStep[] = []

  // SAME SIZE AS INPUT
  const values = new Array(n).fill(0)

  let factorial = 1

  // INITIAL EMPTY STEP
  pushStep(steps, {
    linear: {
      values: [...values]
    }
  })

  for (let i = 1; i <= n; i++) {

    factorial *= i

    // HIGHLIGHT CURRENT INDEX
    pushStep(steps, {
      linear: {
        values: [...values]
      },

      activeIds: [toId(i - 1)]
    })

    // INSERT FACTORIAL
    values[i - 1] = factorial

    // SHOW UPDATED ARRAY
    pushStep(steps, {
      linear: {
        values: [...values]
      },

      activeIds: [toId(i - 1)],

      sortedIds: Array.from(
        { length: i },
        (_, k) => toId(k)
      )
    })
  }

  // FINAL STEP
  pushStep(steps, {
    linear: {
      values: [...values]
    },

    sortedIds: Array.from(
      { length: n },
      (_, i) => toId(i)
    )
  })

  return steps
}

export default nthFactorial