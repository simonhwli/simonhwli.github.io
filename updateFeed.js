export default function generateJWPlayerRSS(playlist_id, jwplayer_api_key) {
  const endpoint = `https://cdn.jwplayer.com/v2/playlists/${playlist_id}`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwplayer_api_key}`,
  };

  return fetch(endpoint, { headers })
    .then((response) => response.json())
    .then((data) => {
      const rss = {
        "@": {
          version: "2.0",
        },
        channel: {
          title: data.playlist.title,
          link: data.playlist.link,
          description: data.playlist.description,
          lastBuildDate: new Date().toUTCString(),
          ttl: "60",
          item: [],
        },
      };

      data.playlist.forEach((item) => {
        const newItem = {
          title: item.title,
          link: item.link,
          pubDate: item.published_at,
          description: item.description,
          "media:content": {
            "@": {
              url: item.sources[0].file,
            },
          },
          guid: {
            "@": {
              isPermaLink: "false",
            },
            "#": item.id,
          },
        };

        rss.channel.item.push(newItem);
      });

      const parser = new DOMParser();
      const xml = parser
        .parseFromString(rss2.toXml(rss), "application/xml")
        .getElementsByTagName("rss")[0]
        .outerHTML;

      return xml;
    })
    .catch((error) => console.error(error));
}
