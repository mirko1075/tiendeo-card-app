import React from "react"
import ReactDom from "react-dom"
import App from "./App"
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

it("Renders without crashing", () => {
  const div = document.createElement("div");
  ReactDom.render(<App />, div)
})

it("Renders buttons correctly", () => {
  const { container } = render(<App />);
  expect(container.firstChild).toHaveClass('App')
})
