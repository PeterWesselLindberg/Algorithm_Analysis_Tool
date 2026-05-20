import type { GraphNodeData } from "./GraphNodeData"

export type GraphData = {

  nodes: GraphNodeData[]
  directed?: boolean
  // edges: {
  //   from: string
  //   to: string
  // }[]
}