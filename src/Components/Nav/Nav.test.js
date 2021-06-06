import React from "react"
import ReactDom from "react-dom"
import Nav from "./Nav"
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

it("Renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(<Nav />, div)
})

it("Renders Nav correctly", () => {
    const { container } = render(<Nav />);
    expect(container.firstChild).toHaveClass('nav');
    const { getByTestId } = render(
        <button className="button navButtons" />
    );
    expect(getByTestId('button-1')).toBeTruthy();
    expect(getByTestId('button-2')).toBeTruthy();
    expect(getByTestId('button-3')).toBeTruthy();
    expect(getByTestId('button-4')).toBeTruthy();

})
