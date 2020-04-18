import React from "react";
import { create } from "react-test-renderer";
import Song_timer from "../components/song_timer.js"


describe("Song timer component", () => {
  test("Matches the snapshot", () => {
    const button = create(<Song_timer />);
    expect(button.toJSON()).toMatchSnapshot();
  });
});

