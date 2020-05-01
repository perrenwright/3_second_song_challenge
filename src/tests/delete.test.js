import React from 'react';
import Delete from '../components/delete';
import addChallenge from '../components/addChallenge';
import { render, fireEvent, act } from '@testing-library/react';
import fs from 'fs'; // File system import
import firebase from 'firebase';
import * as firebaseTesting from '@firebase/testing'


// const rules = fs.readFileSync("firestore.rules", "utf8");

test('Test Delete', async () => {

    // add mock data and wait till it's finished adding
    await db.collection("challenge_test").doc("223").set({
      challenge_name: "challenge_name"
    });

    // render(<addChallenge />);

    // The default values we inserted should be rendered
    firebase.assertSucceeds(app.firestore().collection("challenge-test").doc("223").get());
    render(<Delete />);
    firebase.assertFails(app.firestore().collection("challenge-test").doc("223").get());
  });