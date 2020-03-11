import React from "react";
import "@testing-library/react/dont-cleanup-after-each";
import { fireEvent } from "@testing-library/react";
import { TextField } from "../textField";
import { renderFormik } from "../utils";
import initMatchMedia from "matchMedia.mock";

initMatchMedia();

const name = "username";
const label = "Username";

const { getByLabelText, findByText } = renderFormik(
  <TextField label={label} name={name} />,
  name
);

describe("text field", () => {
  it("can change text value", async () => {
    const inputElement = getByLabelText(label);
    fireEvent.change(inputElement, { target: { value: "mockValue" } });
    expect(inputElement).toHaveValue("mockValue");
  });

  it("can show error message", async () => {
    const inputElement = getByLabelText(label);
    fireEvent.change(inputElement, { target: { value: "mockValue" } });
    fireEvent.change(inputElement, { target: { value: "" } });
    const errorElement = await findByText("input required");
    expect(errorElement).toBeInTheDocument();
  });
});
