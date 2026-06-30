import type { VisualizationStep } from "../types/VisualizationStep"
import type{ AlgorithmFunction} from "../types/algorithmtypes"
import { pushStepTree } from "../utils/pushStep"
import layoutTree from "../utils/layoutTree"
import buildRedBlackTree from "../utils/buildRedBlackTree"
import { rotateLeft, rotateRight } from "../utils/buildRedBlackTree"
import type { RBTreeNodeData } from "../dataStructures/RBTreeNodeData"

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

    // Step 1: Find node
    const node = findNode(root, target, steps)

    if (!node) {
        pushStepTree(steps, {
            tree: structuredClone(root),
            message: `Node ${target} not found`
        })
        return steps
    }

    // Step 2: Delete by reference
    const newRoot = deleteRBNode(
        root,
        node,
        steps
    )

    // Step 3: Final layout + step
    if (newRoot) {
        layoutTree(newRoot)

        pushStepTree(steps, {
            tree: structuredClone(newRoot),
            message: `Rebalancing tree`,
            target
        })
    }

    return steps
}

const deleteRBNode = (
    root: RBTreeNodeData,
    z: RBTreeNodeData,
    steps: VisualizationStep[]
): RBTreeNodeData => {

    const target = z.value
    const left = z.children[0]
    const right = z.children[1]

    const isLeaf = !left && !right
    const onlyLeft = left && !right
    const onlyRight = !left && right
    const twoChildren = left && right

    let y = z
    let yOriginalColor = y.color
    let x: RBTreeNodeData | null = null

    // Case 1: Leaf
    if (isLeaf) {
        pushStepTree(steps, {
            tree: structuredClone(root),
            deletingIds: [z.id],
            message: `Deleting leaf node ${z.value}`,
            target
        })
    }
    
    // Case 2: Only right child
    if (onlyRight) {
        pushStepTree(steps, {
            tree: structuredClone(root),
            deletingIds: [z.id],
            replacementIds: [right!.id],
            message: `Replacing ${z.value} with right child`,
            target
        })
    }

    // Case 3: Only left child
    if (onlyLeft) {
        pushStepTree(steps, {
            tree: structuredClone(root),
            deletingIds: [z.id],
            replacementIds: [left!.id],
            message: `Replacing ${z.value} with left child`,
            target
        })
    }

    // Case 4: Two children
    if (twoChildren) {

        const successor = findSuccessor(root, z, right, target, steps)

       // Step 1: Highlight node + successor
        pushStepTree(steps, {
            tree: structuredClone(root),
            activeIds: [z.id, successor.id],
            message: `Found successor ${successor.value}`,
            activeEdgeIds: [`${z.id}->${successor.id}`],
            target
        })

        // Step 2: Mark node as being replaced
        pushStepTree(steps, {
            tree: structuredClone(root),
            deletingIds: [z.id],
            replacementIds: [successor.id],
            message: `Replacing ${z.value} with ${successor.value}`,
            target
        })
        
    }

    // Node has 2 children
    if (z.children[0] && z.children[1]) {

        y = findSuccessor(root, z, z.children[1], target, steps, false) // successor
        yOriginalColor = y.color

        // Copy value ONLY (not structure)
        z.value = y.value

        // Now we will delete successor instead
        z = y
    }

    // Pick replacement child
    x = z.children[0] ?? z.children[1]

    if (twoChildren) {

        // Step 3: Remove replacing node from tree
        pushStepTree(steps, {
            tree: structuredClone(root),
            deletingIds: [z.id],
            replacementIds: x ? [x.id] : [],
            message: `Removing node ${z.value}`,
            target
        })
    }

    const parentOfX = x?.parent ?? z.parent
    // Transplant node out
    root = transplant(root, z, x)

    if (x) {
        x.parent = z.parent
    }

    // Fix red-black properties
    if (yOriginalColor === "black") {
        root = fixDeletion(root, target, steps, x, parentOfX)
    }

    // Final step
    pushStepTree(steps, {
        tree: structuredClone(root),
        message: `Deletion complete`,
        target
    })

    return root
}


const fixDeletion = (
    root: RBTreeNodeData,
    target: number,
    steps: VisualizationStep[],
    x: RBTreeNodeData | null,
    parent: RBTreeNodeData | null
    
): RBTreeNodeData => {
    
    let current = x
    let currentParent = parent
    
    while (current !== root && (current === null || current.color === "black")) {

        if (!currentParent) break

        // Current is left child
        if (current === currentParent.children[0]) {

            let sibling = currentParent.children[1]

            // Case 1
            if (sibling?.color === "red") {

                pushStepTree(steps, {
                    tree: structuredClone(root),
                    activeIds: [currentParent.id, sibling.id],
                    message: "Delete Fix Case 1: Red sibling",
                    target
                })

                sibling.color = "black"
                currentParent.color = "red"

                pushStepTree(steps, {
                    tree: structuredClone(root),
                    activeIds: [currentParent.id, sibling.id],
                    message: "Recolor sibling black and parent red",
                    target
                })
                
                root = rotateLeft(root, currentParent)
                currentParent = current?.parent ?? currentParent

                layoutTree(root)

                pushStepTree(steps, {
                    tree: structuredClone(root),
                    activeIds: [currentParent.id],
                    message: "Rotate left around parent",
                    target
                })

                sibling = currentParent.children[1]
            }

            const leftBlack = sibling?.children[0] == null || sibling.children[0].color === "black"

            const rightBlack = sibling?.children[1] == null || sibling.children[1].color === "black"

            // Case 2
            if (leftBlack && rightBlack) {

                pushStepTree(steps, {
                    tree: structuredClone(root),
                    activeIds: [currentParent.id, sibling?.id ?? ""],
                    message: "Delete Fix Case 2: Black sibling with black children",
                    target
                })

                if (sibling) sibling.color = "red"

                pushStepTree(steps, {
                    tree: structuredClone(root),
                    activeIds: [currentParent.id],
                    message: "Push extra blackness upward",
                    target
                })

                current = currentParent
                currentParent = currentParent.parent
                continue
            }

            // Case 3
            if (
                sibling?.children[0]?.color === "red" &&
                (sibling.children[1] == null ||
                sibling.children[1].color === "black")
            ) {

                pushStepTree(steps, {
                    tree: structuredClone(root),
                    activeIds: [sibling.id, sibling.children[0].id],
                    message: "Delete Fix Case 3: Inner red nephew",
                    target
                })

                sibling.children[0].color = "black"
                sibling.color = "red"

                pushStepTree(steps, {
                    tree: structuredClone(root),
                    activeIds: [sibling.id],
                    message: "Recolor before rotation",
                    target
                })

                root = rotateRight(root, sibling)
                currentParent = current?.parent ?? currentParent

                layoutTree(root)

                pushStepTree(steps, {
                    tree: structuredClone(root),
                    message: "Rotate right around sibling",
                    target
                })

                sibling = currentParent.children[1]
            }

            // Case 4
            if ( sibling && sibling.children[1]?.color === "red") {

                pushStepTree(steps, {
                    tree: structuredClone(root),
                    activeIds: [currentParent.id, sibling.id, sibling.children[1].id],
                    message: "Delete Fix Case 4: Outer red nephew",
                    target
                })

                sibling.color = currentParent.color
                currentParent.color = "black"
                sibling.children[1].color = "black"

                pushStepTree(steps, {
                    tree: structuredClone(root),
                    activeIds: [currentParent.id, sibling.id],
                    message: "Recolor before final rotation",
                    target
                })

                root = rotateLeft(root, currentParent)
                currentParent = current?.parent ?? currentParent

                layoutTree(root)

                pushStepTree(steps, {
                    tree: structuredClone(root),
                    message: "Rotate left and restore red-black properties",
                    target
                })

                current = root
                break
            }
        }

        // Current is right child
        else {

            if (current === currentParent.children[1]) {

                let sibling = currentParent.children[0]

                // Case 1
                if (sibling?.color === "red") {

                    pushStepTree(steps, {
                        tree: structuredClone(root),
                        activeIds: [currentParent.id, sibling.id],
                        message: "Delete Fix Case 1: Red sibling",
                        target
                    })

                    sibling.color = "black"
                    currentParent.color = "red"

                    pushStepTree(steps, {
                        tree: structuredClone(root),
                        activeIds: [currentParent.id, sibling.id],
                        message: "Recolor sibling black and parent red",
                        target
                    })

                    root = rotateRight(root, currentParent)
                    currentParent = current?.parent ?? currentParent

                    layoutTree(root)

                    pushStepTree(steps, {
                        tree: structuredClone(root),
                        activeIds: [currentParent.id],
                        message: "Rotate right around parent",
                        target
                    })

                    sibling = currentParent.children[0]
                }

                const leftBlack = sibling?.children[0] == null || sibling.children[0].color === "black"

                const rightBlack = sibling?.children[1] == null || sibling.children[1].color === "black"

                // Case 2
                if (leftBlack && rightBlack) {

                    
                    pushStepTree(steps, {
                        tree: structuredClone(root),
                        activeIds: [currentParent.id, sibling?.id ?? ""],
                        message: "Delete Fix Case 2: Black sibling with black children",
                        target
                    })

                    if (sibling) sibling.color = "red"

                    pushStepTree(steps, {
                        tree: structuredClone(root),
                        activeIds: [currentParent.id],
                        message: "Push extra blackness upward",
                        target
                    })

                    current = currentParent
                    continue
                }

                // Case 3
                if (
                    sibling?.children[1]?.color === "red" &&
                    (sibling.children[0] == null ||
                    sibling.children[0].color === "black")
                ) {

                pushStepTree(steps, {
                        tree: structuredClone(root),
                        activeIds: [sibling.id, sibling.children[1].id],
                        message: "Delete Fix Case 3: Inner red nephew",
                        target
                    })

                    sibling.children[1].color = "black"
                    sibling.color = "red"

                    pushStepTree(steps, {
                        tree: structuredClone(root),
                        activeIds: [sibling.id],
                        message: "Recolor before rotation",
                        target
                    })

                    root = rotateLeft(root, sibling)
                    currentParent = current?.parent ?? currentParent

                    layoutTree(root)

                    pushStepTree(steps, {
                        tree: structuredClone(root),
                        message: "Rotate left around sibling",
                        target
                    })

                    sibling = currentParent.children[0]
                }

                // Case 4
                if ( sibling && sibling.children[0]?.color === "red") {

                    pushStepTree(steps, {
                        tree: structuredClone(root),
                        activeIds: [currentParent.id, sibling.id, sibling.children[0].id],
                        message: "Delete Fix Case 4: Outer red nephew",
                        target
                    })

                    sibling.color = currentParent.color
                    currentParent.color = "black"
                    sibling.children[0].color = "black"

                    pushStepTree(steps, {
                        tree: structuredClone(root),
                        activeIds: [currentParent.id, sibling.id],
                        message: "Recolor before final rotation",
                        target
                    })

                    root = rotateRight(root, currentParent)
                    currentParent = current?.parent ?? currentParent

                    layoutTree(root)

                    pushStepTree(steps, {
                        tree: structuredClone(root),
                        message: "Rotate right and restore red-black properties",
                        target
                    })

                    current = root
                    break
                }
            }
        }

    }

    if (current && current.color !== "black") {
        current.color = "black"
    }

    if (current && current.color !== "black") {

        pushStepTree(steps, {
            tree: structuredClone(root),
            activeIds: [current.id],
            message: "Color node black",
            target
        })

        current.color = "black"

        pushStepTree(steps, {
            tree: structuredClone(root),
            activeIds: [current.id],
            message: "Deletion fix complete",
            target
        })
    }

    return root
}

/** Helper function to find node for deletion */
const findNode = (
    root: RBTreeNodeData | null,
    value: number,
    steps: VisualizationStep[]
): RBTreeNodeData | null => {

    let current = root
    const target = value

    while (current) {
        
        // Visit node
        pushStepTree(steps, {
            tree: structuredClone(root),
            activeIds: [current.id],
            message: `Checking ${current.value}`,
            target
        })

        // Go left
        if (value < current.value) {
            const next = current.children[0]

            if (next) {
                pushStepTree(steps, {
                    tree: structuredClone(root),
                    activeIds: [current.id, next.id],
                    activeEdgeIds: [`${current.id}->${next.id}`],
                    target
                })
            }

            current = next
            continue
            
        }

        // Go right
        if (value > current.value) {
            const next = current.children[1]

            if (next) {
                pushStepTree(steps, {
                    tree: structuredClone(root),
                    activeIds: [current.id, next.id],
                    activeEdgeIds: [`${current.id}->${next.id}`],
                    target
                })
            }

            current = next
            continue
        }
         
            // Found
            pushStepTree(steps, {
                tree: structuredClone(root),
                activeIds: [current.id],
                message: `Found ${current.value}`,
                target
            })
            return current
    }

    return null
}

/** Helper function to find successor */
const findSuccessor = (
    root: RBTreeNodeData,
    priorNode: RBTreeNodeData,
    node: RBTreeNodeData,
    target: number,
    steps: VisualizationStep[],
    doTrace: boolean = true
): RBTreeNodeData => {

    let current = node

    if (doTrace) {
        pushStepTree(steps, {
            tree: structuredClone(root),
            activeIds: [priorNode.id, current.id],
            activeEdgeIds: [`${priorNode.id}->${current.id}`],
            message: `Searching for successor`,
            target
        })

        pushStepTree(steps, {
            tree: structuredClone(root),
            activeIds: [current.id],
            message: `Searching for successor`,
            target
        })
    }
    
    
    while (current.children[0]) {

        const leftChild = current.children[0]

        if (doTrace) {
            pushStepTree(steps, {
                tree: structuredClone(root),
                activeIds: [current.id, leftChild.id],
                activeEdgeIds: [`${current.id}->${leftChild.id}`],
                message: `Searching for successor`,
                target
            })
        }

        current = leftChild

        if (doTrace) {
            pushStepTree(steps, {
                tree: structuredClone(root),
                activeIds: [current.id],
                message: `Searching for successor`,
                target
            })
        }
    }

    return current
}

/** Helper function for transplanting */
const transplant = (
    root: RBTreeNodeData,
    u: RBTreeNodeData,
    v: RBTreeNodeData | null
): RBTreeNodeData => {

    const p = u.parent

    if (!p) {
        if (v) v.parent = null

        return v as RBTreeNodeData
    }

    if (p.children[0] === u) {
        p.children[0] = v
    } 
    
    else {
        p.children[1] = v
    }

    if (v) {
        v.parent = p
    }

    return root
}



export default RBDelete