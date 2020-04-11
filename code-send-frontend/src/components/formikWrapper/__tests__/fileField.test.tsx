import React from "react";
import { fireEvent, act } from "@testing-library/react";
import { FileField } from "../fileField";
import { renderFormik } from "../utils";
import initMatchMedia from "matchMedia.mock";

initMatchMedia();

const label = "Bundle";
const name = "bundle";
const filename = "index.js";

const renderFileField = () => {
  const utils = renderFormik(<FileField label={label} name={name} />, name);
  return utils;
};

describe("file field", () => {
  it("has choose file button", () => {
    const { getByText } = renderFileField();
    const buttonElement = getByText("Choose File");
    act(() => {
      fireEvent.click(buttonElement);
    });
    expect(buttonElement).toBeInTheDocument();
  });

  it("can change file name", async () => {
    const { getByLabelText, findByText } = renderFileField();
    const mockFile = new File(["mock content"], filename);
    const inputElement = getByLabelText(label);
    act(() => {
      fireEvent.change(inputElement, { target: { files: [mockFile] } });
    });
    const valueElement = await findByText(filename);
    expect(valueElement).toBeInTheDocument();
  });
});
