/**
 * PredictSF Ranking MVP
 * Carrega um ranking estático, ordena por pontos e renderiza as posições.
 */

const RANKING_FILE = './ranking.json';
const MEDALS = {
  1: { symbol: '🥇', label: '1º lugar', tone: 'gold' },
  2: { symbol: '🥈', label: '2º lugar', tone: 'silver' },
  3: { symbol: '🥉', label: '3º lugar', tone: 'bronze' }
};

const rankingContainer = document.getElementById('ranking-container');
const rankingStatus = document.getElementById('ranking-status');

/**
 * Busca os dados do arquivo ranking.json.
 * @returns {Promise<Array<{id:number,name:string,avatar:string,points:number}>>}
 */
async function loadRanking() {
  const response = await fetch(RANKING_FILE, { cache: 'no-cache' });

  if (!response.ok) {
    throw new Error(`Não foi possível carregar ${RANKING_FILE}. Status: ${response.status}`);
  }

  const players = await response.json();

  if (!Array.isArray(players)) {
    throw new Error('O arquivo ranking.json precisa conter um array de jogadores.');
  }

  return players;
}

/**
 * Ordena uma cópia da lista por pontuação em ordem decrescente.
 * @param {Array<{points:number}>} players
 * @returns {Array}
 */
function sortPlayers(players) {
  return [...players].sort((currentPlayer, nextPlayer) => {
    const currentPoints = Number(currentPlayer.points) || 0;
    const nextPoints = Number(nextPlayer.points) || 0;
    return nextPoints - currentPoints;
  });
}

/**
 * Cria o marcador da posição, usando medalhas apenas no Top 3.
 * @param {number} position
 * @returns {HTMLElement}
 */
function createRankMarker(position) {
  const marker = document.createElement('span');
  marker.className = 'rank-marker';

  if (MEDALS[position]) {
    marker.textContent = MEDALS[position].symbol;
    marker.dataset.medal = MEDALS[position].tone;
    marker.setAttribute('aria-label', MEDALS[position].label);
    return marker;
  }

  marker.textContent = String(position);
  marker.setAttribute('aria-label', `${position}º lugar`);
  return marker;
}

/**
 * Cria um card acessível para um jogador.
 * @param {{name:string,avatar:string,points:number}} player
 * @param {number} position
 * @returns {HTMLLIElement}
 */
function createPlayerCard(player, position) {
  const safeName = player.name || 'Jogador sem nome';
  const safePoints = Number(player.points) || 0;
  const safeAvatar = (player.avatar || safeName.charAt(0) || '?').toString().charAt(0).toUpperCase();

  const card = document.createElement('li');
  card.className = 'player-card';
  card.setAttribute('aria-label', `${position}º lugar: ${safeName}, ${safePoints} pontos`);

  const avatar = document.createElement('span');
  avatar.className = 'avatar';
  avatar.textContent = safeAvatar;
  avatar.setAttribute('aria-hidden', 'true');

  const playerInfo = document.createElement('div');
  playerInfo.className = 'min-w-0';

  const playerName = document.createElement('h2');
  playerName.className = 'player-name';
  playerName.textContent = safeName;

  const playerMeta = document.createElement('p');
  playerMeta.className = 'player-meta mt-1 text-sm';
  playerMeta.textContent = `${safePoints} pts`;

  const points = document.createElement('div');
  points.className = 'points';

  const pointsValue = document.createElement('strong');
  pointsValue.className = 'points-value';
  pointsValue.textContent = String(safePoints);

  const pointsLabel = document.createElement('p');
  pointsLabel.className = 'points-label';
  pointsLabel.textContent = 'pts';

  playerInfo.append(playerName, playerMeta);
  points.append(pointsValue, pointsLabel);
  card.append(createRankMarker(position), avatar, playerInfo, points);

  return card;
}

/**
 * Renderiza todos os jogadores já ordenados.
 * @param {Array} players
 */
function renderRanking(players) {
  rankingContainer.replaceChildren();

  players.forEach((player, index) => {
    rankingContainer.appendChild(createPlayerCard(player, index + 1));
  });

  rankingStatus.hidden = true;
  rankingContainer.hidden = false;
}

/** Exibe mensagens simples de carregamento, vazio ou erro. */
function showStatus(message) {
  rankingContainer.hidden = true;
  rankingStatus.hidden = false;
  rankingStatus.textContent = message;
}

/** Inicializa a página. */
async function init() {
  try {
    showStatus('Carregando ranking...');
    const players = await loadRanking();

    if (players.length === 0) {
      showStatus('Nenhum jogador encontrado no ranking.json.');
      return;
    }

    renderRanking(sortPlayers(players));
  } catch (error) {
    console.error(error);
    showStatus('Não foi possível carregar o ranking. Confira se o arquivo ranking.json está disponível no servidor estático.');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
