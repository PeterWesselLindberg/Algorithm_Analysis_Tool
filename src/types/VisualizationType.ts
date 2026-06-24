/** Visualizer types for the case statement */
const Visualization = {
    ListBar: "list/bar",
    ListHeap: "list/heap",
    List3: "list/list/list",
    List: "list",
    ListTree: "list/tree",
    ListGraph: "list/graph",
    DistListGraph: "distList/graph",
    MstListGraph: "mstList/graph",
    ExListTree: "exList/tree",
    TVListTree: "TVList/tree",
    TListBar: "TList/bar",
    MaxFlowListGraph: "maxFlowList/graph",
    RandMinCutListGraph: "randMinCutList/graph"
} as const

export type VisualizationType = typeof Visualization[keyof typeof Visualization]

export default Visualization