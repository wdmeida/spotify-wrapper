import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import {
  search,
  searchAlbums,
  searchArtists,
  searchTracks,
  searchPlaylists,
} from '../src/main';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

let fetchedStup;

describe('Spotify Wrapper', () => {
  describe('Smoke tests', () => {
    it('should exist the search method', () => {
      expect(search).to.exist;
    });

    it('should exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
    });

    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });

    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe('Generic Seach', () => {
    beforeEach(() => {
      fetchedStup = sinon.stub(global, 'fetch');
    });

    afterEach(() => {
      fetchedStup.restore();
    });

    it('should call fetch function', () => {
      const artists = search();

      expect(fetchedStup).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        const artist = search('Incubus', 'artist');

        expect(fetchedStup).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

        const albums = search('Incubus', 'albums');
        expect(fetchedStup).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=albums');
      });

      context('passing more than one type', () => {
        const artistsAndAlbums = search('Incubus', ['artist', 'albums']);

        expect(fetchedStup).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,albums');
      });
    });
  });
});
