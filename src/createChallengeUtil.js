import SpotifyWebApi from 'spotify-web-api-js';

export default function createChallengeUtil(playlist_id) {
  // Check if there are at least 20 songs
  var token =
    'BQCOn_cMc23WvihAzqDBlF-dO6UUSxeTelEc92mezp_WdKGHW2GD-XgexIkajTeTzc7lOJE9XwzQT-gIJZBnsxkbS0v_Loq-6Dl6q11Ij9NynWLaEJR9oD1uGZ1fA7deYS4w-t_fCcqiPWgAwL35OpCMpqga3JI';

  console.log('Token in challenges page: ', token);
  var spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token);

  spotifyApi.getPlaylistTracks(playlist_id).then(function(value) {
    console.log(value['items'][0].track.name);
  });
  alert('Check console');

  // Populate Firebase with challenge data
}
