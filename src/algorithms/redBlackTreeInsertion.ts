import type { VisualizationStep } from "../types/VisualizationStep"
import type{ AlgorithmFunction} from "../types/algorithmtypes"
import { pushStepTree } from "../utils/pushStep"
import { insertRBNode } from "../utils/buildRedBlackTree"
import layoutTree from "../utils/layoutTree"
import type { RBTreeNodeData } from "../dataStructures/RBTreeNodeData"

const redBlackInsert: AlgorithmFunction = (input) => {
  if (input.type !== "bst") return []

  const steps: VisualizationStep[] = []

  let root: RBTreeNodeData | null

  input.values.forEach((value, index) => {

    if (!root) {

      root = {
        id: index.toString(),
        value,
        color: "black",
        x: 0,
        y: 0,
        parent: null,
        children: [null, null]
      }

      layoutTree(root)

      pushStepTree(steps, {
        tree: structuredClone(root),
        message: `Inserted root ${value}`,
      })

      return
    }

    root = insertRBNode(
      root,
      value,
      index.toString(),
      steps,
      true
    )
  })

  return steps
}

export default redBlackInsert