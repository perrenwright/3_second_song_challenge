import SpotifyWebApi from 'spotify-web-api-js';
import { getLocalToken } from './token';
export default function createChallengeUtil(playlist_id) {
  var token = getLocalToken();
  var spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token);

  spotifyApi.getPlaylistTracks(playlist_id).then(function(data) {
    // var playlist_ref = value['items'];
    // var all_tracks = [];
    // for (var i = 0; i < playlist_ref.length; i++) {
    //   var track_name_and_id =
    //     playlist_ref[i].track.name + ' : ' + playlist_ref[i].track.id;
    //   all_tracks.push(track_name_and_id);
    // }
    // console.log(all_tracks);
    // return all_tracks;
    var plylist_images = []
    const list = []
    for (var i in data["items"]) {
      var track_data = data['items'][i]['track']
      var track_id = track_data["id"]
      var track_name = track_data["name"]

      list.push({playlist_id:playlist_id,track_id: track_id, name:track_name })
    }
    console.log(list)
    return list
  });
}
