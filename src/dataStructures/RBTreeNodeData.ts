export type RBTreeNodeData = {
    id: string
    value: number

    color: "red" | "black"

    parent: RBTreeNodeData | null

    children: [RBTreeNodeData | null, RBTreeNodeData| null]

    x: number
    y: number
}