import type { SortStep } from "../types/SortStep";

const bubbleSort = (inputArr : number[]) : SortStep[]  => {
    const arr = [...inputArr]
    const steps: SortStep[] = [];
    const n: number = arr.length;

    let swapped : Boolean;
    for (let i = 0; i < n-1; i++ ) {
        swapped = false;
        
        const sortedIndices =
            Array.from(
                { length: i },
                (_, k) => n - 1 - k
            );

        for (let j = 0; j < n - i - 1; j++) {

            //SHOW INITIAL COMPARISON
            steps.push({
                array: [...arr],
                activeIndex: j,
                compareIndex: j+1,
                sortedIndices
            });

            // SWAP
            if ( arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]]

                swapped = true

                //SHOW SWAPPED ARRAY
                steps.push({
                    array: [...arr],
                    activeIndex: j,
                    compareIndex: j + 1,
                    sortedIndices
                });
            }
        
        }
        if (!swapped) {
            break;
        }
    }

    steps.push({
        array: [...arr],
        sortedIndices:
            Array.from(
                { length: n },
                (_, i) => i
            )
    });

    return steps
}

// const arr = [64, 34, 25, 12, 22, 11, 90];
// bubbleSort(arr)
// console.log(arr)
export default bubbleSort;