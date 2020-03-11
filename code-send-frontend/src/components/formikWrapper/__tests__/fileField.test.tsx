import React from "react";
import "@testing-library/react/dont-cleanup-after-each";
import "matchMedia.mock";
import { fireEvent } from "@testing-library/react";
import { FileField } from "../fileField";
import { renderFormik } from "../utils";

const label = "Bundle";
const name = "bundle";
const filename = "mockFile.jpg";

const { getByLabelText, getByText, findByText } = renderFormik(
  <FileField label={label} name={name} />,
  name
);

describe("file field", () => {
  it("has choose file button", () => {
    const buttonElement = getByText("Choose File");
    fireEvent.click(buttonElement);
    expect(buttonElement).toBeInTheDocument();
  });

  it("can change file name", async () => {
    const mockFile = new File(["mock content"], filename);

    const inputElement = getByLabelText(label);
    fireEvent.change(inputElement, { target: { files: [mockFile] } });

    const valueElement = await findByText(filename);
    expect(valueElement).toBeInTheDocument();
  });
});
