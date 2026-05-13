import { Col, Container, Row } from 'react-bootstrap'
import './App.css'
import SideBarMenu from './components/SideBarMenu'
import {BrowserRouter, Route, Routes, Outlet, useNavigate } from 'react-router-dom'
import AnotherPage from './pages/AnotherPage'
import type { MenuItem } from './components/SideBarMenu'
import ErrorPage from './pages/ErrorPage'
import InsertionSortPage from './pages/InsertionSortPage'
import BubbleSortPage from './pages/BubbleSortPage'

 let items : MenuItem[] = [
          {label: 'Brute force algorithms', subItems: [{id: 'Insertion sort', comp: InsertionSortPage}, {id: 'Bubble sort', comp: BubbleSortPage}]},
          {label: 'San Francisco', subItems: [{id: '1'}, {id: '2', comp: AnotherPage}, {id: '3'}]}
      ]


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
    <BrowserRouter>
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
    </BrowserRouter>
  )
}
