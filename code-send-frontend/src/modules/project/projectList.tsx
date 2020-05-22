import React, { FunctionComponent } from "react";
import {
  Button,
  PageHeader,
  Card,
  Row,
  Col,
  Typography,
  Popconfirm,
  Result,
  Divider
} from "antd";
import { Link } from "react-router-dom";
import { useGetAllProject, useDeleteProject } from "hooks/api/useProjectApi";
import { useProjectAction, useProjectState } from "hooks/store/useProjectStore";
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
import { ReactComponent as Empty } from "assets/images/empty.svg";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: FunctionComponent<ProjectCardProps> = ({ project }) => {
  const { selectProject } = useProjectAction();
  const { deleteProject } = useDeleteProject();

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
      onClick={() => selectProject(project)}
      actions={[
        <Link to="/project/edit">
          <EditOutlined title="Edit Project" />
        </Link>,
        <Popconfirm
          title="Are you sure delete this project ?"
          onConfirm={() => deleteProject(project._id)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined title="Delete Project" />
        </Popconfirm>,
        <MoreOutlined />
      ]}
    >
      <Link to="/dashboard">
        <Row justify="center">
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
      </Link>
    </Card>
  );
};

const ProjectList: FunctionComponent = () => {
  const { items, loading } = useProjectState();
  const { clearSelectedProject } = useProjectAction();
  useGetAllProject();

  return (
    <>
      <PageHeader title="Projects" subTitle="Show your project list" />

      <Container>
        <Link to="/project/create">
          <Button type="primary" onClick={clearSelectedProject}>
            Create New Project
          </Button>
        </Link>

        <Divider />

        {loading ? (
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Card loading={loading} />
            </Col>
            <Col span={6}>
              <Card loading={loading} />
            </Col>
            <Col span={6}>
              <Card loading={loading} />
            </Col>
            <Col span={6}>
              <Card loading={loading} />
            </Col>
            <Col span={6}>
              <Card loading={loading} />
            </Col>
            <Col span={6}>
              <Card loading={loading} />
            </Col>
            <Col span={6}>
              <Card loading={loading} />
            </Col>
            <Col span={6}>
              <Card loading={loading} />
            </Col>
          </Row>
        ) : items.length ? (
          <Row style={{ marginTop: 16 }} gutter={[16, 16]}>
            {items.map((item, index) => (
              <Col span={6} key={index}>
                <ProjectCard project={item} />
              </Col>
            ))}
          </Row>
        ) : (
          <Card>
            <Result
              icon={<Empty style={{ width: 200, height: 200 }} />}
              title="You Have No Project !"
              subTitle="Create one and start developing your application"
              extra={
                <Link to="/project/create">
                  <Button type="primary">Create Project Now</Button>
                </Link>
              }
            />
          </Card>
        )}
      </Container>
    </>
  );
};

export default ProjectList;
