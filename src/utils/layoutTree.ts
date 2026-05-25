import type { TreeNodeData } from "../dataStructures/TreeNodedata"

const layoutTree = (root: TreeNodeData) => {
    let xCounter = 0
    const nodes: TreeNodeData[] = []

    const dfs = (node: TreeNodeData, depth: number) => {
            if (!node) return

            if (node.children?.[0]) {
            dfs(node.children[0], depth + 1)
        }

        node.x = xCounter * 80
        node.y = depth * 100

        nodes.push(node)
        xCounter++

        if (node.children?.[1]) {
            dfs(node.children[1], depth + 1)
        }
    }

    dfs(root, 0)


    // CENTERING STEP 
    const ROOT_X = 500

    const minX = Math.min(...nodes.map(n => n.x))
    const maxX = Math.max(...nodes.map(n => n.x))

    const treeCenter = (minX + maxX) / 2
    const offsetX = ROOT_X - treeCenter
    const offsetY = 80

    for (const node of nodes) {
        node.x += offsetX
        node.y += offsetY
    }
}

export default layoutTree