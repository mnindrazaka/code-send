import React, { useMemo, FunctionComponent } from "react";
import { Button, Table, PageHeader, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { useGetAllUpdate } from "hooks/api/useUpdateApi";
import Container from "components/container";
import { ColumnType } from "antd/lib/table";
import { Update } from "interfaces/Update";
import { getFormattedDate } from "utils/dateTime";
import { useUpdateAction, useUpdateState } from "hooks/store/useUpdateStore";

interface TableAction {
  update: Update;
}

const TableAction: FunctionComponent<TableAction> = ({ update }) => {
  const { selectUpdate } = useUpdateAction();
  return (
    <Row gutter={15}>
      <Col>
        <Link to="/update/edit">
          <Button type="primary" onClick={() => selectUpdate(update)}>
            Edit
          </Button>
        </Link>
      </Col>
      <Col>
        <Button href={update.bundleUrl}>Download Bundle</Button>
      </Col>
    </Row>
  );
};

const UpdateLog: FunctionComponent = () => {
  const { items, loading } = useUpdateState();
  const { clearSelectedUpdate } = useUpdateAction();
  useGetAllUpdate();

  const columns = useMemo((): ColumnType<Update>[] => {
    return [
      {
        key: "date",
        title: "Relase Date",
        render: (value, record) => (
          <span>{getFormattedDate(record.createdAt)}</span>
        )
      },
      {
        key: "version",
        title: "Version",
        dataIndex: "version"
      },
      {
        key: "note",
        title: "Note",
        dataIndex: "note"
      },
      {
        key: "location",
        title: "Location",
        render: (value, record) =>
          record.location ? record.location.name : "Global"
      },
      {
        key: "action",
        title: "",
        render: (value, record) => <TableAction update={record} />
      }
    ];
  }, []);
  const dataSource = useMemo(
    () => items.map(item => ({ ...item, key: item._id })),
    [items]
  );

  return (
    <>
      <PageHeader title="Update Logs" subTitle="Show your update logs" />

      <Container>
        <Link to="/update/create">
          <Button type="primary" onClick={clearSelectedUpdate}>
            Create New Update
          </Button>
        </Link>

        <Table
          dataSource={dataSource}
          columns={columns}
          style={{ marginTop: 15 }}
          data-testid="table-update-log"
          loading={loading}
        />
      </Container>
    </>
  );
};

export default UpdateLog;
