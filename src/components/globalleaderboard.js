import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import LeaderboardChip from './leaderboard_chip';
import './globalleaderboard.css';

export default function Leaderboard() {
  let firestoreRef = firebase.firestore();

  console.log('Leaderboard function called');
  const [scores_info, setScoresInfo] = useState([]);

  useEffect(() => {
    async function getHighestScores() {
      let temp_scores_info = [];
      await firestoreRef
        .collection('challenge_test')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            if (doc.data().highest_score > 0) {
              var temp_score = doc.data().highest_score;
              var temp_scorer = doc.data().highest_scorer;
              var challenge_name = doc.data().challenge_name;

              console.log('Temp Score is:', temp_score);
              console.log('challenge_name is: ', challenge_name);
              console.log('User is: ', temp_scorer);
              temp_scores_info.push([challenge_name, temp_score, temp_scorer]);
            }
          });
        });
      temp_scores_info.sort(function (a, b) {
        return b[1] - a[1];
      });
      temp_scores_info.slice(0, 5);
      console.log(temp_scores_info);
      setScoresInfo(temp_scores_info);
      console.log('getHighestScores call finished.');
    }
    getHighestScores();
    // eslint-disable-next-line
  }, []);
  if(scores_info !== undefined){
    return (
      <div className="gbl">
        <header className="gbl-header">
          <h1>Global Leaderboard</h1>
          <hr />
        </header>
        <div className="gbl-top3">
          <LeaderboardChip border='gold' label={scores_info[0] === undefined ? " " : scores_info[0].join(' - ')}/>
          <LeaderboardChip border='silver' label={scores_info[1] === undefined ? " " : scores_info[1].join(' - ')}/>
          <LeaderboardChip border='bronze' label={scores_info[2] === undefined ? " " : scores_info[2].join(' - ')}/>
        </div>
        <div className="gbl-bottom2">
          <LeaderboardChip border='green' label={scores_info[3] === undefined ? " " : scores_info[3].join(' - ')}/>
          <LeaderboardChip label={scores_info[4] === undefined ? " " : scores_info[4].join(' - ')}/>
        </div>
      </div>
    );
  }
}
