const { updateDynamicPlaylistMedia } = require("./playlist.js");

export default function getJWPlayerPlaylistData(playlist_id, jwplayer_api_key) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${jwplayer_api_key}`,
    },
  };
  const endpoint = `https://api.jwplayer.com/v2/sites/GRJTlii1/playlists/${playlist_id}/`;

  updateDynamicPlaylistMedia("bIs9UNqY", "VZwxV83odDrN3U0SnOq6QmInU1c1Q00yRkxXRFZYVnpKR2QzRlpRa0Z4TW1GblJuZDUn")
    .then((response) => console.log("update response: ", response))
    .catch((error) => console.error(error));

  return fetch(endpoint, options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}
