import type {VisualizationType } from "../types/VisualizationType"
import BarsList from "./BarsList"
import NumberList from "./NumberList"
import type { VisualizationStep } from "../types/VisualizationStep"
import TreeVisualizer from "./TreeVisualizer"
import ExtendedNumberList from "./ExtendedNumbersList"
import VisitedList from "./VisitedList"
import GraphVisualizer from "./GraphVisualizer"
import DistanceList from "./DistanceList"
import MSTEdgeList from "./MSTEdgeList"
import { ListGroup } from "react-bootstrap"

interface VisualizerProps {
  step: VisualizationStep
  visualizationType: VisualizationType
}

/** Decides, which sorting graphic to use for which algoritm based on limited input strings */
const Visualizer = ( {step, visualizationType} : VisualizerProps ) => {
  const numbers = step.linear?.values ?? []
  const linears = step.linears ?? []
  const activeIds = step.activeIds ?? []
  const compareIds = step.compareIds ?? []
  const sortedIds = step.sortedIds ?? []
  switch(visualizationType) {
    case "list/bar": 
      return (
         <>
          <BarsList
            numbers={numbers}
            activeIds={activeIds}
            compareIds={compareIds}
            sortedIds={sortedIds}
          />

          <hr />

          <NumberList
            numbers={numbers}
            activeIds={activeIds}
            compareIds={compareIds}
            sortedIds={sortedIds}
          />
        </>
      )

    case "list/bar/tree": 
        return (
         <>
          <TreeVisualizer
            step={step}
            tree={step.tree}
            numbers={numbers}
          />
          <hr />

          <BarsList
            numbers={numbers}
            activeIds={activeIds}
            compareIds={compareIds}
            sortedIds={sortedIds}
          />

          <hr />

          <NumberList
            numbers={numbers}
            activeIds={activeIds}
            compareIds={compareIds}
            sortedIds={sortedIds}
          />
        </>
      )

    case "list/list/list":
      return (
        <>
          {linears?.map((linear) => (

          <div key={linear.id}>
            <h5>{linear.label}</h5>

            <ExtendedNumberList
              idPrefix={linear.id}
              numbers={linear.values}

              activeIds={activeIds}
              compareIds={compareIds}
              sortedIds={sortedIds}
            />

            <hr />
          </div>

        ))}
        </>
      )
    
    case "list":
      return (
        <>
            <NumberList
              numbers={numbers}
              activeIds={activeIds}
              compareIds={compareIds}
              sortedIds={sortedIds}
            />
            
            <hr />
        </>
      )
    
    case "list/tree":
      return (
        <>
          <TreeVisualizer
            step={step}
            tree={step.tree}
            numbers={numbers}
          />
          <hr />

          <h5>Visited list:</h5>
          <VisitedList visitedIds={step.visitedIds ?? []} />        
        </>
      )
    
    case "exList/tree":
      return (
        <>
          <TreeVisualizer
            step={step}
            tree={step.tree}
            numbers={numbers}
          />
          <hr />

          {linears?.map((linear) => (

            <div key={linear.id}>
              <h5>{linear.label}</h5>

              <ExtendedNumberList
                idPrefix={linear.id}
                numbers={linear.values}

                activeIds={activeIds}
                compareIds={compareIds}
                sortedIds={sortedIds}
              />
            </div>
          ))}
          
        </>
      )

    case "TVList/tree":
      return (
        <>
          <TreeVisualizer
            step={step}
            tree={step.tree}
            numbers={numbers}
          />

          {step.message && (
          <p className="custom-msg">
            {step.message}
          </p>
          )}
          <hr />

          <div className="custom-listlayout">

            <div
              style={{
                minWidth: "180px"
              }}
            >

              {step.target !== undefined && (
                <>
                  <h5>Target:</h5>

                  <ListGroup horizontal className="custom-listgroup">

                    <div className="custom-listelm">

                      <small className="index-label">
                        Target
                      </small>

                      <ListGroup.Item
                        style={{
                          fontWeight: "bold",
                          minWidth: "100px",
                          textAlign: "center"
                        }}
                      >
                        {step.target}
                      </ListGroup.Item>

                    </div>

                  </ListGroup>
                </>
              )}

            </div>

            <div style={{ flex: 1 }}>

              {step.visitedIds && (
                <>
                  <h5>Visited list:</h5>

                  <VisitedList
                    visitedIds={step.visitedIds ?? []}
                  />
                </>
              )}

            </div>

          </div>

        </>
      )

    case "list/graph":
      return (
        <>
          <GraphVisualizer
            step={step}
            graph={step.graph}
          />
          {step.message && (
          <p className="custom-msg">
            {step.message}
          </p>
          )}
          <hr />
          <h5>Visited list:</h5>
          <VisitedList visitedIds={step.visitedIds ?? []} />

        </>
      )

    case "TList/bar":
      return (
        <>
          <BarsList
            numbers={numbers}
            activeIds={activeIds}
            compareIds={compareIds}
            sortedIds={sortedIds}
          />
          {step.message && (
          <p className="custom-msg">
            {step.message}
          </p>
          )}
          <hr />

          <div className="custom-listlayout">

            <div
              style={{
                minWidth: "180px"
              }}
            >

              {step.target !== undefined && (
                <>
                  <ListGroup horizontal className="custom-listgroup">

                    <div className="custom-listelm">

                      <small className="index-label">
                        Target
                      </small>

                      <ListGroup.Item
                        style={{
                          fontWeight: "bold",
                          minWidth: "100px",
                          textAlign: "center"
                        }}
                      >
                        {step.target}
                      </ListGroup.Item>

                    </div>

                  </ListGroup>
                </>
              )}

            </div>

            <div style={{ flex: 1 }}>

            <NumberList
              numbers={numbers}
              activeIds={activeIds}
              compareIds={compareIds}
              sortedIds={sortedIds}
            />

            </div>

          </div>

        </>
      )
    
    case "distList/graph":
      return (
        <>
          <GraphVisualizer
            step={step}
            graph={step.graph}
          />
          {step.message && (
          <p className="custom-msg">
            {step.message}
          </p>
          )}
          <hr />

          <div className="custom-listlayout">
            <div>
              {step.distances !== undefined && (
                <>
                  <h5>Distance list:</h5>

                  <DistanceList distances={step.distances }/>
                </>
              )}
            </div>
            
            <div className="custom-listlayout-without-margin">
              <div style={{ minWidth: "180px"}}>
                {step.start !== undefined && (
                  <>
                    <h5>Start:</h5>

                    <ListGroup horizontal className="custom-listgroup">

                      <div className="custom-listelm">

                        <small className="index-label">
                          Start
                        </small>

                        <ListGroup.Item
                          style={{
                            fontWeight: "bold",
                            minWidth: "100px",
                            textAlign: "center"
                          }}
                        >
                          {step.start}
                        </ListGroup.Item>

                      </div>

                    </ListGroup>
                  </>
                )}
              </div>
            

              <div style={{ minWidth: "180px"}}>
                {step.target !== undefined && (
                  <>
                    <h5>Target:</h5>

                    <ListGroup horizontal className="custom-listgroup">

                      <div className="custom-listelm">

                        <small className="index-label">
                          Target
                        </small>

                        <ListGroup.Item
                          style={{
                            fontWeight: "bold",
                            minWidth: "100px",
                            textAlign: "center"
                          }}
                        >
                          {step.target}
                        </ListGroup.Item>

                      </div>

                    </ListGroup>
                  </>
                )}
              </div>
           
            </div>

          </div>

          {/* <DistanceList distances={step.distances }/> */}

        </>
      )

    case "mstList/graph":
      return (
        <>
          <GraphVisualizer
            step={step}
            graph={step.graph}
          />
          {step.message && (
          <p className="custom-msg">
            {step.message}
          </p>
          )}
          <hr />

          <div className="custom-listlayout">

            <div
              style={{
                minWidth: "180px"
              }}
            >

              {step.mstWeight !== undefined && (
                <>
                  <h5>Total Weight:</h5>

                  <ListGroup horizontal className="custom-listgroup">

                    <div className="custom-listelm">

                      <small className="index-label">
                        Total
                      </small>

                      <ListGroup.Item
                        style={{
                          fontWeight: "bold",
                          minWidth: "100px",
                          textAlign: "center"
                        }}
                      >
                        {step.mstWeight}
                      </ListGroup.Item>

                    </div>

                  </ListGroup>
                </>
              )}

            </div>

            <div style={{ flex: 1 }}>

              {step.mstEdges && (
                <>
                  <h5>MST Edges:</h5>

                  <MSTEdgeList
                    edges={step.mstEdges}
                  />
                </>
              )}

            </div>

          </div>

        </>
      )

  } 
  
    
}

export default Visualizer