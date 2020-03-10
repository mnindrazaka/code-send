import React from "react";
import { TextField, Form, FileField } from "components/formikWrapper";
import { UpdateFormValues } from "interfaces/Update";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, PageHeader } from "antd";
import { useCreateUpdate } from "hooks/useUpdate";

const validationSchema = yup.object().shape({
  version: yup.string().required(),
  note: yup.string().required(),
  bundle: yup.mixed().required()
});

const initialValues: UpdateFormValues = {
  version: "",
  note: ""
};

const UpdateForm: React.FC = () => {
  const { createUpdate, loading } = useCreateUpdate();

  return (
    <div data-testid="page-update-form">
      <PageHeader
        title="Create Update"
        subTitle="Create and realease your new update"
      />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={createUpdate}
      >
        <Form>
          <TextField name="version" label="Version" />
          <TextField name="note" label="Note" />
          <FileField name="bundle" label="Bundle" />
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default UpdateForm;
