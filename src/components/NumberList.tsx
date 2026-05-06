import { ListGroup } from "react-bootstrap";

interface NumberListProps {
  numbers: number[],
  activeIndex?: number,     // current element (key)
  compareIndex?: number,    // element being compared
  sortedIndex?: number,     // boundary of sorted part
}

const NumberList = ({ numbers, activeIndex, compareIndex, sortedIndex }: NumberListProps) => {
    return (
    <ListGroup horizontal>
      {numbers.map((num, index) => {
        let variant;

        if (index === activeIndex) variant = "danger";   //  current key
        else if (index === compareIndex) variant = "warning"; // being compared
        else if (sortedIndex !== undefined && index <= sortedIndex)
          variant = "success"; // sorted portion

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