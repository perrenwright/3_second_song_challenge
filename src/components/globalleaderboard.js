import React, { useState, useEffect } from 'react';
import firestoreRef from '../firebase';
import './globalleaderboard.css';

export default function Leaderboard() {
  console.log('Leaderboard function called');
  const [highest_scores, setHighestScores] = useState([]);
  const [score_to_user, setScoreToUser] = useState({});

  useEffect(() => {
    async function getHighestScores() {
      await firestoreRef
        .collection('Leaderboard')
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            var temp_scores_array = highest_scores;
            var temp_score_to_user = score_to_user;
            var temp_score = doc.data().challenge_score;
            console.log('Temp Score is:', temp_score);
            console.log('Doc id is: ', doc.id);
            temp_scores_array.push(temp_score);
            temp_score_to_user[temp_score] = doc.id;
            setHighestScores(temp_scores_array);
            setScoreToUser(temp_score_to_user);
          });
        });
      console.log('getHighestScores call finished.');
    }
    getHighestScores();
    var prep_highest_scores = highest_scores;
    prep_highest_scores.sort();
    prep_highest_scores.reverse();
    setHighestScores(prep_highest_scores);
  }, []);

  console.log(highest_scores[0]);
  console.log(highest_scores[1]);
  console.log(highest_scores[2]);
  console.log(highest_scores[3]);
  console.log(highest_scores[4]);

  return (
    <div className="gbl">
      <div className="gbl-header">
        {console.log('Return called')}
        {highest_scores[0] &&
          highest_scores[1] &&
          highest_scores[2] &&
          highest_scores[3] &&
          highest_scores[4] && (
            <p>
              ({score_to_user[highest_scores[0]]} : {highest_scores[0]}
              {score_to_user[highest_scores[1]]} : {highest_scores[1]}
              {score_to_user[highest_scores[2]]} : {highest_scores[2]}
              {score_to_user[highest_scores[3]]} : {highest_scores[3]}
              {score_to_user[highest_scores[4]]} : {highest_scores[4]})
            </p>
          )}
      </div>
    </div>
  );
}
