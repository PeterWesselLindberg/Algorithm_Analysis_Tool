import type { AlgorithmInput } from "../types/algorithmtypes"
import type { VisualizationStep } from "../types/VisualizationStep"

import pushStep from "../utils/pushStep"

const inputId = (i: number) => `input-${i}`

const countId = (i: number) => `count-${i}`

const outputId = (i: number) => `output-${i}`

const countingSort = (input: AlgorithmInput): VisualizationStep[] => {

  // Counting sort only supports arrays
  if (input.type !== "array") {
    return []
  }
  const inputArr = input.data
  const arr = [...inputArr]

  const steps: VisualizationStep[] = []

  const n = arr.length

  if (n === 0) return []

  const maxVal = Math.max(...arr)

  const cntArr = new Array(maxVal + 1).fill(0)

  const ans = new Array(n).fill(0)

  const buildLinears = () => [
    {
      id: "input",
      label: "Input Array",
      values: [...arr]
    },

    {
      id: "count",
      label: "Count Array",
      values: [...cntArr]
    },

    {
      id: "output",
      label: "Output Array",
      values: [...ans]
    }
  ]

  // Count occurrences
  for (let i = 0; i < n; i++) {

    const v = arr[i]

    // Show input + count slot
    pushStep(steps, {
      linears: buildLinears(),

      activeIds: [
        inputId(i),
        countId(v)
      ]
    })

    // Increment count
    cntArr[v]++

    // Show updated count
    pushStep(steps, {
      linears: buildLinears(),

      sortedIds: [
        countId(v)
      ]
    })
  }

  // Prefix sum
  for (let i = 1; i <= maxVal; i++) {

    // Show prefix operation
    pushStep(steps, {
      linears: buildLinears(),

      activeIds: [
        countId(i)
      ],

      compareIds: [
        countId(i - 1)
      ]
    })

    cntArr[i] += cntArr[i - 1]

    // Show updated prefix value
    pushStep(steps, {
      linears: buildLinears(),

      sortedIds: [
        countId(i)
      ]
    })
  }

  // Build otput
  for (let i = n - 1; i >= 0; i--) {

    const v = arr[i]

    const pos = cntArr[v] - 1

    // Show target position
    pushStep(steps, {
      linears: buildLinears(),

      activeIds: [
        inputId(i),
        countId(v),
        outputId(pos)
      ]
    })

    // Place value
    ans[pos] = v

    cntArr[v]--

    // Show placed value
    pushStep(steps, {
      linears: buildLinears(),

      sortedIds: [
        outputId(pos)
      ],

      activeIds: [
        countId(v)
      ]
    })
  }

  // Final step
  pushStep(steps, {
    linears: buildLinears(),

    sortedIds: Array.from(
      { length: n },
      (_, i) => outputId(i)
    )
  })

  return steps
}

export default countingSort