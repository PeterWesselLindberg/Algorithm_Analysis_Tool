export const addBeforeLastElm = (arr: string[], elms: string[]) : string[] => {
    const arrCopy = arr.slice()
    elms.reverse()
    elms.map(elm => 
    arrCopy.splice(arr.length - 1, 0, elm))

    return arrCopy
}

const visualItems : string[] = ["Visualizer", "Readme.md"]

export default visualItems
