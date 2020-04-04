import firestoreRef from './firebase';

function getChallenge(challenge_id) {
  return new Promise(function(resolve, reject) {
    firestoreRef
      .collection('challenge_test')
      .doc(challenge_id)
      .get()
      .then(function(doc) {
        resolve(doc.data());
      })
      .catch(function(error) {
        console.log('Error in reading challenge data from Firestore.');
        reject(error);
      });
  });
}

function getTrackJSON(unique_track_id) {
  return new Promise(function(resolve, reject) {
    let track_json = {};
    firestoreRef
      .collection('UniqueTracks')
      .doc(unique_track_id)
      .get()
      .then(function(doc) {
        let track_data = doc.data();
        track_json['track_id'] = track_data.track_id;
        track_json['start_time'] = track_data.start_time;
        track_json['choice_A'] = track_data.choice_A;
        track_json['choice_B'] = track_data.choice_B;
        track_json['choice_C'] = track_data.choice_C;
        track_json['choice_D'] = track_data.choice_D;
        resolve(track_json);
      })
      .catch(function(error) {
        console.log('Error in reading track data from Firestore.');
        reject(error);
      });
  });
}

async function getChallengeUtil(challenge_id) {
  var challenge_data = await getChallenge(challenge_id);
  console.log('Challenge data:', challenge_data);

  var challenge_questions = [];
  for (let i = 0; i < 20; i++) {
    let track_json = await getTrackJSON(challenge_data.unique_tracks_info[i]);
    console.log('Track Index: ', i);
    console.log('Track information: ', track_json);
    challenge_questions.push(track_json);
  }

  return new Promise(function(resolve, reject) {
    if (challenge_questions.length == 20) {
      resolve(challenge_questions);
    } else {
      console.log('Number of questions is: ', challenge_questions.length);
      reject('Total number of challenges is not 20.');
    }
  });
}

export { getChallengeUtil };
