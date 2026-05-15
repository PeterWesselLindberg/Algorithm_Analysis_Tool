import type { VisualizationStep } from "../types/VisualizationStep"
import pushStep from "../utils/pushStep"
import toId from "../utils/toId"

const selectionSort = (inputArr : number[]) : VisualizationStep[]  => {
    const arr = [...inputArr]
    const steps: VisualizationStep[] = [];
    const n: number = arr.length;

    for (let i = 0; i < n - 1; i++) {

        let minIndex = i;

        //CURRENT SORTED SECTION
        const sortedIds =
            Array.from(
                { length: i },
                (_, k) => toId(k)
            );

        for (let j = i + 1; j < n; j++) {

            //SHOW INITIAL COMPARISON
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

        //RECORD SWAPPED ARRAY
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
    

    // FINAL ALL-SORTED STEP
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