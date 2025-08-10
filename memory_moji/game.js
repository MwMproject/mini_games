// déclaration des emojis
const symbols = ["🍎", "🍌", "🍇", "🍉", "🍓", "🥕", "🍍", "🥝"];
let cardsArray = [...symbols, ...symbols];

// mélange le tableau de cartes
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// variables du jeu
const gameBoard = document.getElementById("gameBoard");
let firstCard = null;
let secondCard = null;
let firstSymbol = null;
let secondSymbol = null;
let lockBoard = false;
let score = 0;

// fonction pour créer le plateau avec les cartes
function createBoard() {
    gameBoard.innerHTML = "";
    cardsArray.forEach(symbol => {
        const card = document.createElement("div");
        card.classList.add("card");

        const front = document.createElement("div");
        front.classList.add("front");

        const back = document.createElement("div");
        back.classList.add("back");
        back.textContent = symbol;

        card.appendChild(front);
        card.appendChild(back);

        card.addEventListener("click", () => flipCard(card, symbol));

        gameBoard.appendChild(card);
    });
}

// fonction pour retourner les cartes
function flipCard(card, symbol) {
    if (lockBoard) return; 
    if (card === firstCard) return; 

    card.classList.add("flipped");
    card.children[0].style.display = "none"; 
    card.children[1].style.transform = "rotateY(0)"; 

    if (!firstCard) {
        firstCard = card;
        firstSymbol = symbol;
    } else {
        secondCard = card;
        secondSymbol = symbol;

        score++;
        document.getElementById("score").textContent = `Coups : ${score}`;

        checkForMatch();
    }
}

// fonction pour vérifier si les cartes sont une paire
function checkForMatch() {
    if (firstSymbol === secondSymbol) {
        resetTurn();
        checkGameOver();  // Vérifie si toutes les paires sont trouvées
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");

            firstCard.children[0].style.display = "block";
            secondCard.children[0].style.display = "block";

            firstCard.children[1].style.transform = "rotateY(180deg)";
            secondCard.children[1].style.transform = "rotateY(180deg)";

            resetTurn();
        }, 1000);
    }
}

// fonction pour réinitialiser à la fin du tour
function resetTurn() {
    [firstCard, secondCard] = [null, null];
    [firstSymbol, secondSymbol] = [null, null];
    lockBoard = false;
}

// fonction pour vérifier si la partie est terminée
function checkGameOver() {
    const flippedCards = document.querySelectorAll('.card.flipped');
    if (flippedCards.length === cardsArray.length) {
        // Message de victoire
        alert("Félicitations, tu as gagné ! 🎉");

        // Affiche le bouton reset
        document.getElementById('reset_btn').style.display = "inline-block";
    }
}

// fonction pour réinitialiser toute la partie
function resetGame() {
    score = 0;
    document.getElementById("score").textContent = "Retrouves les paires d'emojis !";

    firstCard = null;
    secondCard = null;
    firstSymbol = null;
    secondSymbol = null;
    lockBoard = false;

    cardsArray = shuffle([...symbols, ...symbols]);

    // Cache le bouton reset
    document.getElementById('reset_btn').style.display = "none";

    createBoard();
}

// initialisation du jeu au chargement
cardsArray = shuffle(cardsArray);
createBoard();

// écouteur sur le bouton reset
document.getElementById("reset_btn").addEventListener("click", resetGame);
