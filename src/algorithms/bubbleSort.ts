import type { VisualizationStep } from "../types/VisualizationStep";
import pushStep from "../utils/pushStep";
import toId from "../utils/toId";

const bubbleSort = (inputArr : number[]) : VisualizationStep[]  => {
    const arr = [...inputArr]
    const steps: VisualizationStep[] = [];
    const n: number = arr.length;

    let swapped : Boolean;
    for (let i = 0; i < n-1; i++ ) {
        swapped = false;
        
        const sortedIds =
            Array.from(
                { length: i },
                (_, k) => (n - 1 - k).toString()
            );

        for (let j = 0; j < n - i - 1; j++) {

            //SHOW INITIAL COMPARISON
           pushStep(steps, {
                linear: { values: [...arr] },
                activeIds: [toId(j)],
                compareIds: [toId(j + 1)],
                sortedIds
            })

            // SWAP
            if ( arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]]

                swapped = true

                //SHOW SWAPPED ARRAY
                pushStep(steps, {
                    linear: { values: [...arr] },
                    activeIds: [toId(j)],
                    compareIds: [toId(j + 1)],
                    sortedIds
                })
            }
        
        }
        if (!swapped) {
            break;
        }
    }

    pushStep(steps, {
        linear: { values: [...arr] },
        sortedIds: Array.from(
        { length: n },
        (_, i) => i.toString()
        )
    })

    return steps
}

// const arr = [64, 34, 25, 12, 22, 11, 90];
// bubbleSort(arr)
// console.log(arr)
export default bubbleSort;