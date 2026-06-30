import type { GraphEdge } from "./GraphEdge"

export type GraphNodeData = {
    id: string
    value: number

   x: number
   y: number

    neighbors: GraphEdge[]
    members?: string[]
}