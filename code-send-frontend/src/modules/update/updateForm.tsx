import React, { FunctionComponent } from "react";
import { TextField, Form, FileField } from "components/formikWrapper";
import { UpdateFormValues } from "interfaces/Update";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, PageHeader } from "antd";
import { useCreateUpdate, useEditUpdate } from "hooks/useUpdate";
import Container from "components/container";
import useToggleForm from "hooks/useToggleForm";
import { useUpdateState } from "hooks/useStore";

const UpdateForm: FunctionComponent = () => {
  const { loading, selected } = useUpdateState();
  const { createUpdate } = useCreateUpdate();
  const { editUpdate } = useEditUpdate();

  const validationSchema = yup.object().shape({
    version: selected ? yup.string() : yup.string().required(),
    note: yup.string().required(),
    bundle: selected ? yup.mixed() : yup.mixed().required()
  });

  const { title, subTitle, initialValues, handleSubmit } = useToggleForm<
    UpdateFormValues
  >({
    name: "Update",
    emptyValues: { note: "", version: "" },
    filledValues: selected,
    onCreate: createUpdate,
    onEdit: values => editUpdate(selected?._id || "", values)
  });

  return (
    <div data-testid="page-update-form">
      <PageHeader title={title} subTitle={subTitle} />
      <Container>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            {!selected && <TextField name="version" label="Version" />}
            <TextField name="note" label="Note" />
            {!selected && <FileField name="bundle" label="Bundle" />}
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form>
        </Formik>
      </Container>
    </div>
  );
};

export default UpdateForm;
