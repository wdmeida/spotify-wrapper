/* to run: babel-node album.js */

import SpotifyWrapper from '../src/';

global.fetch = require('node-fetch');

const spotify = new SpotifyWrapper({
  token: 'BQDa7K2phFilmP6Jr8_SNFUBM-hmVnj_xNmiamGCkx3_Gzm-8C4sCacydhg5IW7ONGzSOpS462UMJy_-7OXD8XCAM4uu0JitR6FoHDRNgHsvSXJgXc73G3gZZtrDmns4UzM183GP8i5LcQ',
});

const albums = spotify.search.albums('Incubus');

albums.then(data => data.albums.items.map(item => console.log(item.name)));
