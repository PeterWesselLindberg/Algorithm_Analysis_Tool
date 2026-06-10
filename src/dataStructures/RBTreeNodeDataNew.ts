export type RBTreeNodeDataNew = {
  id: string
  value: number

  color: "red" | "black"

  parent?: RBTreeNodeDataNew | null

  children: [RBTreeNodeDataNew | null, RBTreeNodeDataNew | null]

  x: number
  y: number
}