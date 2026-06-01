import { ListGroup } from "react-bootstrap"

interface DistanceListProps {
  distances?: Record<string, number>
}

const DistanceList = ({
  distances = {}
}: DistanceListProps) => {

  return (
    <ListGroup horizontal className="custom-listgroup">

      {Object.entries(distances).map(
        ([nodeId, distance], i) => (

        <div key={`${nodeId}-${i}`} className="custom-listelm">

          {/* INDEX LABEL */}
          <small className="index-label">
            {nodeId}
          </small>

          {/* DISTANCE VALUE */}
          <ListGroup.Item>

            {distance === Infinity
              ? "∞"
              : distance}

          </ListGroup.Item>

        </div>
      ))}

    </ListGroup>
  )
}

export default DistanceList