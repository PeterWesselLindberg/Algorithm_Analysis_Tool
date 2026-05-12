import SetupSorting from "../components/SetupSorting"


const InsertionSortPage = () => {
  
  return (
    <div>
      <h1>Insertion sort</h1>
      <SetupSorting unsortedNumbers={[5,2,8,1,6,1,2,4,6,7,8,10]} algorithm="insertion" sortingGraphics="list/bar"/>
    </div>
  )
}

export default InsertionSortPage