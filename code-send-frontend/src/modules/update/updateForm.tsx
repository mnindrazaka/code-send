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
import {
  Button,
  PageHeader,
  Checkbox,
  Form as AntdForm,
  Card,
  Divider
} from "antd";
import { useCreateUpdate, useEditUpdate } from "hooks/api/useUpdateApi";
import Container from "components/container";
import useToggleForm from "hooks/useToggleForm";
import { useUpdateState } from "hooks/store/useUpdateStore";
import { useHistory } from "react-router-dom";

const UpdateForm: FunctionComponent = () => {
  const { loading, selected } = useUpdateState();
  const { createUpdate } = useCreateUpdate();
  const { editUpdate } = useEditUpdate();
  const history = useHistory();
  const [isRegional, setRegional] = useState<boolean>(false);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      version: selected
        ? yup.number().typeError("version must be a number")
        : yup
            .number()
            .typeError("version must be a number")
            .required(),
      note: yup.string().required(),
      bundle: selected ? yup.mixed() : yup.mixed().required(),
      location: isRegional && !selected ? yup.mixed().required() : yup.mixed()
    });
  }, [selected, isRegional]);

  const handleCreateUpdate = React.useCallback(
    (values: UpdateFormValues) => {
      if (isRegional) createUpdate(values);
      else createUpdate({ ...values, location: undefined });
    },
    [isRegional, createUpdate]
  );

  const handleEditUpdate = React.useCallback(
    (values: UpdateFormValues) => {
      if (!selected) return;
      editUpdate(selected._id, values);
    },
    [selected, editUpdate]
  );

  const { title, subTitle, initialValues, handleSubmit } = useToggleForm<
    UpdateFormValues
  >({
    name: "Update",
    emptyValues: { note: "", version: "", location: undefined },
    filledValues: selected,
    onCreate: handleCreateUpdate,
    onEdit: handleEditUpdate
  });

  const handleToggleRegional = useCallback(() => {
    setRegional(prev => !prev);
  }, []);

  return (
    <>
      <PageHeader title={title} subTitle={subTitle} onBack={history.goBack} />
      <Container>
        <Card>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              {!selected && (
                <TextField name="version" label="Version" placeholder="0.1" />
              )}
              <TextField
                name="note"
                label="Note"
                placeholder="add feature to application"
              />
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
              <Divider />
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Form>
          </Formik>
        </Card>
      </Container>
    </>
  );
};

export default UpdateForm;
