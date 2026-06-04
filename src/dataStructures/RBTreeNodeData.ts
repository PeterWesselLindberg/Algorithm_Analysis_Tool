export type RBTreeNodeData = {
  id: string
  value: number

  color: "red" | "black"

  parent?: RBTreeNodeData

  children?: RBTreeNodeData[]

  x: number
  y: number
}