import React from "react";
import { Button, Table, PageHeader } from "antd";
import { Link } from "react-router-dom";
import { useGetAllUpdate } from "hooks/useUpdate";
import Container from "components/container";

const UpdateLog: React.FC = () => {
  const { items, loading } = useGetAllUpdate();

  const getDataSource = () => {
    return items.map(item => ({
      key: item._id,
      date: item.createdAt,
      version: item.version,
      note: item.note
    }));
  };

  const getColumns = () => {
    return [
      {
        title: "Relase Date",
        dataIndex: "date",
        key: "date"
      },
      {
        title: "Version",
        dataIndex: "version",
        key: "version"
      },
      {
        title: "Note",
        dataIndex: "note",
        key: "note"
      }
    ];
  };

  return (
    <div data-testid="page-update-log">
      <PageHeader title="Update Logs" subTitle="Show your update logs" />

      <Container>
        <Link to="/update/create">
          <Button type="primary">Create New Update</Button>
        </Link>

        <Table
          dataSource={getDataSource()}
          columns={getColumns()}
          style={{ marginTop: 15 }}
          data-testid="table-update-log"
          loading={loading}
        />
      </Container>
    </div>
  );
};

export default UpdateLog;
