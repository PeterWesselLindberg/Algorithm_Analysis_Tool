import type { AlgorithmInput } from "../types/algorithmtypes"
import type { VisualizationStep } from "../types/VisualizationStep"
import { pushStep } from "../utils/pushStep"
import toId from "../utils/toId"

const nthFactorial = (input: AlgorithmInput): VisualizationStep[] => {
  
    // Nth factorial only supports arrays
    if (input.type !== "array") return []
  
    const inputArr = input.data
    const n = inputArr[0]
    const steps: VisualizationStep[] = []

    // Same size as input
    const values = new Array(n).fill(0)

    let factorial = 1

    // Initial empty step
    pushStep(steps, {
        linear: {values: [...values]}
    })

    for (let i = 1; i <= n; i++) {

        factorial *= i

        // Highlight current index
        pushStep(steps, {
            linear: {values: [...values]},
            activeIds: [toId(i - 1)]
        })

        // Insert factorial
        values[i - 1] = factorial

        // Show updated array
        pushStep(steps, {
            linear: {values: [...values]},
            activeIds: [toId(i - 1)],
            sortedIds: Array.from(
                { length: i },
                (_, k) => toId(k)
            )
        })
    }

    // FINAL STEP
    pushStep(steps, {
        linear: {values: [...values]},
        sortedIds: Array.from(
            { length: n },
            (_, i) => toId(i)
        )
    })

    return steps
}

export default nthFactorial