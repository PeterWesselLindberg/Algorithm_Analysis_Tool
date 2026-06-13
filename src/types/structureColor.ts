/** StructureColor types for graph coloring scheme*/
const StructureColor = {
    ArrColor: "ArrayColor",
    ShortestPathColor: "ShortestPathColor",
    TraversalColor: "TraversalColor",
    MSTColor: "MSTColor",
    BSTColor: "BSTColor",
} as const

export type ColorExplainer = typeof StructureColor[keyof typeof StructureColor]

export default StructureColor