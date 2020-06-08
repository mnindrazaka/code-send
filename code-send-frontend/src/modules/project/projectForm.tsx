import React, { FunctionComponent } from "react";
import { TextField, Form } from "components/formikWrapper";
import { ProjectFormValues } from "interfaces/Project";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, PageHeader, Card, Row, Col, Divider, Typography } from "antd";
import { useCreateProject, useEditProject } from "hooks/api/useProjectApi";
import Container from "components/container";
import useToggleForm from "hooks/useToggleForm";
import { useProjectState } from "hooks/store/useProjectStore";
import { ReactComponent as CreateProjectCover } from "assets/images/createProject.svg";
import { useHistory } from "react-router-dom";

const ProjectForm: FunctionComponent = () => {
  const { selected, loading } = useProjectState();
  const { createProject } = useCreateProject();
  const { editProject } = useEditProject();
  const history = useHistory();

  const validationSchema = yup.object().shape({
    name: yup.string().required()
  });

  const { title, subTitle, initialValues, handleSubmit } = useToggleForm<
    ProjectFormValues
  >({
    name: "Project",
    emptyValues: { name: "" },
    filledValues: selected,
    onCreate: createProject,
    onEdit: values => editProject(selected!._id, values)
  });

  return (
    <>
      <PageHeader title={title} subTitle={subTitle} onBack={history.goBack} />
      <Container>
        <Card>
          <Row justify="center" align="middle">
            <Col span={12} style={{ textAlign: "center" }}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <CreateProjectCover width={200} height={200} />
                  <Typography.Title level={4}>
                    Enter Your Project Name
                  </Typography.Title>
                  <Typography.Paragraph style={{ textAlign: "center" }}>
                    Give your project an awesome name or use your application
                    name instead
                  </Typography.Paragraph>
                  <Divider />
                  <TextField name="name" placeholder="Awesome App" />
                  <Divider />
                  <Button
                    style={{ marginBottom: 32 }}
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    block
                  >
                    {selected ? "Edit Project Now" : "Create Project Now"}
                  </Button>
                </Form>
              </Formik>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
};

export default ProjectForm;
