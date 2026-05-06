import type { SortStep } from "./SortStep";

const insertionSort = (arr :number[]) : SortStep[] => {
    const localArr = [...arr]
    const steps : SortStep[] = []
    const n: number = localArr.length;

    for (let i = 1; i < n; i++ ) {
        let key : number = localArr[i];
        let j = i - 1;
        while (j >= 0 && localArr[j] > key) {
            localArr[j+1] = localArr[j];
            j = j - 1;
            steps.push({
                array: [...localArr],
                activeIndex: i,
                compareIndex: j,
            })
        }
        localArr[j+1] = key;
        steps.push({
                array: [...localArr],
                activeIndex: i,
                compareIndex: j,
            })
    }
    return steps
}

export default insertionSort
//const arr = [5,2,8,1];
// insertionSort(arr);
//console.log(insertionSort(arr))