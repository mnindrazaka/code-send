import React from "react";
import { Button, Skeleton, Table, PageHeader } from "antd";
import { Link } from "react-router-dom";
import { useGetAllUpdate } from "hooks/useUpdate";

const UpdateLog: React.FC = () => {
  const { updates, loading } = useGetAllUpdate();

  const getDataSource = () => {
    return updates.map(update => ({
      key: update._id,
      date: update.createdAt,
      version: update.version,
      note: update.note
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

      <Link to="/update/create">
        <Button type="primary">Create New Update</Button>
      </Link>

      <Skeleton loading={loading} active>
        <Table
          dataSource={getDataSource()}
          columns={getColumns()}
          style={{ marginTop: 15 }}
          data-testid="table-update-log"
        />
      </Skeleton>
    </div>
  );
};

export default UpdateLog;
