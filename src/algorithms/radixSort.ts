import type { VisualizationStep } from "../types/VisualizationStep"

import pushStep from "../utils/pushStep"

const inputId = (i: number) => `input-${i}`

const countId = (i: number) => `count-${i}`

const outputId = (i: number) => `output-${i}`

const getMax = (arr: number[]) => {
  let max = arr[0]

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i]
    }
  }

  return max
}

const countSortByDigit = (
  arr: number[],
  exp: number,
  steps: VisualizationStep[]
) => {

  const n = arr.length

  const output = new Array(n).fill(0)

  const count = new Array(10).fill(0)

  const buildLinears = () => [
    {
      id: "input",
      label: `Working Array (exp=${exp})`,
      values: [...arr]
    },

    {
      id: "count",
      label: "Digit Count",
      values: [...count]
    },

    {
      id: "output",
      label: "Output Array",
      values: [...output]
    }
  ]

  // COUNT DIGITS
  for (let i = 0; i < n; i++) {

    const digit =
      Math.floor(arr[i] / exp) % 10

    // SHOW DIGIT ACCESS
    pushStep(steps, {
      linears: buildLinears(),

      activeIds: [
        inputId(i),
        countId(digit)
      ]
    })

    count[digit]++

    // SHOW UPDATED COUNT
    pushStep(steps, {
      linears: buildLinears(),

      sortedIds: [
        countId(digit)
      ]
    })
  }

  // PREFIX SUM
  for (let i = 1; i < 10; i++) {

    pushStep(steps, {
      linears: buildLinears(),

      activeIds: [
        countId(i)
      ],

      compareIds: [
        countId(i - 1)
      ]
    })

    count[i] += count[i - 1]

    pushStep(steps, {
      linears: buildLinears(),

      sortedIds: [
        countId(i)
      ]
    })
  }

  // BUILD OUTPUT
  for (let i = n - 1; i >= 0; i--) {

    const digit =
      Math.floor(arr[i] / exp) % 10

    const pos = count[digit] - 1

    // SHOW TARGET POSITION
    pushStep(steps, {
      linears: buildLinears(),

      activeIds: [
        inputId(i),
        countId(digit),
        outputId(pos)
      ]
    })

    output[pos] = arr[i]

    count[digit]--

    // SHOW INSERTED VALUE
    pushStep(steps, {
      linears: buildLinears(),

      sortedIds: [
        outputId(pos)
      ],

      activeIds: [
        countId(digit)
      ]
    })
  }

  // COPY BACK
  for (let i = 0; i < n; i++) {

    pushStep(steps, {
      linears: buildLinears(),

      activeIds: [
        outputId(i),
        inputId(i)
      ]
    })

    arr[i] = output[i]

    pushStep(steps, {
      linears: buildLinears(),

      sortedIds: [
        inputId(i)
      ]
    })
  }
}

const radixSort = (
  inputArr: number[]
): VisualizationStep[] => {

  const arr = [...inputArr]

  const steps: VisualizationStep[] = []

  const maxNumber = getMax(arr)

  // PROCESS EACH DIGIT
  for (
    let exp = 1;
    Math.floor(maxNumber / exp) > 0;
    exp *= 10
  ) {

    countSortByDigit(
      arr,
      exp,
      steps
    )
  }

  // FINAL STEP
  pushStep(steps, {

    linears: [
      {
        id: "input",
        label: "Sorted Array",
        values: [...arr]
      }
    ],

    sortedIds: Array.from(
      { length: arr.length },
      (_, i) => inputId(i)
    )
  })

  return steps
}

export default radixSort