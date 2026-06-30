import type { TreeNodeData } from "../dataStructures/TreeNodedata"

const buildHeapTree = (arr: number[]): TreeNodeData | null => {

    const NODE_X_GAP = 30
    const TOP_PADDING = 40
    const NODE_Y_GAP = 90
    const ROOT_X = 500

    const build = (
        i: number,
        depth: number,
        x: number
    ): TreeNodeData | null => {

        if (i >= arr.length) return null

        const left = 2 * i + 1
        const right = 2 * i + 2

        const offset = NODE_X_GAP * Math.pow(2, Math.max(3 - depth, 0))

        const node: TreeNodeData = {
            id: i.toString(),
            x,
            y: TOP_PADDING + depth * NODE_Y_GAP,
            value: arr[i],
            children: [null, null]   // Fixed tuple
        }

        const leftNode = build(left, depth + 1, x - offset)
        const rightNode = build(right, depth + 1, x + offset)

        node.children[0] = leftNode
        node.children[1] = rightNode

        return node
    }

    return build(0, 0, ROOT_X)
}


export default buildHeapTree