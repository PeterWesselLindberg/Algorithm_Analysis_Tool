import { Table } from "react-bootstrap"
import type { AlgoType } from "../types/algoType"
import type { DataType } from "../types/dataType"
interface ComplexityTableProps {
    algoType?: AlgoType
    dataType?: DataType
    name?: string
    best?: string
    average?: string
    worst?: string
    memory?: string
    stable?: string
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
                    {dataType ? <th>Data structure</th> : undefined}
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
                    {best ? <td>{best}</td> : undefined}
                    {average ? <td>{average}</td> : undefined}
                    {worst ? <td>{worst}</td> : undefined}
                    {memory ? <td>{memory}</td> : undefined}
                    {stable ? <td>{stable}</td> : undefined}
                </tr>
            </tbody>
        </Table>
       
    </>
  )
}

export default ComplexityTable