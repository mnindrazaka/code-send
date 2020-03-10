import React from "react";
import { Button, Skeleton, PageHeader, Card, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { useGetAllProject, useSelectProject } from "hooks/useProject";
import { FileOutlined } from "@ant-design/icons";

const ProjectList: React.FC = () => {
  const { items, loading } = useGetAllProject();
  const { selectProject } = useSelectProject();

  return (
    <div data-testid="page-update-log">
      <PageHeader title="Projects" subTitle="Show your project list" />

      <Link to="/project/create">
        <Button type="primary">Create New Project</Button>
      </Link>

      <Skeleton loading={loading} active>
        <Row gutter={[15, 15]}>
          {items.map(item => (
            <Col span={6} key={item._id}>
              <Card onClick={() => selectProject(item)}>
                <Card.Meta
                  title={item.name}
                  description={item.createdAt}
                  avatar={<FileOutlined />}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Skeleton>
    </div>
  );
};

export default ProjectList;
