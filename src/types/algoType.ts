/** Algorithm types for the complexity table */
const Algo = {
    Sorting: "Sorting algorithm",
    Search: "Search algorithm",
    SPath: "Single source shortest path algorithm",
    Traversal: "Traversal algorithm",
    MaxFlow: "Maximum flow algorithm",
    MinSpan: "Minimum spanning tree algorithm",
    SearchTraversal: "Search/Traversal algorithm"
} as const

export type AlgoType = typeof Algo[keyof typeof Algo]

export default Algo