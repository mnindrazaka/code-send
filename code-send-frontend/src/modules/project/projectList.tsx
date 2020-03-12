import React, { FunctionComponent } from "react";
import { Button, Skeleton, PageHeader, Card, Row, Col, Typography } from "antd";
import { Link } from "react-router-dom";
import { useGetAllProject, useSelectProject } from "hooks/useProject";
import { EditOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import Container from "components/container";
import { getFormattedDate } from "utils/dateTime";
import { Project } from "interfaces/Project";
import { ReactComponent as ProjectCover1 } from "assets/images/projectCover1.svg";
import { ReactComponent as ProjectCover2 } from "assets/images/projectCover2.svg";
import { ReactComponent as ProjectCover3 } from "assets/images/projectCover3.svg";
import { ReactComponent as ProjectCover4 } from "assets/images/projectCover4.svg";
import { ReactComponent as ProjectCover5 } from "assets/images/projectCover5.svg";
import { ReactComponent as ProjectCover6 } from "assets/images/projectCover6.svg";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: FunctionComponent<ProjectCardProps> = ({ project }) => {
  const { selectProject } = useSelectProject();

  const projectCover = React.useMemo(() => {
    const covers = [
      <ProjectCover1 style={{ width: 150, height: 150 }} />,
      <ProjectCover2 style={{ width: 150, height: 150 }} />,
      <ProjectCover3 style={{ width: 150, height: 150 }} />,
      <ProjectCover4 style={{ width: 150, height: 150 }} />,
      <ProjectCover5 style={{ width: 150, height: 150 }} />,
      <ProjectCover6 style={{ width: 150, height: 150 }} />
    ];
    return covers[Math.floor(Math.random() * covers.length)];
  }, []);

  return (
    <Card
      hoverable
      actions={[
        <Link to={{ pathname: "/project/edit", state: { project } }}>
          <EditOutlined title="edit project" />
        </Link>,
        <DeleteOutlined title="delete project" />,
        <MoreOutlined />
      ]}
    >
      <Row justify="center" onClick={() => selectProject(project)}>
        <Col style={{ textAlign: "center" }}>
          {projectCover}
          <Typography.Title ellipsis level={4}>
            {project.name}
          </Typography.Title>
          <Typography.Text>
            {getFormattedDate(project.createdAt)}
          </Typography.Text>
        </Col>
      </Row>
    </Card>
  );
};

const ProjectList: FunctionComponent = () => {
  const { items, loading } = useGetAllProject();
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
                <ProjectCard project={item} />
              </Col>
            ))}
          </Row>
        </Skeleton>
      </Container>
    </div>
  );
};

export default ProjectList;
