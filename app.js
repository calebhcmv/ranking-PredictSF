/**
 * PredictSF Ranking MVP
 * Static ranking page with automatic data loading and sorting
 */

// Medals for top 3 positions
const MEDALS = {
  1: '🥇',
  2: '🥈',
  3: '🥉'
};

/**
 * Loads ranking data from ranking.json
 * @returns {Promise<Array>} Array of player objects
 */
async function loadRanking() {
  try {
    const response = await fetch('./ranking.json');
    if (!response.ok) {
      throw new Error(`Failed to load ranking: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading ranking:', error);
    return [];
  }
}

/**
 * Sorts players by points in descending order
 * @param {Array} players - Array of player objects
 * @returns {Array} Sorted array of players
 */
function sortPlayers(players) {
  return [...players].sort((a, b) => b.points - a.points);
}

/**
 * Creates a player card HTML element
 * @param {Object} player - Player object with id, name, avatar, points
 * @param {number} position - Player's position in ranking (1-indexed)
 * @returns {HTMLElement} Card element
 */
function createPlayerCard(player, position) {
  const card = document.createElement('div');
  card.className = 'player-card';

  // Position or Medal
  const positionElement = document.createElement('div');
  if (MEDALS[position]) {
    positionElement.className = 'medal';
    positionElement.textContent = MEDALS[position];
  } else {
    positionElement.className = 'position';
    positionElement.textContent = position;
  }

  // Avatar
  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.textContent = player.avatar;

  // Player Info
  const info = document.createElement('div');
  info.className = 'player-info';

  const name = document.createElement('div');
  name.className = 'player-name';
  name.textContent = player.name;

  const pointsLabel = document.createElement('div');
  pointsLabel.className = 'player-points';
  pointsLabel.textContent = `${player.points} pts`;

  info.appendChild(name);
  info.appendChild(pointsLabel);

  // Points Display
  const pointsDisplay = document.createElement('div');
  pointsDisplay.className = 'points-display';

  const pointsValue = document.createElement('div');
  pointsValue.className = 'points-value';
  pointsValue.textContent = player.points;

  const pointsUnit = document.createElement('div');
  pointsUnit.className = 'points-label';
  pointsUnit.textContent = 'pts';

  pointsDisplay.appendChild(pointsValue);
  pointsDisplay.appendChild(pointsUnit);

  // Assemble card
  card.appendChild(positionElement);
  card.appendChild(avatar);
  card.appendChild(info);
  card.appendChild(pointsDisplay);

  return card;
}

/**
 * Renders the complete ranking list
 * @param {Array} players - Array of sorted player objects
 */
function renderRanking(players) {
  const container = document.getElementById('rankingContainer');
  container.innerHTML = ''; // Clear container

  players.forEach((player, index) => {
    const position = index + 1;
    const card = createPlayerCard(player, position);
    container.appendChild(card);
  });
}

/**
 * Initializes the ranking page
 * Loads data, sorts by points, and renders the list
 */
async function init() {
  const players = await loadRanking();
  
  if (players.length === 0) {
    console.warn('No ranking data available');
    document.getElementById('rankingContainer').innerHTML = 
      '<p style="text-align: center; color: #A9B6C9;">Nenhum dado disponível</p>';
    return;
  }

  const sortedPlayers = sortPlayers(players);
  renderRanking(sortedPlayers);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}