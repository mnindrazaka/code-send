import React from "react";
import { render } from "@testing-library/react";
import { Form } from "../form";
import { Formik } from "formik";

const { container } = render(
  <Formik initialValues={{}} onSubmit={jest.fn()}>
    {() => <Form />}
  </Formik>
);

describe("form", () => {
  it("can render correctly", () => {
    expect(container).toBeInTheDocument();
  });
});
