export const addToList = (arr: string[], elms: string[]) : string[] => {
    const arrCopy = arr.slice()
    elms.map(elm => 
        arrCopy.push(elm))
    
    return arrCopy
}

export const oneItem: string[] = ["About"]
const visualItems : string[] = ["About", "Visualizer"]

export default visualItems
