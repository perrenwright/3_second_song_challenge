import SpotifyWebApi from 'spotify-web-api-js';


export default function getPlaylistInfo(token) {

  const spotifyApi = new SpotifyWebApi();
  // This function is not cpomplete as of now. But it proves that we now have access to the user's 
  // spotify playlists, tracks, images, songs and information. Right noow I am grabbing the user's top 20 playlists.
  // I also grab the id of these playlists and their images and tracks. I believe we can store this information we 
  // need in firebase and move forward with the project as we see fit.
  
  var playlist_ids = [];
  var plylist_images = [];
  var playlist_images_url = [];
  if (token) {
    spotifyApi.setAccessToken(token);
  }
  spotifyApi.getUserPlaylists()
  .then(function(data) {
    console.log('User playlists', data["items"]);
    for (var i in data["items"]) {
      console.log(data["items"][i])
      var playlist_info = data["items"][i]
      // console.log(playlist_info["id"])
      var playlistId = playlist_info["id"]
      
      plylist_images.push(playlist_info["images"])
      playlist_ids.push(playlistId)
      
    }
    console.log(plylist_images)
    for (var img in plylist_images){
      console.log(plylist_images[img])
      console.log(plylist_images[img][0]["url"])
      playlist_images_url.push(plylist_images[img][0]["url"])
      
  }
    console.log(playlist_ids.length)
    for (var id in playlist_ids){
    var plst = spotifyApi.getPlaylistTracks(playlist_ids[id]);
    console.log(plst)
  }
  });
  
}