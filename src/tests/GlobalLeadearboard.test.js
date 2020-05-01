import React from 'react';
import Leaderboard from '../components/globalleaderboard.js';
// https://testing-library.com/docs/dom-testing-library/api-async#waitforelement
// https://testing-library.com/docs/react-testing-library/cheatsheet
import { render, fireEvent, act } from '@testing-library/react';
import fs from 'fs'; // File system import
import firebase from 'firebase';
import * as firebaseTesting from '@firebase/testing'

const projectId = "secondsongchallenge";
const rules = fs.readFileSync("firestore.rules", "utf8");

beforeEach(async () => {
  // Clear the database between tests
  await firebaseTesting.clearFirestoreData({ projectId });
  await firebaseTesting.loadFirestoreRules({ projectId, rules });
});

describe("Global Leaderboard", () => {

	const firebaseApp = firebase.initializeApp({
	  projectId: projectId
	});

	const db = firebaseApp.firestore();
  db.settings({
    host: "localhost:8080",
    ssl: false
  });

  test('prints leaderboard', async () => {
    try {
    // add mock data and wait till it's finished adding
    await db.collection("challenge_test").doc("123").set({
      highest_score: "12",
      highest_scorer: "highest_scorer",
      challenge_name: "challenge_name"
    });


    const { findByText } = render(<Leaderboard />);

    // The default values we inserted should be rendered
    await findByText("challenge_name - 12 - highest_scorer");

    } catch (e) {
      expect(e).toMatch('error');
    }
  });
});