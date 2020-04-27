export default function() {
    let token = window.location.hash.substr(1);
    if (token) {
        const o = Object.fromEntries(new URLSearchParams(token));
        return o.access_token;
    } else {
        // If there is no token, redirect to Spotify authorization
        redirectToSpotifyAuthentication();
    }
}

function redirectToSpotifyAuthentication() {
    const authEndpoint = 'https://accounts.spotify.com/authorize';
    const clientId = '9a9b0b83d79a4ece84e608715bc5e114';
    const redirectUri = `${window.location.protocol}//${window.location.host}/homepage`;
    const scope = 'playlist-read-private playlist-read-collaborative'
    let query = `client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&response_type=token&show_dialog=false`;
    window.location = `${authEndpoint}?${query}`;
}