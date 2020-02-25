import React, { useState, useEffect } from "react";
import { Table, Button, Dimmer, Loader } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Update } from "interfaces/Update";
import codeSendService from "utils/api/codeSendService";
import swal from "sweetalert";

const UpdateLog: React.FC = () => {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    codeSendService
      .getAllUpdates()
      .then(updates => setUpdates(updates))
      .catch(error =>
        swal({
          title: "Failed",
          text: error.message,
          icon: "error"
        })
      )
      .finally(() => setLoading(false));
  }, []);

  const renderData = () => {
    return updates.map((update, index) => (
      <Table.Row key={index}>
        <Table.Cell>{index + 1}</Table.Cell>
        <Table.Cell>{update.createdAt}</Table.Cell>
        <Table.Cell>{update.version}</Table.Cell>
        <Table.Cell>{update.note}</Table.Cell>
        <Table.Cell>
          <Button as="a" href={update.bundleUrl} basic>
            Download
          </Button>
        </Table.Cell>
      </Table.Row>
    ));
  };

  const renderTable = () => {
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>No</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Version</Table.HeaderCell>
            <Table.HeaderCell>Note</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body data-testid="table-body-update-log">
          {renderData()}
        </Table.Body>
      </Table>
    );
  };

  const renderLoading = () => {
    return (
      <Dimmer active inverted>
        <Loader inverted size="medium">
          Getting Update
        </Loader>
      </Dimmer>
    );
  };

  return (
    <div data-testid="page-update-log">
      <Button
        as={Link}
        to="/update/create"
        primary
        data-testid="button-create-update"
      >
        Create New Update
      </Button>
      {loading ? renderLoading() : renderTable()}
    </div>
  );
};

export default UpdateLog;
