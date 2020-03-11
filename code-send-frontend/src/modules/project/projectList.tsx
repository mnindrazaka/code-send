import React from "react";
import { Button, Skeleton, PageHeader, Card, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { useGetAllProject, useSelectProject } from "hooks/useProject";
import { FileOutlined } from "@ant-design/icons";
import Container from "components/container";
import { getFormattedDate } from "utils/dateTime";

const ProjectList: React.FC = () => {
  const { items, loading } = useGetAllProject();
  const { selectProject } = useSelectProject();

  return (
    <div data-testid="page-project-list">
      <PageHeader title="Projects" subTitle="Show your project list" />

      <Container>
        <Link to="/project/create">
          <Button type="primary">Create New Project</Button>
        </Link>

        <Skeleton loading={loading} active>
          <Row style={{ marginTop: 15 }} gutter={[15, 15]}>
            {items.map((item, index) => (
              <Col span={6} key={index}>
                <Card onClick={() => selectProject(item)}>
                  <Card.Meta
                    title={item.name}
                    description={getFormattedDate(item.createdAt)}
                    avatar={<FileOutlined />}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Skeleton>
      </Container>
    </div>
  );
};

export default ProjectList;
