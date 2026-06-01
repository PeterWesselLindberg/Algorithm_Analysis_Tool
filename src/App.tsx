import { Col, Container, Row } from 'react-bootstrap'
import './App.css'
import SideBarMenu from './components/SideBarMenu'
import {HashRouter, Route, Routes, Outlet, useNavigate } from 'react-router-dom'
import type { MenuItem} from './components/SideBarMenu'
import ErrorPage from './pages/ErrorPage'
import InsertionSortPage from './pages/InsertionSortPage'
import BubbleSortPage from './pages/BubbleSortPage'
import SelectionSortPage from './pages/SelectionSortPage'
import QuickSortPage from './pages/QuickSortPage'
import RandQuickSortPage from './pages/RandQuickSortPage'
import HeapSortPage from './pages/HeapSortPage'
import MergeSortPage from './pages/MergeSortPage'
import CountingSortPage from './pages/CountingSortPage'
import RadixSortPage from './pages/RadixSortPage'
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button'
import { FaLightbulb} from 'react-icons/fa'
import FactorialPage from './pages/FactorialPage'
import FibonacciPage from './pages/FibonacciPage'
import TreeTraversalPage from './pages/TreeTraversalPage'
import BFSTraversalPage from './pages/BFSTraversalPage'
import DFSTraversalPage from './pages/DFSTraversalPage'
import DijkstrasPage from './pages/DijkstrasPage'
import BellmanFordPage from './pages/BellmanFordPage'
import KruskalsPage from './pages/KruskalsPage'
import PrimsPage from './pages/PrimsPage'
import BinarySearchTreePage from './pages/BinarySearchTreePage'
import DepthLimitedSearchPage from './pages/DepthLimitedSearchPage'
import BinarySearchPage from './pages/BinarySearchPage'

 let items : MenuItem[] = [
          {label: 'Branch and Bound', subItems: [{id: 'Binary Search', comp: BinarySearchPage}, 
                                              {id: 'Depth-Limited Search', comp: DepthLimitedSearchPage}, 
                                              {id: 'Binary Search Tree', comp: BinarySearchTreePage}
                                            
                                            ]},

          {label: 'Brute Force', subItems: [{id: 'Insertion Sort', comp: InsertionSortPage}, 
                                              {id: 'Bubble Sort', comp: BubbleSortPage}, 
                                              {id: 'Selection Sort', comp: SelectionSortPage},
                                              {id: 'Heap Sort', comp: HeapSortPage},
                                              {id: 'Binary Tree Traversal', comp: TreeTraversalPage},
                                              {id: 'Breadth-First Search', comp: BFSTraversalPage},
                                              {id: 'Depth-First Search', comp: DFSTraversalPage}
                                            
                                            ]},
                                              
          {label: 'Divide and Conquer', subItems: [{id: 'Quick Sort', comp: QuickSortPage},
                                                     {id: 'Counting Sort', comp: CountingSortPage}, 
                                                     {id: 'Merge Sort', comp: MergeSortPage},
                                                     {id: 'Radix Sort', comp: RadixSortPage}, 
                                                    ]},

          {label: 'Dynamic Programming', subItems: [{id: 'Nth Factorial', comp: FactorialPage},
                                                      {id: 'Fibonacci Sequence', comp: FibonacciPage},
                                                      {id: 'Bellman-Ford\'s Shortest Path', comp: BellmanFordPage}
                                                    ]},
          
          {label: 'Greedy Algorithms', subItems: [{id: 'Dijkstra\'s Shortest Path', comp: DijkstrasPage},
                                                  {id: 'Kruskal\'s Minimum Spanning Tree', comp: KruskalsPage},
                                                  {id: 'Prim\'s Minimum Spanning Tree', comp: PrimsPage},
                                                    ]},

          {label: 'Randomized Algorithms', subItems: [{id: 'Randomized Quick Sort', comp: RandQuickSortPage}
                                                     ]}
      ]

items.forEach((item) => {
  item.subItems.sort((a, b) =>
    a.id.localeCompare(b.id)
  )
})



function Layout({theme, toggleTheme} : {theme: "dark" | "light"; toggleTheme: () => void}) {
  const navigate = useNavigate()

  const handleSelectItem = (item: string) => {
    navigate(`/${item}`)
  }
 
  return (
    <div className={theme}>
    <Container fluid>
      <Row>
          <Col xs={3}>
          <SideBarMenu items={items} onSelectItem={handleSelectItem}/>
          </Col>
          
          <Col>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "1rem"
              }}
            >
              <Button variant={theme === "dark" ? "outline.light" : "outline.dark"}
                onClick={toggleTheme}
                style={{ color: theme === "dark" ? "white" : "black" }}
              >
                {theme === "dark" ? <div>Light <FaLightbulb/> </div>: <div> Dark <FaLightbulb/> </div>}
              </Button>
            </div>
            <Outlet />
          </Col>
      </Row>
    </Container>
    </div>
  )
}

export default function App() {
  const subRoutes = items.flatMap(item => item.subItems)
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout theme={theme} toggleTheme={toggleTheme} />}>
        {subRoutes.map((sub, index) => {
          const Component = sub.comp ?? ErrorPage

          return (
            <Route
              key={`${sub.id}-${index}`}
              path={sub.id}
              element={<Component />}
            />
          )
        })}
        </Route>
        <Route path="/blank" element={<div />} />
      </Routes>
    </HashRouter>
  )
}
