import type { VisualizationStep } from "../types/VisualizationStep"
import type{ AlgorithmFunction} from "../types/algorithmtypes"
import type { RBTreeNodeData } from "../dataStructures/RBTreeNodeData"
import { pushStepTree } from "../utils/pushStep"
import layoutTree from "../utils/layoutTree"
import buildRedBlackTree from "../utils/buildRedBlackTree"
import { rotateLeft, rotateRight } from "../utils/buildRedBlackTree"

/** Helper function to extract values when removing the node from the tree in the edge case */
const extractValues = (node?: RBTreeNodeData): number[] => {
  if (!node) return []

  return [
    node.value,
    ...(node.children?.[0] ? extractValues(node.children[0]) : []),
    ...(node.children?.[1] ? extractValues(node.children[1]) : [])
  ]
}

const RBDelete: AlgorithmFunction = (input) => {

    if (input.type !== "bst") return []

    const steps: VisualizationStep[] = []

    const root = buildRedBlackTree(input.values)
    const target = input.target

    if (!root) return []

    layoutTree(root)

    pushStepTree(steps, {
        tree: structuredClone(root),
        message: "Red-Black tree built",
        target
    })

    const newRoot = deleteRBNode(
        root,
        root,
        target,
        steps
    )

    if (newRoot) {
        layoutTree(newRoot)

        pushStepTree(steps, {
            tree: structuredClone(newRoot),
            message: `Deleted ${target}`,
            target
        })
    }

    return steps
}

const deleteRBNode = (
    visualRoot: RBTreeNodeData,
    node: RBTreeNodeData | undefined,
    target: number,
    steps: VisualizationStep[]
): RBTreeNodeData | undefined => {

    if (!node) return undefined
    
    // Visit node
    pushStepTree(steps, {
        tree: structuredClone(visualRoot),
        activeIds: [node.id],
        message: `Checking ${node.value}`,
        target
    })

    // Go left
    if (target < node.value) {

        const child = node.children?.[0]

        if (child) {
            pushStepTree(steps, {
                tree: structuredClone(visualRoot),
                activeIds: [node.id, child.id],
                activeEdgeIds: [`${node.id}->${child.id}`],
                target
            })
        }

        if (child &&
            child.value === target &&
            !child.children?.[0] &&
            !child.children?.[1]
        ) {

            // Visit node
            pushStepTree(steps, {
                tree: structuredClone(visualRoot),
                activeIds: [child.id],
                message: `Checking ${child.value}`,
                target
            })

            // Found node
            pushStepTree(steps, {
                tree: structuredClone(visualRoot),
                activeIds: [child.id],
                message: `Found ${target} for deletion`,
                target
            })

            pushStepTree(steps, {
                tree: structuredClone(visualRoot),
                deletingIds: [child.id],
                message: `Deleting leasf node ${child.value}`,
                target
            })

            // Rebuild strategy for edge case
            const newValues = extractValues(node).filter(v => v !== target)
            const rebuilt = buildRedBlackTree(newValues)

            if (!rebuilt) return undefined
            layoutTree(rebuilt)

            

            return rebuilt
        }


        // Normal recursion
        const result = deleteRBNode(visualRoot, child, target, steps)

        if (result) {
            node.children![0] = result
        } 
        
        else {
            node.children!.splice(0, 1)
        }

        return node
    }

    // Go right
    if (target > node.value) {

        const child = node.children?.[1]

        if (child) {
            pushStepTree(steps, {
                tree: structuredClone(visualRoot),
                activeIds: [node.id, child.id],
                activeEdgeIds: [`${node.id}->${child.id}`],
                target
            })
        }

        const result = deleteRBNode(visualRoot, node.children?.[1], target, steps)

        if (result) {
            node.children![1] = result
        } 
        
        else {
            node.children!.splice(1, 1)
        }

        return node
    }

    // Found node

    pushStepTree(steps, {
        tree: structuredClone(visualRoot),
        activeIds: [node.id],
        message: `Found ${target} for deletion`,
        target
    })

    // Case 1: Leaf
    if (!node.children?.[0] && !node.children?.[1]) {

        pushStepTree(steps, {
            tree: structuredClone(visualRoot),
            deletingIds: [node.id],
            message: `Deleting leaf node ${node.value}`,
            target
        })

        if (node.color === "red") return undefined

        return fixDeletion(visualRoot, steps, node)
    }

    // Case 2: Only right child
    if (!node.children?.[0]) {

        const child = node.children?.[1]

        pushStepTree(steps, {
            tree: structuredClone(visualRoot),
            deletingIds: [node.id],
            replacementIds: [child!.id],
            message: `Replacing ${node.value} with right child`,
            target
        })

        if (node.color === "black" && child?.color === "red") {

            child.color = "black"

            pushStepTree(steps,{
                tree: structuredClone(visualRoot),
                replacementIds:[child.id],
                message:"Child recolored black"
            })
        }

        return child
    }

    // Case 3: Only left child
    if (!node.children?.[1]) {

        const child = node.children?.[0]

        pushStepTree(steps, {
            tree: structuredClone(visualRoot),
            deletingIds: [node.id],
            replacementIds: [child!.id],
            message: `Replacing ${node.value} with left child`,
            target
        })

        if (node.color === "black" && child?.color === "red") {

            child.color = "black"

            pushStepTree(steps,{
                tree: structuredClone(visualRoot),
                replacementIds:[child.id],
                message:"Child recolored black"
            })
        }

        return child
    }

    // Case 4: Two children

    const successor = findMin(node.children[1])

    // Step 1: Highlight node + successor
    pushStepTree(steps, {
        tree: structuredClone(visualRoot),
        activeIds: [node.id, successor.id],
        message: `Found successor ${successor.value}`,
        activeEdgeIds: [`${node.id}->${successor.id}`],
        target
    })

    // Step 2: Mark node as being replaced
    pushStepTree(steps, {
        tree: structuredClone(visualRoot),
        deletingIds: [node.id],
        replacementIds: [successor.id],
        message: `Replacing ${node.value} with ${successor.value}`,
        target
    })

    const successorColor = successor.color
    node.value = successor.value

    // Step 3: Replace values
    pushStepTree(steps, {
        tree: structuredClone(visualRoot),
        replacementIds: [node.id],
        message: `Value updated to ${successor.value}`,
        target
    })

    const deletedNode = node.children[1]

    const result = deleteRBNode(
        visualRoot,
        deletedNode,
        successor.value,
        steps
    )

    if (result) {
        node.children![1] = result
    } 
    
    else {
        node.children!.splice(1, 1)
    }

    // Step 4: Show rebalancing
    if(successorColor === "black") {

        pushStepTree(steps, {
            tree: structuredClone(visualRoot),
            message: `Fixing black-height violation`,
            replacementIds: [node.id],
            target
        })
        
        visualRoot = fixDeletion(visualRoot, steps, successor)
        
    }
    pushStepTree(steps, {
        tree: structuredClone(visualRoot),
        message: `Tree rebalanced after deletion`,
        replacementIds: [node.id],
        target
    })

    return node
}


const fixDeletion = (
    root: RBTreeNodeData,
    steps: VisualizationStep[],
    node?: RBTreeNodeData,
    
): RBTreeNodeData => {
    
    let current = node

    pushStepTree(steps, {
        tree: structuredClone(root),
        message: `Entering fixDeletion with ${
            current ? current.value : "undefined"
        }`
    })
    
    while (current !== root && current?.color === "black") {

        const parent = current.parent

        if (!parent) break

        // Current is left child
        if (current === parent.children?.[0]) {

            let sibling = parent.children?.[1]

            // Case 1
            if (sibling?.color === "red") {

                pushStepTree(steps, {
                    tree: structuredClone(root),
                    activeIds: [parent.id, sibling.id],
                    message: "Delete Fix Case 1: Red sibling"
                })

                sibling.color = "black"
                parent.color = "red"

                pushStepTree(steps, {
                    tree: structuredClone(root),
                    activeIds: [parent.id, sibling.id],
                    message: "Recolor sibling black and parent red"
                })

                root = rotateLeft(root, parent)

                layoutTree(root)

                pushStepTree(steps, {
                    tree: structuredClone(root),
                    activeIds: [parent.id],
                    message: "Rotate left around parent"
                })

                sibling = parent.children?.[1]
            }

            const leftBlack = !sibling?.children?.[0] || sibling.children[0].color === "black"

            const rightBlack = !sibling?.children?.[1] || sibling.children[1].color === "black"

            // Case 2
            if (leftBlack && rightBlack) {

                pushStepTree(steps, {
                    tree: structuredClone(root),
                    activeIds: [parent.id, sibling?.id ?? ""],
                    message: "Delete Fix Case 2: Black sibling with black children"
                })

                if (sibling) sibling.color = "red"

                pushStepTree(steps, {
                    tree: structuredClone(root),
                    activeIds: [parent.id],
                    message: "Push extra blackness upward"
                })

                current = parent
                continue
            }

            // Case 3
            if (
                sibling?.children?.[0]?.color === "red" &&
                (!sibling.children?.[1] || sibling.children[1].color === "black")
            ) {

                pushStepTree(steps, {
                    tree: structuredClone(root),
                    activeIds: [sibling.id, sibling.children[0].id],
                    message: "Delete Fix Case 3: Inner red nephew"
                })

                sibling.children[0].color = "black"
                sibling.color = "red"

                pushStepTree(steps, {
                    tree: structuredClone(root),
                    activeIds: [sibling.id],
                    message: "Recolor before rotation"
                })

                root = rotateRight(root, sibling)

                layoutTree(root)

                pushStepTree(steps, {
                    tree: structuredClone(root),
                    message: "Rotate right around sibling"
                })

                sibling = parent.children?.[1]
            }

            // Case 4
            if ( sibling && sibling.children?.[1]?.color === "red") {

                pushStepTree(steps, {
                    tree: structuredClone(root),
                    activeIds: [parent.id, sibling.id, sibling.children[1].id],
                    message: "Delete Fix Case 4: Outer red nephew"
                })

                sibling.color = parent.color
                parent.color = "black"
                sibling.children[1].color = "black"

                pushStepTree(steps, {
                    tree: structuredClone(root),
                    activeIds: [parent.id, sibling.id],
                    message: "Recolor before final rotation"
                })

                root = rotateLeft(root, parent)

                layoutTree(root)

                pushStepTree(steps, {
                    tree: structuredClone(root),
                    message: "Rotate left and restore red-black properties"
                })

                current = root
            }
        }

        // Current is right child
        else {

            let sibling = parent.children?.[0]

            // Case 1
            if (sibling?.color === "red") {

                pushStepTree(steps, {
                    tree: structuredClone(root),
                    activeIds: [parent.id, sibling.id],
                    message: "Delete Fix Case 1: Red sibling"
                })

                sibling.color = "black"
                parent.color = "red"

                pushStepTree(steps, {
                    tree: structuredClone(root),
                    activeIds: [parent.id, sibling.id],
                    message: "Recolor sibling black and parent red"
                })

                root = rotateRight(root, parent)

                layoutTree(root)

                pushStepTree(steps, {
                    tree: structuredClone(root),
                    activeIds: [parent.id],
                    message: "Rotate right around parent"
                })

                sibling = parent.children?.[0]
            }

            const leftBlack = !sibling?.children?.[0] || sibling.children[0].color === "black"

            const rightBlack = !sibling?.children?.[1] || sibling.children[1].color === "black"

            // Case 2
            if (leftBlack && rightBlack) {

                
                pushStepTree(steps, {
                    tree: structuredClone(root),
                    activeIds: [parent.id, sibling?.id ?? ""],
                    message: "Delete Fix Case 2: Black sibling with black children"
                })

                if (sibling) sibling.color = "red"

                pushStepTree(steps, {
                    tree: structuredClone(root),
                    activeIds: [parent.id],
                    message: "Push extra blackness upward"
                })

                current = parent
                continue
            }

            // Case 3
            if (
                sibling?.children?.[0]?.color === "red" &&
                (!sibling.children?.[1] || sibling.children[1].color === "black")
            ) {

               pushStepTree(steps, {
                    tree: structuredClone(root),
                    activeIds: [sibling.id, sibling.children[0].id],
                    message: "Delete Fix Case 3: Inner red nephew"
                })

                sibling.children[0].color = "black"
                sibling.color = "red"

                pushStepTree(steps, {
                    tree: structuredClone(root),
                    activeIds: [sibling.id],
                    message: "Recolor before rotation"
                })

                root = rotateLeft(root, sibling)

                layoutTree(root)

                pushStepTree(steps, {
                    tree: structuredClone(root),
                    message: "Rotate left around sibling"
                })

                sibling = parent.children?.[0]
            }

            // Case 4
            if ( sibling && sibling.children?.[1]?.color === "red") {

                pushStepTree(steps, {
                    tree: structuredClone(root),
                    activeIds: [parent.id, sibling.id, sibling.children[1].id],
                    message: "Delete Fix Case 4: Outer red nephew"
                })

                sibling.color = parent.color
                parent.color = "black"
                sibling.children[1].color = "black"

                pushStepTree(steps, {
                    tree: structuredClone(root),
                    activeIds: [parent.id, sibling.id],
                    message: "Recolor before final rotation"
                })

                root = rotateRight(root, parent)

                layoutTree(root)

                pushStepTree(steps, {
                    tree: structuredClone(root),
                    message: "Rotate right and restore red-black properties"
                })

                current = root
            }

        }
    }

    if (current && current.color !== "black") {

        pushStepTree(steps, {
            tree: structuredClone(root),
            activeIds: [current.id],
            message: "Color node black"
        })

        current.color = "black"

        pushStepTree(steps, {
            tree: structuredClone(root),
            activeIds: [current.id],
            message: "Deletion fix complete"
        })
    }

    return root
}

/** Helper function to find successor */
const findMin = (
    node: RBTreeNodeData
): RBTreeNodeData => {

    let current = node

    while (current.children?.[0]) {
        current = current.children[0]
    }

    return current
}

export default RBDelete