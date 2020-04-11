import React from "react";
import { fireEvent, act } from "@testing-library/react";
import { TextField } from "../textField";
import { renderFormik } from "../utils";
import initMatchMedia from "matchMedia.mock";

initMatchMedia();

const name = "username";
const label = "Username";

const renderTextField = () => {
  const utils = renderFormik(<TextField label={label} name={name} />, name);
  return utils;
};

describe("text field", () => {
  it("can change text value", async () => {
    const { getByLabelText } = renderTextField();
    const inputElement = getByLabelText(label);
    await act(async () => {
      fireEvent.change(inputElement, { target: { value: "mnindrazaka" } });
    });
    expect(inputElement).toHaveValue("mnindrazaka");
  });

  it("can show error message", async () => {
    const { getByLabelText, findByText } = renderTextField();
    const inputElement = getByLabelText(label);
    await act(async () => {
      fireEvent.change(inputElement, { target: { value: "mnindrazaka" } });
    });
    await act(async () => {
      fireEvent.change(inputElement, { target: { value: "" } });
    });
    const errorElement = await findByText("input required");
    expect(errorElement).toBeInTheDocument();
  });
});
