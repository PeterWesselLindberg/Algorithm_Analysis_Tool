import type { VisualizationStep } from "../types/VisualizationStep"
import type{ AlgorithmFunction} from "../types/algorithmtypes"
import { pushStepTree } from "../utils/pushStep"
import layoutTree from "../utils/layoutTree"
import buildRedBlackTree from "../utils/buildRedBlackTree"
import { rotateLeft, rotateRight } from "../utils/buildRedBlackTree"
import type { RBTreeNodeDataNew } from "../dataStructures/RBTreeNodeDataNew"

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
            message: `Rebalancing tree`
        })
    }

    return steps
}

const deleteRBNode = (
    root: RBTreeNodeDataNew,
    z: RBTreeNodeDataNew,
    steps: VisualizationStep[]
): RBTreeNodeDataNew => {

    const target = z.value
    const left = z.children[0]
    const right = z.children[1]

    const isLeaf = !left && !right
    const onlyLeft = left && !right
    const onlyRight = !left && right
    const twoChildren = left && right

    let y = z
    let yOriginalColor = y.color
    let x: RBTreeNodeDataNew | null = null

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

        const successor = findMin(right)

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

        y = findMin(z.children[1]) // successor
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

    // Transplant node out
    root = transplant(root, z, x)

    if (x) {
        x.parent = z.parent
    }

    // Fix red-black properties
    if (yOriginalColor === "black") {
        root = fixDeletion(root, steps, x)
    }

    // Final step
    pushStepTree(steps, {
        tree: structuredClone(root),
        message: `Deletion complete`
    })

    return root
}


const fixDeletion = (
    root: RBTreeNodeDataNew,
    steps: VisualizationStep[],
    node: RBTreeNodeDataNew | null,
    
): RBTreeNodeDataNew => {
    
    let current = node

    // pushStepTree(steps, {
    //     tree: structuredClone(root),
    //     message: `Entering fixDeletion with ${
    //         current ? current.value : "undefined"
    //     }`
    // })
    
    while (current && current.color === "black") {

        const parent = current.parent

        if (!parent) break

        // Current is left child
        if (current === parent.children[0]) {

            let sibling = parent.children[1]

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

                sibling = parent.children[1]
            }

            const leftBlack = sibling?.children[0] == null || sibling.children[0].color === "black"

            const rightBlack = sibling?.children[1] == null || sibling.children[1].color === "black"

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
                sibling?.children[0]?.color === "red" &&
                (sibling.children[1] == null ||
                sibling.children[1].color === "black")
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

                sibling = parent.children[1]
            }

            // Case 4
            if ( sibling && sibling.children[1]?.color === "red") {

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
                break
            }
        }

        // Current is right child
        else {

            let sibling = parent.children[0]

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

                sibling = parent.children[0]
            }

            const leftBlack = sibling?.children[0] == null || sibling.children[0].color === "black"

            const rightBlack = sibling?.children[1] == null || sibling.children[1].color === "black"

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
                sibling?.children[1]?.color === "red" &&
                (sibling.children[0] == null ||
                sibling.children[0].color === "black")
            ) {

               pushStepTree(steps, {
                    tree: structuredClone(root),
                    activeIds: [sibling.id, sibling.children[1].id],
                    message: "Delete Fix Case 3: Inner red nephew"
                })

                sibling.children[1].color = "black"
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

                sibling = parent.children[0]
            }

            // Case 4
            if ( sibling && sibling.children[0]?.color === "red") {

                pushStepTree(steps, {
                    tree: structuredClone(root),
                    activeIds: [parent.id, sibling.id, sibling.children[0].id],
                    message: "Delete Fix Case 4: Outer red nephew"
                })

                sibling.color = parent.color
                parent.color = "black"
                sibling.children[0].color = "black"

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
                break
            }

        }
    }

    if (current === root && current.color === "black") {
        current.color = "black"
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

/** Helper function to find node for deletion */
const findNode = (
    root: RBTreeNodeDataNew | null,
    value: number,
    steps: VisualizationStep[]
): RBTreeNodeDataNew | null => {

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
const findMin = (
    node: RBTreeNodeDataNew
): RBTreeNodeDataNew => {

    let current = node

    while (current.children[0]) {
        current = current.children[0]
    }

    return current
}

/** Helper function for transplanting */
const transplant = (
    root: RBTreeNodeDataNew,
    u: RBTreeNodeDataNew,
    v: RBTreeNodeDataNew | null
): RBTreeNodeDataNew => {

    const p = u.parent

    if (!p) {
        if (v) v.parent = null

        return v as RBTreeNodeDataNew
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