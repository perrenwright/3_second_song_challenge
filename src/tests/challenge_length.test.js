import React from "react";
import { create } from "react-test-renderer";
import Challenge_length from "../components/challenge_length.js"
import {unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'



let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("Challenge length component", () => {
  test("Matches the snapshot", () => {
    const chalength_button = create(<Challenge_length />);
    expect(chalength_button.toJSON()).toMatchSnapshot();
  });
});

// it("renders with or without a name", () => {
//   act(() => {
//     render(<Challenge_length />, container);
//   });
//   expect(container.textContent).toBe("Hey, stranger");

describe("Challenge length component", () => {
  const setchal_length = jest.fn().mockImplementation
  const { container, getByText } = render(<Challenge_length setChallenge_length={setchal_length}/>)
  expect(getByText('5 Songs')).toBeInTheDocument()
})