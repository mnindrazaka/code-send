import React from "react";
import { TextField, Form } from "components/formikWrapper";
import { ProjectFormValues } from "interfaces/Project";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, PageHeader } from "antd";
import { useCreateProject } from "hooks/useProject";
import Container from "components/container";

const validationSchema = yup.object().shape({
  name: yup.string().required()
});

const initialValues: ProjectFormValues = {
  name: ""
};

const ProjectForm: React.FC = () => {
  const { createProject, loading } = useCreateProject();

  return (
    <div data-testid="page-project-form">
      <PageHeader title="Create Project" subTitle="Create your new project" />
      <Container>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={createProject}
        >
          <Form>
            <TextField name="name" label="Name" />
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form>
        </Formik>
      </Container>
    </div>
  );
};

export default ProjectForm;
