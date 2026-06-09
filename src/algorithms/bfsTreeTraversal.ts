import type { VisualizationStep } from "../types/VisualizationStep"
import pushStepTree from "../utils/pushStep"
import toId from "../utils/toId"
import buildHeapTree from "../utils/buildHeapTree"
import type { AlgorithmInput } from "../types/algorithmtypes"
import type { TreeNodeDataNew } from "../dataStructures/TreeNodedataNew"

/** Breadth first traversal of a search tree */
const bfsTreeTraversal = (input: AlgorithmInput): VisualizationStep[] => {

    // Bfs traversal only supports arrays
    if (input.type !== "array") {
        return []
    }
    const inputArr = input.data
    const steps: VisualizationStep[] = []
    const tree = buildHeapTree(inputArr);

    if (!tree) return steps

    const queue: TreeNodeDataNew[] = [tree]

    const visitedIds: string[] = []

    while (queue.length > 0) {

        // Dequeue
        const node = queue.shift()

        if (!node) continue

        // Visit node
        visitedIds.push(toId(node.value))

        pushStepTree(steps, {
        tree: tree,
        activeIds: [node.id],
        visitedIds: [...visitedIds]
        })

        // Enqueue children
        const [left, right] = node.children

        if (left) {
            queue.push(left)
        }

        if (right) {
            queue.push(right)
        }
    }

    return steps
}

export default bfsTreeTraversal