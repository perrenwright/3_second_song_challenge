import firebase from 'firebase';

// eslint-disable-next-line
const firebaseConfig = {
  apiKey: 'AIzaSyD2Cgk-IWFs4T3NdG93L5lp1bsStfb9xWA',
  authDomain: 'secondsongchallenge.firebaseapp.com',
  databaseURL: 'https://secondsongchallenge.firebaseio.com',
  projectId: 'secondsongchallenge',
  storageBucket: 'secondsongchallenge.appspot.com',
  messagingSenderId: '578310806195',
  appId: '1:578310806195:web:cd29ef97e3654327286ec6',
};
// eslint-disable-next-line
firebase.initializeApp(firebaseConfig);

// if (window.location.hostname === "localhost") {
// // To ensure the emulator is running at localhost:8080 run with:
// // firebase emulators:exec --only firestore 'npm start'
// const db = firebase.firestore();
// db.settings({
// host: "localhost:8080",
// ssl: false
// });

// }

const firestoreRef = firebase.firestore();
export default firestoreRef;
