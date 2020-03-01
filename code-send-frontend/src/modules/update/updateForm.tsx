import React from "react";
import { TextField, Form, FileField } from "components/formikWrapper";
import { UpdateFormValues } from "interfaces/Update";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, Loader, Dimmer } from "semantic-ui-react";
import swal from "sweetalert";
import { useHistory } from "react-router";
import { useCreateUpdate } from "hooks/stores/update";

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
  const history = useHistory();
  const { createUpdate, loading, error, success } = useCreateUpdate();

  const renderForm = () => {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={createUpdate}
      >
        <Form>
          <TextField name="version" label="Version" />
          <TextField name="note" label="Note" />
          <FileField name="bundle" label="Bundle" />
          <Button type="submit" primary>
            Submit
          </Button>
        </Form>
      </Formik>
    );
  };

  const renderLoading = () => {
    return (
      <Dimmer active inverted>
        <Loader inverted size="medium">
          Submitting Update
        </Loader>
      </Dimmer>
    );
  };

  if (error) {
    swal({
      title: "Failed",
      icon: "error",
      text: error
    });
  }

  if (success) {
    swal({
      title: "Success",
      icon: "success",
      text: "Create update success"
    });
    history.push("/update");
  }

  return (
    <div data-testid="page-update-form">
      {loading ? renderLoading() : renderForm()}
    </div>
  );
};

export default UpdateForm;
