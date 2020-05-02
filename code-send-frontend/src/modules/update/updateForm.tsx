import React, {
  FunctionComponent,
  useState,
  useCallback,
  useMemo
} from "react";
import {
  TextField,
  Form,
  FileField,
  LocationField
} from "components/formikWrapper";
import { UpdateFormValues } from "interfaces/Update";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, PageHeader, Checkbox, Form as AntdForm } from "antd";
import { useCreateUpdate, useEditUpdate } from "hooks/api/useUpdateApi";
import Container from "components/container";
import useToggleForm from "hooks/useToggleForm";
import { useUpdateState } from "hooks/store/useUpdateStore";

const UpdateForm: FunctionComponent = () => {
  const { loading, selected } = useUpdateState();
  const { createUpdate } = useCreateUpdate();
  const { editUpdate } = useEditUpdate();
  const [isRegional, setRegional] = useState<boolean>(false);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      version: selected ? yup.string() : yup.string().required(),
      note: yup.string().required(),
      bundle: selected ? yup.mixed() : yup.mixed().required(),
      location: isRegional && !selected ? yup.mixed().required() : yup.mixed()
    });
  }, [selected, isRegional]);

  const { title, subTitle, initialValues, handleSubmit } = useToggleForm<
    UpdateFormValues
  >({
    name: "Update",
    emptyValues: { note: "", version: "", location: undefined },
    filledValues: selected,
    onCreate: createUpdate,
    onEdit: values => editUpdate(selected!._id, values)
  });

  const handleToggleRegional = useCallback(() => {
    setRegional(prev => !prev);
  }, []);

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
            {!selected && <TextField name="version" label="Version" />}
            <TextField name="note" label="Note" />
            {!selected && <FileField name="bundle" label="Bundle" />}
            {!selected && (
              <AntdForm.Item>
                <Checkbox checked={isRegional} onClick={handleToggleRegional}>
                  Release update only on particular location
                </Checkbox>
              </AntdForm.Item>
            )}
            {isRegional && !selected && (
              <LocationField name="location" label="Location" />
            )}
            <AntdForm.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </AntdForm.Item>
          </Form>
        </Formik>
      </Container>
    </>
  );
};

export default UpdateForm;
