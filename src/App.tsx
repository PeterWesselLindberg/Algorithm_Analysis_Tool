import { Col, Container, Row } from 'react-bootstrap'
import './App.css'
import SideBarMenu from './components/SideBarMenu'
import {HashRouter, Route, Routes, Outlet, useNavigate } from 'react-router-dom'
import AnotherPage from './pages/AnotherPage'
import type { MenuItem } from './components/SideBarMenu'
import ErrorPage from './pages/ErrorPage'
import InsertionSortPage from './pages/InsertionSortPage'
import BubbleSortPage from './pages/BubbleSortPage'
import SelectionSortPage from './pages/SelectionSortPage'
import QuickSortPage from './pages/QuickSortPage'

 let items : MenuItem[] = [
          {label: 'Brute force', subItems: [{id: 'Insertion sort', comp: InsertionSortPage}, 
                                              {id: 'Bubble sort', comp: BubbleSortPage}, 
                                              {id: 'Selection sort', comp: SelectionSortPage}]},
          {label: 'Divide and Conquer', subItems: [{id: 'Quick sort', comp: QuickSortPage},
                                                     {id: '2', comp: AnotherPage}, 
                                                     {id: '3'}]}
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
