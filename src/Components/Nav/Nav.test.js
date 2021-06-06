import React from "react"
import ReactDom from "react-dom"
import Nav from "./Nav"
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

it("Renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(<Nav />, div)
})

it("Renders buttons correctly", () => {
    const { container } = render(<Nav />);
    expect(container.firstChild).toHaveClass('nav')
})
