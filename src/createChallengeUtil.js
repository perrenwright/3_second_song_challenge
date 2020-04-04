import SpotifyWebApi from 'spotify-web-api-js';
import { getLocalToken } from './token';
import firestoreRef from './firebase';

// Given the right choice and all choices for 20 songs in the playlist or challenge
// this function should return 3 other random choices
function getRandomChoices(right_choice, all_songs) {
  let three_choices = [];
  let while_loop_counts = 0;
  let new_random_choice = all_songs[Math.floor(Math.random() * 20)];
  while (new_random_choice != right_choice) {
    if (while_loop_counts >= 10) {
      // console.log('While loop count exceeded.');
      return [];
    } else if (
      !three_choices.includes(new_random_choice) &&
      three_choices.length < 3
    ) {
      three_choices.push(new_random_choice);
      // console.log('Random choice pushed for return.');
    }

    if (three_choices.length >= 3) {
      // console.log('Three choices returned by function.');
      return three_choices;
    }
    new_random_choice = all_songs[Math.floor(Math.random() * 20)];
    while_loop_counts++;
  }
}

// Adds unique track info in Firestore database
// UniqueTrack is different from a normal track because it has unique sets of choices and unique start time
// More than one UniqueTrack can share the same track_id but other fields of UniqueTracks might differ
// TODO: start time will be randomized later
function populateTracksInfo(
  all_unique_track_ids,
  tracks_info,
  choices_A,
  choices_B,
  choices_C,
  choices_D
) {
  for (let i = 0; i < 20; i++) {
    firestoreRef
      .collection('UniqueTracks')
      .doc(all_unique_track_ids[i])
      .set({
        track_id: tracks_info[i],
        start_time: 0,
        choice_A: choices_A[i],
        choice_B: choices_B[i],
        choice_C: choices_C[i],
        choice_D: choices_D[i]
      })
      .then(function() {
        console.log('Finished populating all unique track info in Firestore');
      });
  }
}

export default function createChallengeUtil(playlist_id) {
  var token = getLocalToken();
  var spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token);

  spotifyApi.getPlaylistTracks(playlist_id).then(function(data) {
    var playlist_ref = data['items'];
    console.log('Playlist ref in createChallengeUtil', playlist_ref);
    if (playlist_ref.length < 20) {
      alert('Less than 20 songs.');
      return;
    }
    var all_tracks_ids = [];
    var all_start_times = [];
    var all_choices_A = [];
    for (let i = 0; i < 20; i++) {
      let track_id = playlist_ref[i].track.id;
      let start_time = 0;
      let choice_A = playlist_ref[i].track.name;
      all_tracks_ids.push(track_id);
      all_start_times.push(start_time);
      all_choices_A.push(choice_A);
    }
    console.log(all_tracks_ids);
    console.log(all_start_times);
    console.log(all_choices_A);

    var all_choices_B = [];
    var all_choices_C = [];
    var all_choices_D = [];
    var all_unique_track_ids = [];

    for (let track_index = 0; track_index < 20; track_index++) {
      let B_C_D = getRandomChoices(all_choices_A[track_index], all_choices_A);
      all_unique_track_ids.push(playlist_id + all_tracks_ids[track_index]);
      while (B_C_D == undefined) {
        B_C_D = getRandomChoices(all_choices_A[track_index], all_choices_A);
      }
      // console.log('Track index: ', track_index);
      // console.log('Other choices for songs: ', B_C_D);
      if (B_C_D.length == 3) {
        all_choices_B.push(B_C_D[0]);
        all_choices_C.push(B_C_D[1]);
        all_choices_D.push(B_C_D[2]);
      }
    }
    console.log(all_choices_B);
    console.log(all_choices_C);
    console.log(all_choices_D);

    populateTracksInfo(
      all_unique_track_ids,
      all_tracks_ids,
      all_choices_A,
      all_choices_B,
      all_choices_C,
      all_choices_D
    );
    console.log('All unique_track_ids', all_unique_track_ids);
    // Replace challenge_name with actual playlist_name later
    firestoreRef
      .collection('challenge_test')
      .doc(playlist_id)
      .set({
        challenge_name: playlist_id,
        unique_tracks_info: all_unique_track_ids
      });
  });
}
