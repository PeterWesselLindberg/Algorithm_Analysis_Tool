import { Col, Container, Row } from 'react-bootstrap'
import './App.css'
import SideBarMenu from './components/SideBarMenu'
import {HashRouter, Route, Routes, Outlet, useNavigate } from 'react-router-dom'
import type { MenuItem } from './components/SideBarMenu'
import ErrorPage from './pages/ErrorPage'
import InsertionSortPage from './pages/InsertionSortPage'
import BubbleSortPage from './pages/BubbleSortPage'
import SelectionSortPage from './pages/SelectionSortPage'
import QuickSortPage from './pages/QuickSortPage'
import RandQuickSortPage from './pages/RandQuickSortPage'
import HeapSortPage from './pages/HeapSortPage'
import MergeSortPage from './pages/MergeSortPage'
import CountingSortPage from './pages/CountingSortPage'

 let items : MenuItem[] = [
          {label: 'Brute force', subItems: [{id: 'Insertion sort', comp: InsertionSortPage}, 
                                              {id: 'Bubble sort', comp: BubbleSortPage}, 
                                              {id: 'Selection sort', comp: SelectionSortPage},
                                              {id: 'Heap sort', comp: HeapSortPage}]},
                                              
          {label: 'Divide and Conquer', subItems: [{id: 'Quick sort', comp: QuickSortPage},
                                                     {id: 'Counting sort', comp: CountingSortPage}, 
                                                     {id: 'Merge sort', comp: MergeSortPage}]},

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

function Layout() {
  const navigate = useNavigate()

  const handleSelectItem = (item: string) => {
    navigate(`/${item}`)
  }
 
  return (
    <>
    <Container fluid>
      <Row>
          <Col xs={3}>
          <SideBarMenu items={items} onSelectItem={handleSelectItem}/>
          </Col>
          
          <Col>
          <Outlet />
          </Col>
      </Row>
    </Container>
    </>
  )
}

export default function App() {
  const subRoutes = items.flatMap(item => item.subItems)
  
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
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
