import React, { useMemo } from "react";
import { Button, Table, PageHeader } from "antd";
import { Link } from "react-router-dom";
import { useGetAllUpdate } from "hooks/useUpdate";
import Container from "components/container";
import { ColumnType } from "antd/lib/table";
import { Update } from "interfaces/Update";

const UpdateLog: React.FC = () => {
  const { items, loading } = useGetAllUpdate();

  const columns = useMemo((): ColumnType<Update>[] => {
    return [
      {
        title: "Relase Date",
        dataIndex: "createdAt"
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
        render: (value, record) => (
          <Button href={record.bundleUrl}>Download Bundle</Button>
        )
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
