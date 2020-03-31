import SpotifyWebApi from 'spotify-web-api-js';

export default function createChallengeUtil(playlist_id) {
  // Check if there are at least 20 songs
  var token =
    'BQC1uDvPB0id2CbTJ8BMXhgMqO0gYZ9LBVaniUZ9wjVRlLJhdQmIvQUZ6QoNRpuUJ2pjIdJ3IoEGg8hhntXepxDf1xUjnNavwY7YgldkpUhHxn_oPavaKfqRWnYh_O-Vnqc2XA1loiHw-HNZX66t5PYHL0VOFT0';

  console.log('Token in challenges page: ', token);
  var spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token);

  spotifyApi.getPlaylistTracks(playlist_id).then(function(value) {
    var playlist_ref = value['items'];
    console.log(playlist_ref);
    console.log('Playlist id/ Challenge id: ', playlist_id);
    console.log('Playlist length: ', playlist_ref.length);
    var all_tracks = [];
    for (var i = 0; i < playlist_ref.length; i++) {
      var track_name_and_id =
        playlist_ref[i].track.name + ' : ' + playlist_ref[i].track.id;
      all_tracks.push(track_name_and_id);
    }
    console.log(all_tracks);
  });
  alert('Check console');

  // Populate Firebase with challenge data
}
