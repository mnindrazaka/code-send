import React, { useMemo, FunctionComponent } from "react";
import { Button, Table, PageHeader, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { useGetAllUpdate } from "hooks/useUpdate";
import Container from "components/container";
import { ColumnType } from "antd/lib/table";
import { Update } from "interfaces/Update";
import { getFormattedDate } from "utils/dateTime";

interface TableAction {
  update: Update;
}

const TableAction: FunctionComponent<TableAction> = ({ update }) => {
  return (
    <Row gutter={15}>
      <Col>
        <Link to={{ pathname: "/update/edit", state: { update } }}>
          <Button type="primary">Edit</Button>
        </Link>
      </Col>
      <Col>
        <Button href={update.bundleUrl}>Download Bundle</Button>
      </Col>
    </Row>
  );
};

const UpdateLog: FunctionComponent = () => {
  const { items, loading } = useGetAllUpdate();

  const columns = useMemo((): ColumnType<Update>[] => {
    return [
      {
        title: "Relase Date",
        render: (value, record) => (
          <span>{getFormattedDate(record.createdAt)}</span>
        )
      },
      {
        title: "Version",
        dataIndex: "version"
      },
      {
        title: "Note",
        dataIndex: "note"
      },
      {
        title: "",
        render: (value, record) => <TableAction update={record} />
      }
    ];
  }, []);

  return (
    <div data-testid="page-update-log">
      <PageHeader title="Update Logs" subTitle="Show your update logs" />

      <Container>
        <Link to="/update/create">
          <Button type="primary">Create New Update</Button>
        </Link>

        <Table
          dataSource={items}
          columns={columns}
          style={{ marginTop: 15 }}
          data-testid="table-update-log"
          loading={loading}
        />
      </Container>
    </div>
  );
};

export default UpdateLog;
