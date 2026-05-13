import type { SortStep } from "../types/SortStep"
const selectionSort = (inputArr : number[]) : SortStep[]  => {
    const arr = [...inputArr]
    const steps: SortStep[] = [];
    const n: number = arr.length;

    for (let i = 0; i < n - 1; i++) {

        let minIndex = i;

        //CURRENT SORTED SECTION
        const sortedIndices =
            Array.from(
                { length: i },
                (_, k) => k
            );

        for (let j = i + 1; j < n; j++) {

            //SHOW INITIAL COMPARISON
            steps.push({
                array: [...arr],
                activeIndex: minIndex,
                compareIndex: j,
                sortedIndices
            });

            if (arr[j] < arr[minIndex]) {
                
                minIndex = j;

                steps.push({
                    array: [...arr],
                    activeIndex: minIndex,
                    compareIndex: j,
                    sortedIndices
                });
            }
        }

        let temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;

        //RECORD SWAPPED ARRAY
        steps.push({
            array: [...arr],
            activeIndex: i,
            compareIndex: minIndex,
            sortedIndices:
                Array.from(
                    { length: i + 1 },
                    (_, k) => k
                )
        });
    }
    

    // FINAL ALL-SORTED STEP
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

export default selectionSort