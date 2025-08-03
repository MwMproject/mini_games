const cells = document.querySelectorAll('[data-cell]');
const game_status = document.getElementById('game_status');
const end_game_status = document.getElementById('end_game_status');
const game_end = document.getElementById('game_end');

const player_one = 'X';
const player_two = 'O';
let player_turn = player_one;

const winning_patterns = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]             
];

init_game();

cells.forEach(cell => {
    cell.addEventListener('click', play_game, { once: true });
});

function play_game(e) {
    e.target.innerHTML = player_turn;

    if (check_win(player_turn)) {
        update_game_status("wins" + player_turn);
        return end_game();
    }

    if (check_draw()) {
        update_game_status('draw');
        return end_game();
    }

    player_turn = (player_turn === player_one) ? player_two : player_one;
    update_game_status(player_turn);
}

function check_win(player) {
    return winning_patterns.some(pattern =>
        pattern.every(index => cells[index].innerHTML === player)
    );
}

function check_draw() {
    return [...cells].every(cell =>
        cell.innerHTML === player_one || cell.innerHTML === player_two
    );
}

function update_game_status(status) {
    let status_text;

    switch (status) {
        case 'X':
            status_text = 'Au tour du joueur 1 !';
            break;
        case 'O':
            status_text = 'Au tour du joueur 2 !';
            break;
        case 'winsX':
            status_text = 'Victoire du joueur 1 !';
            break;
        case 'winsO':
            status_text = 'Victoire du joueur 2 !';
            break;
        case 'draw':
            status_text = 'Égalité !';
            break;
        default:
            status_text = `Tour du joueur ${player_turn}`;
    }

    game_status.innerHTML = status_text;
    end_game_status.innerHTML = status_text;
}

function end_game() {
    game_end.style.display = 'flex'; 
}

function replay() {
    window.location.reload();
}

function init_game() {
    game_end.style.display = 'none';
}
