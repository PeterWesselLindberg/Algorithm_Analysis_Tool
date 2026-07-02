import { ListGroup }
from "react-bootstrap"

interface MSTEdgeListProps {
    edges: string[]
}

const MSTEdgeList = ({
    edges
}: MSTEdgeListProps) => {

    return (
        <ListGroup horizontal className="custom-listgroup">

            {edges.map((edge, i) => (

                <div key={`${edge}-${i}`} className="custom-listelm">

                    <small className="index-label">
                        {i}
                    </small>

                  <ListGroup.Item>
                      {edge}
                  </ListGroup.Item>

              </div>
            ))}
        </ListGroup>
    )
}

export default MSTEdgeList