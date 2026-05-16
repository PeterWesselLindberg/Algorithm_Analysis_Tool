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

 let items : MenuItem[] = [
          {label: 'Brute force', subItems: [{id: 'Insertion sort', comp: InsertionSortPage}, 
                                              {id: 'Bubble sort', comp: BubbleSortPage}, 
                                              {id: 'Selection sort', comp: SelectionSortPage},
                                              {id: 'Heap sort', comp: HeapSortPage}]},
                                              
          {label: 'Divide and Conquer', subItems: [{id: 'Quick sort', comp: QuickSortPage},
                                                     {id: 'Counting sort', comp: CountingSortPage}, 
                                                     {id: 'Merge sort', comp: MergeSortPage},
                                                     {id: 'Radix sort', comp: RadixSortPage}, 
                                                    ]},

          {label: 'Dynamic programming', subItems: [{id: '3'}
                                                     ]},
          {label: 'Randomized Algorithms', subItems: [{id: 'Randomized quick sort', comp: RandQuickSortPage}
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
      </Routes>
    </HashRouter>
  )
}
