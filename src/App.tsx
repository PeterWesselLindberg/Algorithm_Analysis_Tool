import { useState } from 'react'
import DropdownButton from './components/Dropdownbutton'

function App() {

  return (
    <>
      <DropdownButton onClick={() => console.log('Clicked')}>
      My Button
      </DropdownButton>
    </>
  )
}

export default App
