import React from "react";
import { create } from "react-test-renderer";
import EndPage from "../components/endChallenge.js"


describe("endChallenge component", () => {
  test("Matches the snapshot", () => {
    const endChallenge = create(<EndPage />);
    expect(endChallenge.toJSON()).toMatchSnapshot();
  });
});
