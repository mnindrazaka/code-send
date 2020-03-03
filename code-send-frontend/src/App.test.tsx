import React from "react";
import { render } from "@testing-library/react";
import "matchMedia.mock";
import App from "./App";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});

test("render correctly", () => {
  const { container } = render(<App />);
  expect(container).toBeInTheDocument();
});
