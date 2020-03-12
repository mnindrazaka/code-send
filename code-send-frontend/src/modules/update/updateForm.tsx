import React, { FunctionComponent, useMemo } from "react";
import { TextField, Form, FileField } from "components/formikWrapper";
import { UpdateFormValues, Update } from "interfaces/Update";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, PageHeader } from "antd";
import { useCreateUpdate, useEditUpdate } from "hooks/useUpdate";
import Container from "components/container";
import useToggleForm from "hooks/useToggleForm";
import { useHistory } from "react-router-dom";

interface UpdateFormHistory {
  update?: Update;
}

const UpdateForm: FunctionComponent = () => {
  const { createUpdate, loading } = useCreateUpdate();
  const { editUpdate } = useEditUpdate();
  const { state } = useHistory<UpdateFormHistory>().location;

  const update = useMemo(() => {
    return state ? state.update : undefined;
  }, [state]);

  const validationSchema = yup.object().shape({
    version: update ? yup.string() : yup.string().required(),
    note: yup.string().required(),
    bundle: update ? yup.mixed() : yup.mixed().required()
  });

  const { title, subTitle, initialValues, handleSubmit } = useToggleForm<
    UpdateFormValues
  >({
    name: "Update",
    emptyValues: { note: "", version: "" },
    filledValues: update,
    onCreate: createUpdate,
    onEdit: values => editUpdate(update?._id || "", values)
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
            {!update && <TextField name="version" label="Version" />}
            <TextField name="note" label="Note" />
            {!update && <FileField name="bundle" label="Bundle" />}
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
