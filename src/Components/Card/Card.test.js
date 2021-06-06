import React from "react"
import ReactDom from "react-dom"
import Card from "./Card"
import { render } from "@testing-library/react";
import "@testing-library/jest-dom"
it("Renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(<Card key="1" name="card" card={{ title: "Title", description: "Description" }} />, div)
})
it("Renders buttons correctly", () => {
    const { getByTestId } = render(<Card key="1" name="card" card={{ title: "Title", description: "Description" }} />);
    expect(getByTestId('editButton')).toHaveTextContent("Edit");
    expect(getByTestId('deleteButton')).toHaveTextContent("Delete");
})