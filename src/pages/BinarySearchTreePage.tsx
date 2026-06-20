import AnimationManager from "../components/AnimationManager"
import generateRandomBalancedValues from "../randGen/generateRandomBalancedValue"
import generateRandomArray from "../randGen/generateRandomArray"
import TopNavBar from "../components/TopNavBar"
import { useSearchParams } from "react-router-dom"
import {oneItem, addToList} from "../utils/visualItems"
import Visualization from "../types/VisualizationType"
import { Algorithm } from "../types/algorithmtypes"
import StructureColor from "../types/structureColor"
import ComplexityTable from "../components/ComplexityTable"
import DataStructure from "../types/dataType"
import Algo from "../types/algoType"

const BinarySearchTreePage = () => {
  
  const visualItems: string[] = addToList(oneItem, ["Insertion", "BFS search", "DFS search", "BST search", "Deletion"])

  const [searchParams, setSearchParams] = useSearchParams()
  const selectedTab = Number(searchParams.get("tab") ?? 1)

  const header: string = "Binary Search Tree"
  const exampleArr: number[] = [21,19,17,27,23,21,29]

  const handleSelectTab = (_item: string, index: number) => {
    setSearchParams({ tab: index.toString() })
  }

  const {values , target} = generateRandomBalancedValues(10, false, true)

    return (
    <div>
      <TopNavBar items={visualItems} onSelectItem={(item, index) => handleSelectTab(item, index)}/>
      
      { selectedTab === 1 && (
        <>
          <h1>Binary search tree Insertion</h1>
          <AnimationManager input={generateRandomArray(7)} algorithm={Algorithm.BSTinsert} visualizationGraphics={Visualization.ExListTree}
          structure={StructureColor.BSTColor} />
        </>
      )}

      { selectedTab === 2 && (
        <>
          <h1>Binary search tree breadth-first search</h1>
          <AnimationManager input={{type: "bst", values, target}}
            algorithm={Algorithm.BFSTreeSearch} visualizationGraphics={Visualization.TVListTree}
            structure={StructureColor.BSTColor} />
        </>
      )}

      { selectedTab === 3 && (
        <>
        <h1>Binary search tree depth-first search</h1>
        <AnimationManager input={{type: "bst", values, target}}
          algorithm={Algorithm.DFSTreeSearch} visualizationGraphics={Visualization.TVListTree}
          structure={StructureColor.BSTColor} />
       </>
      )}

      { selectedTab === 4 && (
        <>
          <h1>Binary search tree search</h1>

          <AnimationManager input={{type: "bst", values, target}}
            algorithm={Algorithm.BSTTreeSearch} visualizationGraphics={Visualization.TVListTree}
            structure={StructureColor.BSTColor} />
        </>
      )}

      { selectedTab === 5 && (
        <>
          <h1>Binary search tree deletion</h1>

          <AnimationManager input={{type: "bst", values, target}}
            algorithm={Algorithm.BSTDelete} visualizationGraphics={Visualization.TVListTree}
            structure={StructureColor.BSTColor} />
        </>
      )}

      { selectedTab === 0 && (
        <>
          <h1>{header}</h1>
          <p>
            A binary search tree (BST) is a rooted binary tree data structure with the key of each internal node being greater than all the keys in the respective node's left subtree<br/>
            and less than the ones in its right subtree. The time complexity of operations on the binary search tree is linear with respect to the height of the tree.
          </p>

          <h2>Binary search tree insertion</h2>
          <p> Given the root of a BST, we need to insert a new node with a given value. All the nodes in the BST have distinct values and we may assume that the the new value to be inserted<br/>
              is not present in the BST. When inserting the new node we move down the BST and compare the value of the new inserted node with the values of the nodes it passes by doing the walk.<br/>
              If the new node valus is smaller, than the node it is being compared to doing the walk we move down the left subtree. Correspondingly if it is larger we move down the right subtree.<br/>
              We do this until we hit a leaf after, which we compare the new value to the leaf value and then insert the node in either the right of left subtree of the compared leaf.
          </p>

          <h3>Time Complexity of insertion</h3>
          <p>
            The time it takes to insert a new node in a BST is O(h), where h is the height of the tree.
          </p>

          <h3>Space complexity of insertion</h3>
          <p>
            The space complexity for a BST insertion is O(1).
          </p>

          <AnimationManager input={{type: "array", data: exampleArr}} algorithm={Algorithm.BSTinsert} visualizationGraphics={Visualization.ExListTree} isInAbout={true}/>
          
          <h4 className="v-space">Complexity table for BST insertion</h4>
          <ComplexityTable algoType={Algo.Search} dataType={DataStructure.Tree} name={"BST insertion"} best={"O(h)"} average={"O(h)"} worst={"O(h)"} memory={"O(1)"}/>

          <h4 className="v-space">References</h4>
          <a href="https://en.wikipedia.org/wiki/Binary_search_tree" target="_blank">Wikipedia</a>
          <br/>
          <a 
            href="https://github.com/PeterWesselLindberg/Algorithm_Analysis_Tool/blob/main/src/algorithms/bstInsertion.ts" target="_blank">
            PeterWesselLindberg/Algorithm_Analysis_Tool/
          </a>
          
          <h2 className="v-space">Binary search tree breadth-first search</h2>
          <p>
            Breadth-first search sometimes called level order traversal is method to traverse a BST, such that all nodes present on the same depth level is traversed fully<br/>
            before traversing the next level. This is done until the targeted node's position is found.
          </p>

          <h3>Time complexity of a BFS search</h3>
          <p>
            The running time of a BFS search on a BST is O(1), in the best case where the root is the target. Otherwise it has running time of O(n).
          </p>
          
          <h3>Space complexity of a BFS search</h3>
          <p>
            The space complexity for a BFS search is O(w), where w is the width of the tree.
          </p>

          <AnimationManager input={{type: "bst", values: exampleArr, target: 29}} algorithm={Algorithm.BFSTreeSearch} visualizationGraphics={Visualization.TVListTree} isInAbout={true}/>
          
          <h4 className="v-space">Complexity table for BFS search</h4>
          <ComplexityTable algoType={Algo.Search} dataType={DataStructure.Tree} name={"Breadth-first search of BST"} best={"O(1)"} average={"O(n)"} worst={"O(n)"} memory={"O(w)"}/>

          <h4 className="v-space">References</h4>
          <a href="https://en.wikipedia.org/wiki/Breadth-first_search" target="_blank">Wikipedia</a>
          <br/>
          <a 
            href="https://github.com/PeterWesselLindberg/Algorithm_Analysis_Tool/blob/main/src/algorithms/bfsTreeSearch.ts" target="_blank">
            PeterWesselLindberg/Algorithm_Analysis_Tool/
          </a>

          <h2 className="v-space">Binary search tree depth-first search</h2>
          <p>
            Depth-first search is a method of traversing a BST by going as deep as possible along each branch before moving to the next branch.<br/>
            It starts at the root and visits every node in a tree until the targeted node's position is found.
          </p>

          <h3>Time complexity of a DFS search</h3>
          <p>
            The running time of a DFS search on a BST is O(1), in the best case where the root is the target. Otherwise it has running time of O(n).
          </p>
          
          <h3>Space complexity of a DFS search</h3>
          <p>
            The space complexity for a DFS search is O(log(n)).
          </p>

          <AnimationManager input={{type: "bst", values: exampleArr, target: 29}} algorithm={Algorithm.DFSTreeSearch} visualizationGraphics={Visualization.TVListTree} isInAbout={true}/>
          
          <h4 className="v-space">Complexity table for DFS search</h4>
          <ComplexityTable algoType={Algo.Search} dataType={DataStructure.Tree} name={"Depth-first search of BST"} best={"O(1)"} average={"O(n)"} worst={"O(n)"} memory={"O(log(n))"}/>

          <h4 className="v-space">References</h4>
          <a href="https://en.wikipedia.org/wiki/Depth-first_search" target="_blank">Wikipedia</a>
          <br/>
          <a 
            href="https://github.com/PeterWesselLindberg/Algorithm_Analysis_Tool/blob/main/src/algorithms/dfsTreeSearch.ts" target="_blank">
            PeterWesselLindberg/Algorithm_Analysis_Tool/
          </a>

          <h2 className="v-space">Binary search tree search</h2>
          <p>
            BST search is a method of traversing a BST and finding a value in it by walking through the tree and comparing node values with target value and<br/>
            depending on the comparison of the values either moving down the left or right subtree in the search of the targeted value.<br/>
            This is done continously until the value is found or there aren't any nodes left to visit.
          </p>

          <h3>Time complexity of a BST search</h3>
          <p>
            The running time of a BST search on a BST is O(h) in the worst case, where h is the height of the tree. O(1) in the best case where the target is the root node and<br/>
            O(log(n)) in the average case.
          </p>
          
          <h3>Space complexity of a BST search</h3>
          <p>
            The space complexity for a BST search is O(1).
          </p>

          <AnimationManager input={{type: "bst", values: exampleArr, target: 29}} algorithm={Algorithm.BSTTreeSearch} visualizationGraphics={Visualization.TVListTree} isInAbout={true}/>
          
          <h4 className="v-space">Complexity table for DFS search</h4>
          <ComplexityTable algoType={Algo.Search} dataType={DataStructure.Tree} name={"BST search of BST"} best={"O(1)"} average={"O(log(n))"} worst={"O(h)"} memory={"O(1)"}/>

          <h4 className="v-space">References</h4>
          <a href="https://en.wikipedia.org/wiki/Binary_search_tree" target="_blank">Wikipedia</a>
          <br/>
          <a 
            href="https://github.com/PeterWesselLindberg/Algorithm_Analysis_Tool/blob/main/src/algorithms/bstTreeSearch.ts" target="_blank">
            PeterWesselLindberg/Algorithm_Analysis_Tool/
          </a>

          <h2 className="v-space">Binary search tree deletion</h2>
          <p>
            BST deletion is a method of deleting a node from a BST by first travesring the tree to find the targeted value and then depending on the type of node to delete<br/>
            it will rebalance the tree.
          </p>

          <ol>
            <li>If the target node is a leaf, it is deleted by replacing it with null</li>
            <li>If the target node only has one child, the target node is deleted and the child gets elevated becoming the new child of its' grandparent.</li>
            <li>If the target node has two children, the target node's in-order successor (the smallest value in the right subtree) replaces the target node's value<br/>
              with the successor's value and then we delete the succesor node, which will now fall under either case 1 or 2.</li>
          </ol>

          <h3>Time complexity of a BST deletion</h3>
          <p>
            The running time of a BST search on a BST is O(h), where h is the height of the tree:
          </p>
          
          <h3>Space complexity of a BST search</h3>
          <p>
            The space complexity for a BST search is O(1).
          </p>

          <h4>Case 1 (Leaf Node):</h4>
          <AnimationManager input={{type: "bst", values: exampleArr, target: 29}} algorithm={Algorithm.BSTDelete} visualizationGraphics={Visualization.TVListTree} isInAbout={true}/>

          <h4 className="v-space">Case 2 (One Child):</h4>
          <AnimationManager input={{type: "bst", values: exampleArr, target: 19}} algorithm={Algorithm.BSTDelete} visualizationGraphics={Visualization.TVListTree} isInAbout={true}/>

          <h4 className="v-space">Case 3 (Two Children):</h4>
          <AnimationManager input={{type: "bst", values: exampleArr, target: 27}} algorithm={Algorithm.BSTDelete} visualizationGraphics={Visualization.TVListTree} isInAbout={true}/>
          
          <h4 className="v-space">Complexity table for BST deletion</h4>
          <ComplexityTable algoType={Algo.Search} dataType={DataStructure.Tree} name={"BST deletion"} best={"O(h)"} average={"O(h)"} worst={"O(h)"} memory={"O(1)"}/>

          <h4 className="v-space">References</h4>
          <a href="https://en.wikipedia.org/wiki/Binary_search_tree" target="_blank">Wikipedia</a>
          <br/>
          <a 
            href="https://github.com/PeterWesselLindberg/Algorithm_Analysis_Tool/blob/main/src/algorithms/bstDeletion.ts" target="_blank">
            PeterWesselLindberg/Algorithm_Analysis_Tool/
          </a>
        </>
      )}
      
    </div>
  )
}

export default BinarySearchTreePage