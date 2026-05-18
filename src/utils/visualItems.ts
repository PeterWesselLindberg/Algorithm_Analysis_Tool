export const addBeforeLastElm = (arr: string[], elms: string[]) : string[] => {
    const arrCopy = arr.slice()
    elms.reverse()
    elms.map(elm => 
    arrCopy.splice(arr.length - 1, 0, elm))

    return arrCopy
}

export const addToList = (arr: string[], elms: string[]) : string[] => {
    const arrCopy = arr.slice()
    elms.map(elm => 
    arrCopy.push(elm))
    
    return arrCopy
}

const visualItems : string[] = ["Readme.md", "Visualizer"]

export default visualItems
