import React from "react";
import "matchMedia.mock";
import { Button, Skeleton, PageHeader, Card, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { useGetAllProject, useSelectProject } from "hooks/useProject";
import { FileOutlined } from "@ant-design/icons";

const ProjectList: React.FC = () => {
  const { items, loading } = useGetAllProject();
  const { selectProject } = useSelectProject();

  return (
    <div data-testid="page-project-list">
      <PageHeader title="Projects" subTitle="Show your project list" />

      <Link to="/project/create">
        <Button type="primary">Create New Project</Button>
      </Link>

      <Skeleton loading={loading} active>
        <Row gutter={[15, 15]}>
          {items.map((item, index) => (
            <Col span={6} key={index}>
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
