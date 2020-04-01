import SpotifyWebApi from 'spotify-web-api-js';
import { getLocalToken } from './token';
export default function createChallengeUtil(playlist_id) {
  var token = getLocalToken();
  var spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token);

  spotifyApi.getPlaylistTracks(playlist_id).then(function(value) {
    var playlist_ref = value['items'];
    var all_tracks = [];
    for (var i = 0; i < playlist_ref.length; i++) {
      var track_name_and_id =
        playlist_ref[i].track.name + ' : ' + playlist_ref[i].track.id;
      all_tracks.push(track_name_and_id);
    }
    console.log(all_tracks);
    return all_tracks;
  });
}