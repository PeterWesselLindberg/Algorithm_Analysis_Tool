/** DataStructure types for the complexity table */
const DataStructure = {
    Arr: "Array/List",
    Graph: "Graph",
} as const

export type DataType = typeof DataStructure[keyof typeof DataStructure]

export default DataStructure