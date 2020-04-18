import React from "react";
import { create } from "react-test-renderer";
import Challenge_length from "../components/challenge_length.js"


describe("Challenge length component", () => {
  test("Matches the snapshot", () => {
    const chalength_button = create(<Challenge_length />);
    expect(chalength_button.toJSON()).toMatchSnapshot();
  });
});

