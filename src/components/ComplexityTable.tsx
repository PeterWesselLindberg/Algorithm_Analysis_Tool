import { Table } from "react-bootstrap"
import type { AlgoType } from "../types/algoType"
import type { DataType } from "../types/dataType"
import formatMathText from "../utils/formatMathText"
import type { StableType } from "../types/stableType"
interface ComplexityTableProps {
    algoType?: AlgoType
    dataType?: DataType
    name?: string
    best?: string
    average?: string
    worst?: string
    memory?: string
    stable?: StableType
}

const ComplexityTable = ({
    algoType,
    dataType,
    name,
    best,
    average,
    worst,
    memory,
    stable
}: ComplexityTableProps) => {
  return (
    <>
        <Table striped bordered hover className="custom-table">
            <thead>
                <tr>
                    {algoType ? <th>Class</th> : undefined}
                    {dataType ? <th>Data structure(s)</th> : undefined}
                    {name ? <th>Name</th> : undefined}
                    {best ? <th>Best-case <br/> performance</th> : undefined}
                    {average ? <th>Average-case <br/> performance</th> : undefined}
                    {worst ? <th>Worst-case <br/> performance</th> : undefined}
                    {memory ? <th>Memory</th> : undefined}
                    {stable ? <th>Stable</th> : undefined}
                </tr>
            </thead>

            <tbody>
                <tr>
                    {algoType ? <td>{algoType}</td> : undefined}
                    {dataType ? <td>{dataType}</td> : undefined}
                    {name ? <td>{name}</td> : undefined}
                    {best ? <td>{formatMathText(best)}</td> : undefined}
                    {average ? <td>{formatMathText(average)}</td> : undefined}
                    {worst ? <td>{formatMathText(worst)}</td> : undefined}
                    {memory ? <td>{formatMathText(memory)}</td> : undefined}
                    {stable ? <td>{stable}</td> : undefined}
                </tr>
            </tbody>
        </Table>
       
    </>
  )
}

export default ComplexityTable