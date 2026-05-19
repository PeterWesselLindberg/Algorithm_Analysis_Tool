import type { VisualizationStep } from "../types/VisualizationStep"
import type { TreeNodeData } from "../dataStructures/TreeNodedata"
import pushStep from "../utils/pushStep"
import toId from "../utils/toId"
import buildHeapTree from "../utils/buildHeapTree"

const bfsTreeTraversal = (
  inputArr: number[]
): VisualizationStep[] => {

    const steps: VisualizationStep[] = []
    const tree = buildHeapTree(inputArr);

    if (!tree) return steps

    const queue: TreeNodeData[] = [tree]

    const visitedIds: string[] = []

    while (queue.length > 0) {

        // dequeue
        const node = queue.shift()

        if (!node) continue

        // VISIT NODE
        visitedIds.push(toId(node.value))

        pushStep(steps, {
        tree: tree,

        activeIds: [node.id],

        visitedIds: [...visitedIds]
        })

        // enqueue children
        node.children?.forEach(child => {
        queue.push(child)
        })
    }

    return steps
}

export default bfsTreeTraversal