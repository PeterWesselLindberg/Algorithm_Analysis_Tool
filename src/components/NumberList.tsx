import { ListGroup } from "react-bootstrap";

interface NumberListProps {
  numbers: number[],
  activeIndex?: number,     // current element (key)
  compareIndex?: number,    // element being compared
  sortedIndices?: number[],     // boundary of sorted part
}

const NumberList = ({ numbers, activeIndex, compareIndex, sortedIndices }: NumberListProps) => {
    return (
    <ListGroup horizontal>
      {numbers.map((num, index) => {
        let variant;

        if (sortedIndices?.includes(index)) variant = "success"; // sorted portion
        if (index === activeIndex) variant = "warning";   //  current key
        if (index === compareIndex) variant = "danger"; // being compared
        
          

        return (
          <ListGroup.Item key={index} variant={variant}>
            {num}
          </ListGroup.Item>
        )
      })}
    </ListGroup>
  )
}

export default NumberList