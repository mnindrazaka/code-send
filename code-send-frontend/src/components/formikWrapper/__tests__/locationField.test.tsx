import React from "react";
import { fireEvent, act } from "@testing-library/react";
import { LocationField } from "../locationField";
import { renderFormik } from "../utils";
import initMatchMedia from "matchMedia.mock";
import codeSendService from "utils/api/codeSendService";

initMatchMedia();

jest.mock("utils/api/codeSendService");
const codeSendServiceMock = codeSendService as jest.Mocked<
  typeof codeSendService
>;

const name = "location";
const label = "Location";

const renderTextField = () => {
  const utils = renderFormik(<LocationField label={label} name={name} />, name);
  return utils;
};

describe("location field", () => {
  it("can change text value when user type", async () => {
    const { getByLabelText } = renderTextField();
    const inputElement = getByLabelText(label);
    await act(async () => {
      fireEvent.change(inputElement, { target: { value: "jawa" } });
    });
    expect(inputElement).toHaveValue("jawa");
  });

  it("can change text value when user select location", async () => {
    codeSendServiceMock.forwardGeocoding.mockResolvedValueOnce([
      {
        latitude: -6.75,
        longitude: 107.5,
        name: "Jawa Barat, Indonesia"
      },
      {
        latitude: -7.93917,
        longitude: 112.95278,
        name: "Jawa Timur, Indonesia"
      },
      {
        latitude: -7.5,
        longitude: 110,
        name: "Jawa Tengah, Indonesia"
      }
    ]);

    const { getByLabelText, findByText } = renderTextField();
    const inputElement = getByLabelText(label);
    await act(async () => {
      fireEvent.change(inputElement, { target: { value: "jawa" } });
    });

    const optionItemElement = await findByText("Jawa Timur, Indonesia");
    await act(async () => {
      fireEvent.click(optionItemElement);
    });
    expect(inputElement).toHaveValue("Jawa Timur, Indonesia");
  });

  it("can show error message if location not valid", async () => {
    const { getByLabelText, findByText } = renderTextField();
    const inputElement = getByLabelText(label);
    await act(async () => {
      fireEvent.change(inputElement, { target: { value: "jawa" } });
    });
    const errorElement = await findByText("input required");
    expect(errorElement).toBeInTheDocument();
  });

  it("can show error message if value empty", async () => {
    const { getByLabelText, findByText } = renderTextField();
    const inputElement = getByLabelText(label);
    await act(async () => {
      fireEvent.change(inputElement, { target: { value: "jawa" } });
    });
    await act(async () => {
      fireEvent.change(inputElement, { target: { value: "" } });
    });
    const errorElement = await findByText("input required");
    expect(errorElement).toBeInTheDocument();
  });
});
