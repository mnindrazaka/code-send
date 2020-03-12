import React, { FunctionComponent, useMemo } from "react";
import { TextField, Form } from "components/formikWrapper";
import { ProjectFormValues, Project } from "interfaces/Project";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, PageHeader } from "antd";
import { useCreateProject, useEditProject } from "hooks/useProject";
import Container from "components/container";
import { useHistory } from "react-router-dom";
import useToggleForm from "hooks/useToggleForm";

interface ProjectFormHistory {
  project?: Project;
}

const ProjectForm: FunctionComponent = () => {
  const { createProject, loading } = useCreateProject();
  const { editProject } = useEditProject();
  const { state } = useHistory<ProjectFormHistory>().location;

  const project = useMemo(() => {
    return state ? state.project : undefined;
  }, [state]);

  const validationSchema = yup.object().shape({
    name: yup.string().required()
  });

  const { title, subTitle, initialValues, handleSubmit } = useToggleForm<
    ProjectFormValues
  >({
    name: "Project",
    emptyValues: { name: "" },
    filledValues: project,
    onCreate: createProject,
    onEdit: values => editProject(project?._id || "", values)
  });

  return (
    <div data-testid="page-project-form">
      <PageHeader title={title} subTitle={subTitle} />
      <Container>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
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
