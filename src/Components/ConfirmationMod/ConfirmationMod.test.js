import React from "react"
import ReactDom from "react-dom"
import ConfirmationMod from "./ConfirmationMod"
import { render } from "@testing-library/react";
import "@testing-library/jest-dom"
it("Renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(<ConfirmationMod />, div)
})
it("Renders buttons correctly", () => {
    const { getByTestId } = render(<ConfirmationMod />);
    expect(getByTestId('confirm')).toHaveTextContent("CONFIRM");
    expect(getByTestId('cancel')).toHaveTextContent("CANCEL");
})