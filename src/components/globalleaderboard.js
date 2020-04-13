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
        .collection('challenge_test')
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            var temp_scores_array = highest_scores;
            var temp_score_to_user = score_to_user;
            if (doc.data().highest_score > 0){
            var temp_score = doc.data().highest_score;
            var temp_scorer = doc.data().highest_scorer;
            var challenge_name = doc.data().challenge_name;

            console.log('Temp Score is:', temp_score);
            console.log('challenge_name is: ', challenge_name);
            console.log('User is: ', temp_scorer);
            temp_scores_array.push([temp_score, temp_scorer]);
            temp_score_to_user[challenge_name] = [temp_score, temp_scorer];
            temp_scores_array.sort(function(a, b) { return b[0] - a[0]; });
            setHighestScores(temp_scores_array);
            setScoreToUser(temp_score_to_user);
              }
          });
        });
      console.log('getHighestScores call finished.');
    }
    getHighestScores();
  }, []);

  return (
    <div className="about">
      <font color="black">
          <h2>Global Leaderboard</h2>
          <hr />
        {Object.keys(highest_scores).map((key) => (
            <div>
              <div>
              {highest_scores[key][1]}: {highest_scores[key][0]} ({Object.keys(score_to_user)[key]})
              </div>

            </div>
          ))}
</font>
    </div>
  );
}
