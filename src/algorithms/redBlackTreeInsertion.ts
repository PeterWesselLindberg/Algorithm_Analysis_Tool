import type { VisualizationStep } from "../types/VisualizationStep"
import type{ AlgorithmFunction} from "../types/algorithmtypes"
import type { RBTreeNodeData } from "../dataStructures/RBTreeNodeData"
import pushStep from "../utils/pushStep"
import { insertRBNode } from "../utils/buildRedBlackTree"
import layoutTree from "../utils/layoutTree"

const redBlackInsert: AlgorithmFunction = (input) => {
  if (input.type !== "bst") return []

  const steps: VisualizationStep[] = []

  let root: RBTreeNodeData | undefined

  input.values.forEach((value, index) => {

    if (!root) {

      root = {
        id: index.toString(),
        value,
        color: "black",
        x: 0,
        y: 0,
        children: []
      }

      layoutTree(root)

      pushStep(steps, {
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