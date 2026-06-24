/** StructureColor types for graph coloring scheme*/
const StructureColor = {
    ArrColor: "ArrayColor",
    ShortestPathColor: "ShortestPathColor",
    TraversalColor: "TraversalColor",
    MSTColor: "MSTColor",
    BSTColor: "BSTColor",
    MaxFlowColor: "MaxFlowColor",
    JustYellow: "JustYellow"
} as const

export type ColorExplainer = typeof StructureColor[keyof typeof StructureColor]

export default StructureColor