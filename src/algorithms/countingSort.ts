import type { VisualizationStep } from "../types/VisualizationStep"

import pushStep from "../utils/pushStep"

const inputId = (i: number) => `input-${i}`

const countId = (i: number) => `count-${i}`

const outputId = (i: number) => `output-${i}`

const countingSort = (
  inputArr: number[]
): VisualizationStep[] => {

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

  // COUNT OCCURRENCES
  for (let i = 0; i < n; i++) {

    const v = arr[i]

    // SHOW INPUT + COUNT SLOT
    pushStep(steps, {
      linears: buildLinears(),

      activeIds: [
        inputId(i),
        countId(v)
      ]
    })

    // INCREMENT COUNT
    cntArr[v]++

    // SHOW UPDATED COUNT
    pushStep(steps, {
      linears: buildLinears(),

      sortedIds: [
        countId(v)
      ]
    })
  }

  // PREFIX SUM
  for (let i = 1; i <= maxVal; i++) {

    // SHOW PREFIX OPERATION
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

    // SHOW UPDATED PREFIX VALUE
    pushStep(steps, {
      linears: buildLinears(),

      sortedIds: [
        countId(i)
      ]
    })
  }

  // BUILD OUTPUT
  for (let i = n - 1; i >= 0; i--) {

    const v = arr[i]

    const pos = cntArr[v] - 1

    // SHOW TARGET POSITION
    pushStep(steps, {
      linears: buildLinears(),

      activeIds: [
        inputId(i),
        countId(v),
        outputId(pos)
      ]
    })

    // PLACE VALUE
    ans[pos] = v

    cntArr[v]--

    // SHOW PLACED VALUE
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

  // FINAL STEP
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