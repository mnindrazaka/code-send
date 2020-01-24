import React from 'react'
import { Table, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const UpdateLog: React.FC = () => {
  return (
    <div data-testid="page-update-log">
      <Button as={Link} to="/update/create" data-testid="button-create-update">
        Create New Update
      </Button>

      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>No</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Version</Table.HeaderCell>
            <Table.HeaderCell>Note</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>24/01/2020</Table.Cell>
            <Table.Cell>0.1</Table.Cell>
            <Table.Cell>Update UI</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>25/01/2020</Table.Cell>
            <Table.Cell>0.1</Table.Cell>
            <Table.Cell>Update Text</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>3</Table.Cell>
            <Table.Cell>26/01/2020</Table.Cell>
            <Table.Cell>0.1</Table.Cell>
            <Table.Cell>Update Feature</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  )
}

export default UpdateLog
