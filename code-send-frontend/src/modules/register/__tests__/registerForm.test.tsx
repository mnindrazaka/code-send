import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { StoreProvider } from "stores";
import RegisterForm from "../registerForm";
import codeSendService from "utils/api/codeSendService";
import initMatchMedia from "matchMedia.mock";

initMatchMedia();

jest.mock("utils/api/codeSendService");
const codeSendServiceMock = codeSendService as jest.Mocked<
  typeof codeSendService
>;
const renderRegisterForm = () => {
  const utils = render(
    <MemoryRouter>
      <StoreProvider>
        <RegisterForm />
      </StoreProvider>
    </MemoryRouter>
  );
  return utils;
};

describe("login form", () => {
  it("can show register success message", async () => {
    const { findByText, getByLabelText, getByText } = renderRegisterForm();
    const inputUsernameElement = getByLabelText("Username");
    const inputPasswordElement = getByLabelText("Password");
    const inputPasswordConfirmationElement = getByLabelText(
      "Password Confirmation"
    );
    const submitElement = getByText("Register Now").closest("button");

    codeSendServiceMock.register.mockResolvedValueOnce({
      _id: "51264789521",
      createdAt: "2020-03-29T21:59:47.213Z",
      updatedAt: "2020-03-29T21:59:47.213Z",
      username: "mnindrazaka",
      password: "ryt738yhg3jge"
    });

    await act(async () => {
      fireEvent.change(inputUsernameElement, {
        target: { value: "mnindrazaka" }
      });
    });
    await act(async () => {
      fireEvent.change(inputPasswordElement, {
        target: { value: "mnindrazaka" }
      });
    });
    await act(async () => {
      fireEvent.change(inputPasswordConfirmationElement, {
        target: { value: "mnindrazaka" }
      });
    });
    await act(async () => {
      fireEvent.click(submitElement!);
    });

    const alertElement = await findByText("Success");
    expect(alertElement).toBeInTheDocument();
  });

  it("can show register failed message", async () => {
    const { findByText, getByLabelText, getByText } = renderRegisterForm();
    const inputUsernameElement = getByLabelText("Username");
    const inputPasswordElement = getByLabelText("Password");
    const inputPasswordConfirmationElement = getByLabelText(
      "Password Confirmation"
    );
    const submitElement = getByText("Register Now").closest("button");

    codeSendServiceMock.register.mockRejectedValueOnce({
      status: "error",
      message: "username already exist"
    });

    await act(async () => {
      fireEvent.change(inputUsernameElement, {
        target: { value: "mnindrazaka" }
      });
    });
    await act(async () => {
      fireEvent.change(inputPasswordElement, {
        target: { value: "mnindrazaka" }
      });
    });
    await act(async () => {
      fireEvent.change(inputPasswordConfirmationElement, {
        target: { value: "mnindrazaka" }
      });
    });
    await act(async () => {
      fireEvent.click(submitElement!);
    });

    const alertElement = await findByText("Failed");
    expect(alertElement).toBeInTheDocument();
  });
});
