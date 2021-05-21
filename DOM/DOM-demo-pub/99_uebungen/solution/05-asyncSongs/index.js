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
  showLoading(true);
  songsService.getSortedSongs((songs) => {
    songsLiElement.innerHTML = createSongsHtml(songs);
    showLoading(false);
  });
}

// controller
function rate(id, delta) {
  showLoading(true);
  songsService.rateSong(id, delta, (sortedSongs) => {
    songsLiElement.innerHTML = createSongsHtml(sortedSongs);
    showLoading(false);
  });
}

function bubbledClickEventHandler(event) {
  // takes advantage of event bubbling
  const buttonSongId = event.target.dataset.songId;
  if (buttonSongId) {
    event.target.disabled = true; // disable here to avoid errors when no button is clicked
    const buttonDelta = Number(event.target.dataset.delta);
    rate(buttonSongId, buttonDelta);
  }
}

songsLiElement.addEventListener('click', bubbledClickEventHandler);

renderSongs();
