async function updateDynamicPlaylistMedia(playlist_id, jwplayerApiKey) {
    const endpoint = `https://api.jwplayer.com/v2/sites/GRJTlii1/playlists/${playlist_id}/`;
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwplayerApiKey}`,
    };

    // Get current playlist data
    const currentData = await fetch(endpoint, { headers }).then((response) =>
        response.json()
    );

    // Remove media:group element for each item in the playlist
    const updatedData = currentData.map((item) => {
        const newItem = { ...item };
        delete newItem["media:group"];
        console.log("the data is: ", newItem);
        return newItem;
    });

    // Update the playlist's media with the modified data
    const options = {
        method: "PUT",
        headers,
        body: JSON.stringify(updatedData),
    };

    const response = await fetch(endpoint, options);
    if (!response.ok) {
        throw new Error(
        `Failed to update dynamic playlist media: ${response.statusText}`
        );
    }

    return response.json();
}

// Export the function so it can be used in other files
module.exports = { updateDynamicPlaylistMedia };
