export function getJWPlayerPlaylistData(playlist_id, jwplayer_api_key) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${jwplayer_api_key}`
    }
  };
  const endpoint = `https://api.jwplayer.com/v2/sites/GRJTlii1/playlists/${playlist_id}/`;
  
  return fetch(endpoint, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}
