export type TreeNodeDataNew = {
  id: string
  x: number
  y: number
  value: number
  children: [TreeNodeDataNew | null, TreeNodeDataNew | null]
}