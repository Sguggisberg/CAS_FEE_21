import songsService from './songs-service.js';

// DOM Refs
const songsLiElement = document.querySelector('#songs');
const loadingIndicator = document.querySelector('#loading');

// View Rendering
function createSongsHtml(songs) {
  return songs.map((song) => `<li>
      <h3>${song.rating}
          <button data-delta="1" data-song-id="${song.id}">+</button>
          <button data-delta="-1" data-song-id="${song.id}">-</button>
          ${song.title}
      </h3>
      <p>${song.artist}</p>
  </li>`).join('');
}

function showLoading(shouldShow) {
  if (shouldShow) {
    loadingIndicator.classList.add('showing');
  } else {
    loadingIndicator.classList.remove('showing');
  }
}

function renderSongs() {
  // todo show loading indicator
  // call songsService.getSortedSongs, provide callback that renders retured songs,
  // in callback hide loading indicator
}

// controller
function rate(id, delta) {
  // todo show loading indicator
  // call songsService.rateSong, provide callback that renders retured songs,
  // in callback hide loading indicator
}

function bubbledClickEventHandler(event) {
  // takes advantage of event bubbling
  // should disable clicked button
  const buttonSongId = event.target.dataset.songId;
  if (buttonSongId) {
    const buttonDelta = Number(event.target.dataset.delta);
    rate(buttonSongId, buttonDelta);
  }
}

songsLiElement.addEventListener('click', bubbledClickEventHandler);

renderSongs();
