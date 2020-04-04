import SpotifyWebApi from 'spotify-web-api-js';
import { getLocalToken } from './token';

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

    for (let track_index = 0; track_index < 20; track_index++) {
      let B_C_D = getRandomChoices(all_choices_A[track_index], all_choices_A);
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
  });
}
