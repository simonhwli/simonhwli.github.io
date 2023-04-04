const fetch = require('node-fetch');
const parser = require('fast-xml-parser');
const rss2 = require('rss2');

const siteId = 'GRJTlii1';
const playlistId = 'bIs9UNqY';
const apiKey = 'VZwxV83odDrN3U0SnOq6QmInU1c1Q00yRkxXRFZYVnpKR2QzRlpRa0Z4TW1GblJuZDUn';

const fetchPlaylist = async () => {
  const res = await fetch(
    `https://api.jwplayer.com/v2/sites/${siteId}/playlists/${playlistId}/videos?pageSize=100`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await res.json();
  return data.playlist;
};

const generateRssFeed = (playlist) => {
  const items = playlist.map((video) => {
    const item = {
      title: video.title,
      description: video.description,
      pubDate: video.published_at,
      guid: video.mediaid,
      url: video.link,
      enclosure: {
        url: video.sources[0].file,
        type: video.sources[0].type,
        length: video.sources[0].filesize,
      },
      custom_elements: [
        {
          'media:thumbnail': {
            _attr: {
              url: video.image,
            },
          },
        },
      ],
    };
    return item;
  });

  const feed = new rss2({
    title: 'My Playlist',
    description: 'A playlist generated by JW Player',
    pubDate: new Date(),
    items,
  });

  const xml = feed.xml({ indent: true });

  // Remove the media:group tag from each item in the RSS feed
  const jsonObj = parser.parse(xml);
  if (jsonObj.rss.channel.item) {
    jsonObj.rss.channel.item.forEach((item) => {
      if (item['media:group']) {
        delete item['media:group'];
      }
    });
  }
  const modifiedXml = parser.parse(jsonObj, { ignoreAttributes: false, attributeNamePrefix: '' });
  return modifiedXml;
};

(async () => {
  const playlist = await fetchPlaylist();
  const xml = generateRssFeed(playlist);
  console.log(xml);
})();
