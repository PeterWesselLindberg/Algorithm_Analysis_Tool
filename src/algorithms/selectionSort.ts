import type { AlgorithmInput } from "../types/algorithmtypes"
import type { VisualizationStep } from "../types/VisualizationStep"
import { pushStep } from "../utils/pushStep"
import toId from "../utils/toId"

const selectionSort = (input : AlgorithmInput) : VisualizationStep[]  => {
    
    // Selection sort only supports arrays
    if (input.type !== "array") {
        return []
    }

    const inputArr = input.data
    const arr = [...inputArr]
    const steps: VisualizationStep[] = [];
    const n: number = arr.length;

    for (let i = 0; i < n - 1; i++) {

        let minIndex = i;

        // Current sorted section
        const sortedIds =
            Array.from(
                { length: i },
                (_, k) => toId(k)
            );

        for (let j = i + 1; j < n; j++) {

            // Show initial comparison
            pushStep(steps, {
                linear: { values: [...arr] },
                activeIds: [toId(minIndex)],
                compareIds: [toId(j)],
                sortedIds
            })

            if (arr[j] < arr[minIndex]) {
                
                minIndex = j;

                pushStep(steps, {
                    linear: { values: [...arr] },
                    activeIds: [toId(minIndex)],
                    compareIds: [toId(j)],
                    sortedIds
                })
            }
        }

        let temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;

        // Record swapped array
        pushStep(steps, {
            linear: { values: [...arr] },
            activeIds: [toId(i)],
            compareIds: [toId(minIndex)],
            sortedIds:
                Array.from(
                    { length: i + 1 },
                    (_, k) => toId(k)
                )
        });
    }
    

    // Final step
    pushStep(steps, {
        linear: { values: [...arr] },
        sortedIds:
            Array.from(
                { length: n },
                (_, i) => toId(i)
            )
    });

    return steps
}

export default selectionSort