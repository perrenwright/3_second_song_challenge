import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyD2Cgk-IWFs4T3NdG93L5lp1bsStfb9xWA',
  authDomain: 'secondsongchallenge.firebaseapp.com',
  databaseURL: 'https://secondsongchallenge.firebaseio.com',
  projectId: 'secondsongchallenge',
  storageBucket: 'secondsongchallenge.appspot.com',
  messagingSenderId: '578310806195',
  appId: '1:578310806195:web:cd29ef97e3654327286ec6',
};

firebase.initializeApp(firebaseConfig);
const firestoreRef = firebase.firestore();
export default firestoreRef;
