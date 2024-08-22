// URLs for the APIs
const teamUrl = 'https://esports.pubgmobile.com/api/data/getLeagueDay?league_id=168&type=1&is_page_standing=1';
const playerUrl = 'https://esports.pubgmobile.com/api/data/getLeagueDay?league_id=168&type=2&is_page_standing=1';

// Path to the default player image
const defaultPlayerImage = 'PIC/PUBG_PLAYER_IMG.webp';

// Store player data for leaderboards
let playersData = [];

// Function to handle image loading errors
function handleImageError(event) {
    event.target.src = defaultPlayerImage;
}

// Function to fetch and display team data
async function getTeamData() {
    try {
        const response = await fetch(teamUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const teams = data.data.day_list[0].data[0].data;
        displayTeams(teams);
    } catch (error) {
        console.error("Error fetching team data:", error);
    }
}

// Function to fetch and display player data
async function getPlayerData() {
    try {
        const response = await fetch(playerUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        playersData = data.data.day_list[0].data[0].data; // Store the players data
        displayPlayers(playersData);
        displayEliminations(playersData); // Calculate and display eliminations leaderboard
        displayDamage(playersData); // Calculate and display damage leaderboard
    } catch (error) {
        console.error("Error fetching player data:", error);
    }
}

// Function to calculate and display elimination leaderboard
function displayEliminations(players) {
    const eliminations = players.slice().sort((a, b) => {
        if (b.kill_num === a.kill_num) {
            return b.damage - a.damage; // Sort by damage if kills are the same
        }
        return b.kill_num - a.kill_num; // Sort by kills
    });
    const eliminationsContainer = document.getElementById('eliminations');
    eliminationsContainer.innerHTML = ''; // Clear previous data
    eliminations.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.classList.add('leaderboard-item');
        playerDiv.innerHTML = `
            <img src="${player.pic}" alt="${player.name} Photo" onerror="handleImageError(event)">
            <h2>${player.name}</h2>
            <p><strong>Team:</strong> ${player.teams_name} (${player.team_short_name})</p>
            <p><strong>Eliminations:</strong> ${player.kill_num}</p>
            <p><strong>Damage:</strong> ${player.damage}</p>
        `;
        eliminationsContainer.appendChild(playerDiv);
    });
}

// Function to calculate and display damage leaderboard
function displayDamage(players) {
    const damage = players.slice().sort((a, b) => b.damage - a.damage);
    const damageContainer = document.getElementById('damage');
    damageContainer.innerHTML = ''; // Clear previous data
    damage.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.classList.add('leaderboard-item');
        playerDiv.innerHTML = `
            <img src="${player.pic}" alt="${player.name} Photo" onerror="handleImageError(event)">
            <h2>${player.name}</h2>
            <p><strong>Team:</strong> ${player.teams_name} (${player.team_short_name})</p>
            <p><strong>Damage:</strong> ${player.damage}</p>
            <p><strong>Eliminations:</strong> ${player.kill_num}</p>
        `;
        damageContainer.appendChild(playerDiv);
    });
}

// Function to display teams on the page
function displayTeams(teams) {
    const teamsContainer = document.getElementById('teams');
    teamsContainer.innerHTML = ''; // Clear previous data
    teams.forEach(team => {
        const teamDiv = document.createElement('div');
        teamDiv.classList.add('team');
        teamDiv.innerHTML = `
            <h2>${team.name}</h2>
            <img src="${team.pic}" alt="${team.name} Logo" onerror="handleImageError(event)">
            <p><strong>Country:</strong> ${team.country_name}</p>
            <p><strong>Country Logo:</strong> <img src="${team.country_logo}" alt="${team.country_name} Logo" style="width: 50px;"></p>
            <p><strong>Kills:</strong> ${team.kill_num}</p>
            <p><strong>Damage:</strong> ${team.damage}</p>
            <p><strong>Placement:</strong> ${team.placement}</p>
            <p><strong>WWCD:</strong> ${team.wwcd}</p>
            <p><strong>K/D:</strong> ${team.kd}</p>
            <p><strong>Survival Time:</strong> ${team.survival_time} seconds</p>
            <p><strong>Headshots:</strong> ${team.headshot_num}</p>
            <p><strong>Knockouts:</strong> ${team.knockouts}</p>
            <p><strong>Assists:</strong> ${team.assists}</p>
            <p><strong>Frag Grenades Used:</strong> ${team.useFragGrenadeNum}</p>
            <p><strong>Smoke Grenades Used:</strong> ${team.useSmokeGrenadeNum}</p>
            <p><strong>Rescue Times:</strong> ${team.rescueTimes}</p>
            <p><strong>Health:</strong> ${team.health}</p>
            <p><strong>Grenade Kills:</strong> ${team.killNumByGrenade}</p>
            <p><strong>Heal:</strong> ${team.heal}</p>
            <p><strong>Total Points:</strong> ${team.total}</p>
            <p><strong>Moving Distance:</strong> ${team.MovingDistance} meters</p>
            <p><strong>Driving Distance:</strong> ${team.drive_distance} meters</p>
            <p><strong>Air Drops:</strong> ${team.air_drop}</p>
            <p><strong>March Distance:</strong> ${team.march_distance} meters</p>
            <p><strong>Max Kill Distance:</strong> ${team.max_kill_distance} meters</p>
        `;
        teamsContainer.appendChild(teamDiv);
    });
}

// Function to display players on the page
function displayPlayers(players) {
    const playersContainer = document.getElementById('players');
    playersContainer.innerHTML = ''; // Clear previous data
    players.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.classList.add('player');
        playerDiv.innerHTML = `
            <h2>${player.name}</h2>
            <img src="${player.pic}" alt="${player.name} Photo" onerror="handleImageError(event)">
            <p><strong>Team:</strong> ${player.teams_name} (${player.team_short_name})</p>
            <p><strong>Kills:</strong> ${player.kill_num}</p>
            <p><strong>Damage:</strong> ${player.damage}</p>
            <p><strong>Placement:</strong> ${player.placement}</p>
            <p><strong>WWCD:</strong> ${player.wwcd}</p>
            <p><strong>K/D:</strong> ${player.kd}</p>
            <p><strong>Survival Time:</strong> ${player.survival_time} seconds</p>
            <p><strong>Headshots:</strong> ${player.headshot_num}</p>
            <p><strong>Knockouts:</strong> ${player.knockouts}</p>
            <p><strong>Assists:</strong> ${player.assists}</p>
            <p><strong>Frag Grenades Used:</strong> ${player.useFragGrenadeNum}</p>
            <p><strong>Smoke Grenades Used:</strong> ${player.useSmokeGrenadeNum}</p>
            <p><strong>Rescue Times:</strong> ${player.rescueTimes}</p>
            <p><strong>Health:</strong> ${player.health}</p>
            <p><strong>Grenade Kills:</strong> ${player.killNumByGrenade}</p>
            <p><strong>Heal:</strong> ${player.heal}</p>
            <p><strong>Total Points:</strong> ${player.total}</p>
            <p><strong>Moving Distance:</strong> ${player.MovingDistance} meters</p>
            <p><strong>Driving Distance:</strong> ${player.drive_distance} meters</p>
            <p><strong>Air Drops:</strong> ${player.air_drop}</p>
            <p><strong>March Distance:</strong> ${player.march_distance} meters</p>
            <p><strong>Max Kill Distance:</strong> ${player.max_kill_distance} meters</p>
        `;
        playersContainer.appendChild(playerDiv);
    });
}

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.querySelectorAll('.team, .player, .leaderboard-item').forEach(element => {
        element.classList.toggle('dark-mode');
    });
}

// Function to switch between sections
function showSection(sectionId) {
    const sections = document.querySelectorAll('.stats-section');
    sections.forEach(section => {
        section.style.display = section.id === sectionId ? 'flex' : 'none';
    });

    // Fetch data only if it's not already loaded
    if (sectionId === 'teams' && !document.getElementById('teams').hasChildNodes()) {
        getTeamData();
    }
    if (sectionId === 'players' && !document.getElementById('players').hasChildNodes()) {
        getPlayerData();
    }
}

// Event listeners
document.getElementById('toggle-dark-mode').addEventListener('click', toggleDarkMode);
document.getElementById('show-teams').addEventListener('click', () => showSection('teams'));
document.getElementById('show-players').addEventListener('click', () => showSection('players'));
document.getElementById('show-eliminations').addEventListener('click', () => {
    showSection('eliminations');
    displayEliminations(playersData); // Display eliminations leaderboard
});
document.getElementById('show-damage').addEventListener('click', () => {
    showSection('damage');
    displayDamage(playersData); // Display damage leaderboard
});

// Initial data fetch
getTeamData();
getPlayerData();
