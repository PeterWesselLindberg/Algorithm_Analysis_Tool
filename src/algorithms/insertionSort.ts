import type { SortStep } from "../types/SortStep";

const insertionSort = (arr: number[]): SortStep[] => {

    const localArr = [...arr];
    const steps: SortStep[] = [];

    const n = localArr.length;

    for (let i = 1; i < n; i++) {

        const key = localArr[i];
        let j = i - 1;

        //SHOW INITIAL COMPARISON
        steps.push({
            array: [...localArr],
            activeIndex: j,
            compareIndex: i,
        });

        while (j >= 0 && localArr[j] > key) {

            //SHIFT ELEMENT
            localArr[j + 1] = localArr[j];

            //RECORD SHIFTED ARRAY
            steps.push({
                array: [...localArr],
                activeIndex: j,
                compareIndex: j + 1,
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
        });
    }

    return steps;
};

export default insertionSort;