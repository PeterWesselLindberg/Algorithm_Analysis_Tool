import SetupSorting from "../components/SetupSorting"


const InsertionSortPage = () => {
  
  return (
    <div>
      <h1>Insertion sort</h1>
      <SetupSorting unsortedNumbers={[1,65,21,234,1,54,6,7]}/>
    </div>
  )
}

export default InsertionSortPage