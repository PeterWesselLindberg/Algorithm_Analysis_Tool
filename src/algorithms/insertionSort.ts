const insertionSort = (arr :number[]) : void => {
    const n: number = arr.length;
    for (let i = 1; i < n; i++ ) {
        let key : number = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j+1] = arr[j];
            j = j - 1;
        }
        arr[j+1] = key;
    }
}

// const arr = [64, 34, 25, 12, 22, 11, 90];
// insertionSort(arr);
// console.log(arr)