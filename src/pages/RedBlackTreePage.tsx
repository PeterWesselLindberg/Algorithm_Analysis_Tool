import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useSearchParams } from "react-router-dom"
import { oneItem,addToList } from "../utils/visualItems"
import generateRandomBalancedValues from "../randGen/generateRandomBalancedValue"
import Visualization from "../types/VisualizationType"
import { Algorithm } from "../types/algorithmtypes"
import StructureColor from "../types/structureColor"
import ComplexityTable from "../components/ComplexityTable"
import DataStructure from "../types/dataType"
import Algo from "../types/algoType"

const RedBlackTreePage = () => {

  const visualItems: string[] = addToList(oneItem, ["Insertion", "BFS search", "DFS search", "BST search", "Deletion"])

  const [searchParams, setSearchParams] = useSearchParams()

  const selectedTab = Number(searchParams.get("tab") ?? 1)

  const header: string = "Red-black Search Tree"
  const exampleArr: number[] = [21,19,17,27,23,22,29,20]

  const handleSelectTab = (_item: string, index: number) => {
    setSearchParams({ tab: index.toString() })
  }

  const {values , target} = generateRandomBalancedValues(10, false, true)
    // const vals = [12,3,2,8,9,22,13,19,27,28]
    // const t = 8

    console.log(values)
    console.log(target)

    return (
    <div>
      <TopNavBar items={visualItems} onSelectItem={(item, index) => handleSelectTab(item, index)}/> 
      
      { selectedTab === 1 && (
        <>
          <h1>Red-Black tree Insertion</h1>
          <AnimationManager input={{type: "bst", values, target}} algorithm={Algorithm.RBInsert} visualizationGraphics={Visualization.TVListTree}
          structure={StructureColor.BSTColor} />
        </>
      )}

      { selectedTab === 2 && (
        <>
          <h1>Red-Black tree breadth-first search</h1>
          <AnimationManager input={{type: "bst", values, target}}
            algorithm={Algorithm.BFSRBSearch} visualizationGraphics={Visualization.TVListTree}
            structure={StructureColor.BSTColor} />
        </>
      )}

      { selectedTab === 3 && (
        <>
        <h1>Red-Black tree depth-first search</h1>
        <AnimationManager input={{type: "bst", values, target}}
          algorithm={Algorithm.DFSRBSearch} visualizationGraphics={Visualization.TVListTree}
          structure={StructureColor.BSTColor} />
       </>
      )}

      { selectedTab === 4 && (
        <>
          <h1>Red-Black tree binary search</h1>

          <AnimationManager input={{type: "bst", values, target}}
            algorithm={Algorithm.RBTreeSearch} visualizationGraphics={Visualization.TVListTree}
            structure={StructureColor.BSTColor} />
        </>
      )}

      { selectedTab === 5 && (
        <>
          <h1>Red-Black tree deletion</h1>

          <AnimationManager input={{type: "bst", values, target}}
            algorithm={Algorithm.RBDelete} visualizationGraphics={Visualization.TVListTree}
            structure={StructureColor.BSTColor} />
        </>
      )}

      { selectedTab === 0 && (
        <>
          <h1>{header}</h1>
          <p>
            A red-black tree is a rooted self-balancing binary tree data structure with the key of each internal node being greater than all the keys in the respective node's left subtree<br/>
            and less than the ones in its right subtree. The main difference between BST and red-black trees is that red black tree nodes has an extra attribute in the form of a color.<br/>
            This color can either be red or black and dependent on certain rules the color of the node is determined. These rules are:
          </p>

          <ol>
          <li>Every node is either red or black.</li>
          <li>All null nodes are considered black</li>
          <li>A red node is not allowed to have a red child</li>
          <li>Every path from a given node to any of its leafs goes through the same number of black nodes</li>
          <li>The root is always black</li>
          </ol>

          <p>
            The main reason behind using red-black trees instead of BST trees is, that do to the red-black color restrictions all operations, that in the worst case takes O(n) time in a BST<br/>
            can be done in O(log(n)) time in a red-black trees.
          </p>

          <h2>Red-black tree insertion</h2>
          <p> Given the root of a red-black tree, we need to insert a new node with a given value. All the nodes in the red-black tree have distinct values and we may assume that the the new value to be inserted<br/>
              is not present in the red-black tree. When inserting the new node we move down the red-black tree and compare the value of the new inserted node with the values of the nodes it passes by doing the walk.<br/>
              If the new node valus is smaller, than the node it is being compared to doing the walk we move down the left subtree. Correspondingly if it is larger we move down the right subtree.<br/>
              We do this until we hit a leaf after, which we compare the new value to the leaf value and then insert the node in either the right of left subtree of the compared leaf as red colored node.<br/>
              After this the red-black tree violations, that might have occured from this insertion has to be fixed using either rotation and recoloring or both dependent on the case:
          </p>

          <ol>
          <li>If the parent is black, we do nothing and just insert the node.</li>
          <li>If the parent and uncle are red, we recolor the inserted node and move upward in the tree recoloring the nodes, that need to be recolored to keep the balance.</li>
          <li>If the parent is red and the uncle is black, the approriate rotation of the tree is used, the nodes that need to be recolored in then recolored until the tree is balanced again</li>
          </ol>

          <h3>Time Complexity of insertion</h3>
          <p>
            The time it takes to insert a new node in a red-black tree is O(log(n)).
          </p>

          <h3>Space complexity of insertion</h3>
          <p>
            The space complexity for a red-black tree insertion is O(1).
          </p>

          <AnimationManager input={{type: "bst", values: exampleArr, target: 0}} algorithm={Algorithm.RBInsert} visualizationGraphics={Visualization.TVListTree} isInAbout={true}/>
          
          <h4 className="v-space">Complexity table for red-black tree insertion</h4>
          <ComplexityTable algoType={Algo.Search} dataType={DataStructure.Tree} name={"Red-black tree insertion"} best={"O(log(n))"} average={"O(log(n))"} worst={"O(log(n))"} memory={"O(1)"}/>

          <h4 className="v-space">References</h4>
          <a href="https://en.wikipedia.org/wiki/Red%E2%80%93black_tree#Insertion" target="_blank">Wikipedia</a>
          <br/>
          <a 
            href="https://github.com/PeterWesselLindberg/Algorithm_Analysis_Tool/blob/main/src/algorithms/redBlackTreeInsertion.ts" target="_blank">
            PeterWesselLindberg/Algorithm_Analysis_Tool/
          </a>
          
          <h2 className="v-space">Red-black search tree breadth-first search</h2>
          <p>
            Breadth-first search sometimes called level order traversal is method to traverse a red-black tree, such that all nodes present on the same depth level is traversed fully<br/>
            before traversing the next level. This is done until the targeted node's position is found.
          </p>

          <h3>Time complexity of a BFS search</h3>
          <p>
            The running time of a BFS search on a Red-black tree is O(1), in the best case where the root is the target. Otherwise it has running time of O(n).
          </p>
          
          <h3>Space complexity of a BFS search</h3>
          <p>
            The space complexity for a BFS search is O(w), where w is the width of the tree.
          </p>

          <AnimationManager input={{type: "bst", values: exampleArr, target: 27}} algorithm={Algorithm.BFSRBSearch} visualizationGraphics={Visualization.TVListTree} isInAbout={true}/>
          
          <h4 className="v-space">Complexity table for BFS search</h4>
          <ComplexityTable algoType={Algo.Search} dataType={DataStructure.Tree} name={"Breadth-first search of Red-black tree"} best={"O(1)"} average={"O(n)"} worst={"O(n)"} memory={"O(w)"}/>

          <h4 className="v-space">References</h4>
          <a href="https://en.wikipedia.org/wiki/Breadth-first_search" target="_blank">Wikipedia</a>
          <br/>
          <a 
            href="https://github.com/PeterWesselLindberg/Algorithm_Analysis_Tool/blob/main/src/algorithms/bfsTreeSearch.ts" target="_blank">
            PeterWesselLindberg/Algorithm_Analysis_Tool/
          </a>

          <h2 className="v-space">Binary search tree depth-first search</h2>
          <p>
            Depth-first search is a method of traversing a red-black tree by going as deep as possible along each branch before moving to the next branch.<br/>
            It starts at the root and visits every node in a tree until the targeted node's position is found.
          </p>

          <h3>Time complexity of a DFS search</h3>
          <p>
            The running time of a DFS search on a red-black tree is O(1), in the best case where the root is the target. Otherwise it has running time of O(n).
          </p>
          
          <h3>Space complexity of a DFS search</h3>
          <p>
            The space complexity for a DFS search is O(log(n)).
          </p>

          <AnimationManager input={{type: "bst", values: exampleArr, target: 27}} algorithm={Algorithm.DFSRBSearch} visualizationGraphics={Visualization.TVListTree} isInAbout={true}/>
          
          <h4 className="v-space">Complexity table for DFS search</h4>
          <ComplexityTable algoType={Algo.Search} dataType={DataStructure.Tree} name={"Depth-first search of red-black tree"} best={"O(1)"} average={"O(n)"} worst={"O(n)"} memory={"O(log(n))"}/>

          <h4 className="v-space">References</h4>
          <a href="https://en.wikipedia.org/wiki/Depth-first_search" target="_blank">Wikipedia</a>
          <br/>
          <a 
            href="https://github.com/PeterWesselLindberg/Algorithm_Analysis_Tool/blob/main/src/algorithms/dfsTreeSearch.ts" target="_blank">
            PeterWesselLindberg/Algorithm_Analysis_Tool/
          </a>

          <h2 className="v-space">Red-black search tree search</h2>
          <p>
            A red-black tree search is a method of traversing a red-black tree and finding a value in it by walking through the tree and comparing node values with target value and<br/>
            depending on the comparison of the values either moving down the left or right subtree in the search of the targeted value.<br/>
            This is done continously until the value is found or there aren't any nodes left to visit.
          </p>

          <h3>Time complexity of a red-black tree search</h3>
          <p>
            The running time of a red-black tree search is O(log(n)) in the worst case and O(1) in the best case, where the target is the root node and<br/>
            O(log(n)) in the average case.
          </p>
          
          <h3>Space complexity of a red-black tree search</h3>
          <p>
            The space complexity for a red-black tree search is O(1).
          </p>

          <AnimationManager input={{type: "bst", values: exampleArr, target: 22}} algorithm={Algorithm.RBTreeSearch} visualizationGraphics={Visualization.TVListTree} isInAbout={true}/>
          
          <h4 className="v-space">Complexity table for red-black tree search</h4>
          <ComplexityTable algoType={Algo.Search} dataType={DataStructure.Tree} name={"Red-black tree search"} best={"O(1)"} average={"O(log(n))"} worst={"O(log(n))"} memory={"O(1)"}/>

          <h4 className="v-space">References</h4>
          <a href="https://en.wikipedia.org/wiki/Red%E2%80%93black_tree" target="_blank">Wikipedia</a>
          <br/>
          <a 
            href="https://github.com/PeterWesselLindberg/Algorithm_Analysis_Tool/blob/main/src/algorithms/bstTreeSearch.ts" target="_blank">
            PeterWesselLindberg/Algorithm_Analysis_Tool/
          </a>

          <h2 className="v-space">Red-black tree deletion</h2>
          <p>
            Red-black tree deletion is a method of deleting a node from a red-black tree by first traversing the tree to find the targeted value and then depending on the type of node to delete<br/>
            it will rebalance the tree.
          </p>

          <ol>
            <li>If the target node is a leaf, it is deleted by replacing it with null</li>
            
            <li>If the target node only has one child, the target node is deleted and the child gets elevated becoming the new child of its' grandparent.<br/>
                The red-black properties of the tree then has to be fixed dependent on the situation.
            </li>

            <li>If the target node has two children, the target node's in-order successor (the smallest value in the right subtree) replaces the target node's value<br/>
              with the successor's value and then we delete the succesor node, which will now fall under either case 1 or 2. <br/>
              The red-black properties of the tree then has to be fixed dependent on the situation.</li>
          </ol>

          <p>The 4 situation, that might occur from the deletion only occurs if the deleted node was black, and the fixes for it can be seen in the list below.</p>

          <ol>
            <li>If the target node's sibling is red, then recolor the sibling to black and the parent to red. Then rotate the subtree.<br/>
                This then converts the tree into one of the remaining cases</li>
                
            <li>If the target node's sibling is black and both of the sibling's children are black. Recolor the sibling red. If the parent is red recolor i black and stop.<br/>
                If the parent is black continue fixing the tree upwards towards the root.
            </li>

            <li>If the target node's sibling is black, its near child is red and the far child is black.<br/>
                Rotate right around the sibling and swap the color of the sibling with the color of it's near child. Transforming the tree into the 4th case.
            </li>
            
            <li>If the target node's sibling is black and the far child is red. Rotate left around the parent and give the sibling the parent's original color.<br/>
                Then color the parent black and the far child black. The tree is now rebalanced
            </li>
          </ol>

          <h3>Time complexity of a red-black tree deletion</h3>
          <p>
            The running time of a red-black tree deletion is O(log(n)).
          </p>
          
          <h3>Space complexity of a red-black tree search</h3>
          <p>
            The space complexity for a red-black tree deletion is O(1).
          </p>

          <h4>Case 1 (Leaf Node):</h4>
          <AnimationManager input={{type: "bst", values: exampleArr, target: 22}} algorithm={Algorithm.RBDelete} visualizationGraphics={Visualization.TVListTree} isInAbout={true}/>

          <h4 className="v-space">Case 2 (One Child):</h4>
          <AnimationManager input={{type: "bst", values: exampleArr, target: 27}} algorithm={Algorithm.RBDelete} visualizationGraphics={Visualization.TVListTree} isInAbout={true}/>

          <h4 className="v-space">Case 3 (Two Children):</h4>
          <AnimationManager input={{type: "bst", values: exampleArr, target: 21}} algorithm={Algorithm.RBDelete} visualizationGraphics={Visualization.TVListTree} isInAbout={true}/>
          
          <h4 className="v-space">Complexity table for red-black tree deletion</h4>
          <ComplexityTable algoType={Algo.Search} dataType={DataStructure.Tree} name={"Red-black tree deletion"} best={"O(log(n))"} average={"O(log(n))"} worst={"O(log(n))"} memory={"O(1)"}/>

          <h4 className="v-space">References</h4>
          <a href="https://en.wikipedia.org/wiki/Red%E2%80%93black_tree#Removal" target="_blank">Wikipedia</a>
          <br/>
          <a 
            href="https://github.com/PeterWesselLindberg/Algorithm_Analysis_Tool/blob/main/src/algorithms/redBlackTreeDeletion.ts" target="_blank">
            PeterWesselLindberg/Algorithm_Analysis_Tool/
          </a>
        </>
      )}
      
    </div>
  )
}

export default RedBlackTreePage