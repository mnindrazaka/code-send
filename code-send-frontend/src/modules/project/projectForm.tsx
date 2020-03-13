import React, { FunctionComponent } from "react";
import { TextField, Form } from "components/formikWrapper";
import { ProjectFormValues } from "interfaces/Project";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, PageHeader } from "antd";
import { useCreateProject, useEditProject } from "hooks/api/useProjectApi";
import Container from "components/container";
import useToggleForm from "hooks/useToggleForm";
import { useProjectState } from "hooks/store/useProjectStore";

const ProjectForm: FunctionComponent = () => {
  const { selected, loading } = useProjectState();
  const { createProject } = useCreateProject();
  const { editProject } = useEditProject();

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
    </>
  );
};

export default ProjectForm;
