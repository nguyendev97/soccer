import styled from 'styled-components'

const TableWrapper = styled.div`
  overflow: auto;
  width: 100%;
  padding: 0 20px;
`

const Table = styled.table`
  width: 100%;
  @media (max-width: 576px) {
    width: auto;
  }
`
const Thead = styled.thead`
  padding: 10px 30px;
  background: #1d018d;
  border-radius: 10px 10px 0px 0px;
`
const Tr = styled.tr`
  border-bottom: 1px solid #171b43;
`
const Th = styled.th`
  padding: 24px 0;
  padding-left: 24px;
  color: #fff;
  text-align: left;
  font-size: 18px;
  text-align: center;
`
const Td = styled.td`
  padding: 16px 0;
  padding-left: 24px;
  color: #36dbff;
  height: 60px;
  &.no {
    color: #fff;
  }
  p {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
  }
`

const CompetitionTable = () => {
  return (
    <TableWrapper>
      <Table>
        <Thead>
          <Tr>
            <Th>No</Th>
            <Th>Address</Th>
          </Tr>
        </Thead>
        <tbody>
          {exampleData.map(({ no, address }) => {
            let render: any = no
            if (no < 4) {
              render = <img src={`/images/ranks/rank-${no}.svg`} alt="" />
            }
            return (
              <Tr key={no}>
                <Td className="no">
                  <p>{render}</p>
                </Td>
                <Td>
                  <p>{address}</p>
                </Td>
              </Tr>
            )
          })}
        </tbody>
      </Table>
    </TableWrapper>
  )
}

export default CompetitionTable

const exampleData = [
  { no: 1, address: '0xfBB6F5953bb8da51220C5fC06EDC71A6bABc18f6' },
  { no: 2, address: '0xfBB6F5953bb8da51220C5fC06EDC71A6bABc18f6' },
  { no: 3, address: '0xfBB6F5953bb8da51220C5fC06EDC71A6bABc18f6' },
  { no: 4, address: '0xfBB6F5953bb8da51220C5fC06EDC71A6bABc18f6' },
  { no: 5, address: '0xfBB6F5953bb8da51220C5fC06EDC71A6bABc18f6' },
]
