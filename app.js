/**
 * PredictSF Ranking MVP
 * Static ranking page with automatic data loading and sorting.
 */

const MEDALS = ['🥇', '🥈', '🥉'];
const RANKING_CONTAINER_ID = 'rankingContainer';

/**
 * Loads ranking data from ranking.json.
 * @returns {Promise<{players: Array, error: Error|null}>}
 */
async function loadRanking() {
  try {
    const response = await fetch('./ranking.json');

    if (!response.ok) {
      throw new Error(`Falha ao carregar ranking.json (${response.status})`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('ranking.json deve conter uma lista de participantes');
    }

    return { players: data, error: null };
  } catch (error) {
    console.error('Erro ao carregar ranking:', error);
    return { players: [], error };
  }
}

/**
 * Sorts players by points in descending order.
 * @param {Array} players - Array of player objects.
 * @returns {Array} Sorted array of players.
 */
function sortPlayers(players) {
  return [...players].sort((a, b) => Number(b.points) - Number(a.points));
}

/**
 * Creates a player card HTML element.
 * @param {Object} player - Player object with id, name, avatar, points.
 * @param {number} position - Player's generated ranking position (1-indexed).
 * @returns {HTMLElement} List item element.
 */
function createPlayerCard(player, position) {
  const item = document.createElement('li');
  item.className = 'player-card';
  item.setAttribute('aria-label', `${position}º lugar: ${player.name}, ${player.points} pontos`);

  const positionElement = document.createElement('span');
  const medal = MEDALS[position - 1];
  positionElement.className = medal ? 'medal' : 'position';
  positionElement.textContent = medal || position;
  positionElement.setAttribute('aria-label', medal ? `${position}º lugar` : `${position}`);

  const avatar = document.createElement('span');
  avatar.className = 'avatar';
  avatar.textContent = player.avatar;
  avatar.setAttribute('aria-hidden', 'true');

  const info = document.createElement('div');
  info.className = 'player-info';

  const name = document.createElement('strong');
  name.className = 'player-name';
  name.textContent = player.name;

  const pointsSummary = document.createElement('div');
  pointsSummary.className = 'player-points';
  pointsSummary.textContent = `${player.points} pts`;

  info.append(name, pointsSummary);

  const pointsDisplay = document.createElement('div');
  pointsDisplay.className = 'points-display';
  pointsDisplay.setAttribute('aria-hidden', 'true');

  const pointsValue = document.createElement('span');
  pointsValue.className = 'points-value';
  pointsValue.textContent = player.points;

  const pointsUnit = document.createElement('span');
  pointsUnit.className = 'points-label';
  pointsUnit.textContent = 'pts';

  pointsDisplay.append(pointsValue, pointsUnit);
  item.append(positionElement, avatar, info, pointsDisplay);

  return item;
}

/**
 * Renders a ranking status message inside the ordered list.
 * @param {string} message - Message to display.
 */
function renderStatus(message) {
  const container = document.getElementById(RANKING_CONTAINER_ID);
  container.replaceChildren();

  const item = document.createElement('li');
  item.className = 'ranking-status';
  item.textContent = message;
  container.appendChild(item);
}

/**
 * Renders the complete ranking list.
 * @param {Array} players - Array of sorted player objects.
 */
function renderRanking(players) {
  const container = document.getElementById(RANKING_CONTAINER_ID);
  container.replaceChildren();

  if (players.length === 0) {
    renderStatus('Nenhum dado disponível no momento.');
    return;
  }

  players.forEach((player, index) => {
    container.appendChild(createPlayerCard(player, index + 1));
  });
}

/**
 * Initializes the ranking page.
 * Loads data, sorts by points, and renders the list.
 */
async function init() {
  const { players, error } = await loadRanking();

  if (error) {
    renderStatus('Não foi possível carregar o ranking. Tente novamente em instantes.');
    return;
  }

  renderRanking(sortPlayers(players));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
