import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { StoreProvider } from "stores";
import LoginForm from "../loginForm";
import codeSendService from "utils/api/codeSendService";
import initMatchMedia from "matchMedia.mock";

initMatchMedia();

jest.mock("utils/api/codeSendService");
const codeSendServiceMock = codeSendService as jest.Mocked<
  typeof codeSendService
>;
const renderLoginForm = () => {
  const utils = render(
    <MemoryRouter>
      <StoreProvider>
        <LoginForm />
      </StoreProvider>
    </MemoryRouter>
  );
  return utils;
};

describe("login form", () => {
  it("can show login success message", async () => {
    const { findByText, getByLabelText, getByText } = renderLoginForm();
    const inputUsernameElement = getByLabelText("Username");
    const inputPasswordElement = getByLabelText("Password");
    const submitElement = getByText("Submit").closest("button");

    codeSendServiceMock.login.mockResolvedValueOnce({ token: "1234" });

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
      fireEvent.click(submitElement!);
    });

    const alertElement = await findByText("Success");
    expect(alertElement).toBeInTheDocument();
  });

  it("can show login failed message", async () => {
    const { findByText, getByLabelText, getByText } = renderLoginForm();
    const inputUsernameElement = getByLabelText("Username");
    const inputPasswordElement = getByLabelText("Password");
    const submitElement = getByText("Submit").closest("button");

    codeSendServiceMock.login.mockRejectedValueOnce({
      status: "error",
      message: "username or password wrong"
    });

    await act(async () => {
      fireEvent.change(inputUsernameElement, {
        target: { value: "mnindrazaka" }
      });
    });
    await act(async () => {
      fireEvent.change(inputPasswordElement, {
        target: { value: "mnindrazaka2" }
      });
    });
    await act(async () => {
      fireEvent.click(submitElement!);
    });

    const alertElement = await findByText("Failed");
    expect(alertElement).toBeInTheDocument();
  });
});
