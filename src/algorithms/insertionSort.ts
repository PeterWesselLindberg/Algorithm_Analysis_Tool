import type { SortStep } from "../types/SortStep";

const insertionSort = (arr: number[]): SortStep[] => {

    const localArr = [...arr];
    const steps: SortStep[] = [];

    const n = localArr.length;

    for (let i = 1; i < n; i++) {

        const key = localArr[i];
        let j = i - 1;

        //CURRENT SORTED SECTION
        const sortedIndices =
            Array.from(
                { length: i },
                (_, k) => k
            );

        //SHOW INITIAL COMPARISON
        steps.push({
            array: [...localArr],
            activeIndex: j,
            compareIndex: i,
            sortedIndices
        });

        while (j >= 0 && localArr[j] > key) {

            //SHIFT ELEMENT
            localArr[j + 1] = localArr[j];

            //RECORD SHIFTED ARRAY
            steps.push({
                array: [...localArr],
                activeIndex: j,
                compareIndex: j + 1,
                sortedIndices
            });

            j--;
        }

        //INSERT KEY
        localArr[j + 1] = key;

        // RECORD INSERTION
        steps.push({
            array: [...localArr],
            activeIndex: j + 1,
            compareIndex: i,
            sortedIndices: Array.from(
            { length: i + 1 },
            (_, index) => index
            )
        });
    }

     // FINAL ALL-SORTED STEP
    steps.push({
        array: [...localArr],
        sortedIndices:
            Array.from(
                { length: n },
                (_, i) => i
            )
    });

    return steps;
};

export default insertionSort;