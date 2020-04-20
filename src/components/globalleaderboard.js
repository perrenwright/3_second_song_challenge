import React, { useState, useEffect } from 'react';
import firestoreRef from '../firebase';
import './globalleaderboard.css';

export default function Leaderboard() {
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

  return (
    <div className="about">
      <font color="black">
        <h2>Global Leaderboard</h2>
        <hr />
        {console.log('Scores value test in render', scores_info)}
        {scores_info.map((score_info) => {
          return (
            <p>
              {score_info[0]} : {score_info[1]} : {score_info[2]}{' '}
            </p>
          );
        })}
      </font>
    </div>
  );
}
