import React from "react"
import ReactDom from "react-dom"
import ConfirmationMod from "./ConfirmationMod"
import { render } from "@testing-library/react";
import "@testing-library/jest-dom"
it("Renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(<Form key="1" name="form" card={{ title: "Title", description: "Description" }} />, div)
})
it("Renders buttons correctly", () => {
    const { getByTestId } = render(<Form key="1" name="card" card={{ title: "Title", description: "Description" }} />);
    expect(getByTestId('submit')).toHaveValue("Submit");
    expect(getByTestId('imgLabel')).toHaveTextContent("Select an image");
})