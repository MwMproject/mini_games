// Récupère le canvas HTML et son contexte de dessin en 2D
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Paramètres du jeu
const tileCount = 25; // nombre de cases (tiles) sur un axe (25x25)
let gridSize = 20;    // taille (en pixels) d'une case, sera redimensionnée

// État du jeu
let snake = [{ x: 10, y: 10 }]; // serpent avec une seule case au centre
let direction = { x: 0, y: 0 }; // direction initiale (immobile)
let apple = { x: 5, y: 5 };     // position initiale de la pomme
let score = 0;                 // score actuel
let hasStarted = false;       // indique si la partie a commencé

// Fonction pour redimensionner dynamiquement le canvas
function resizeCanvas() 
{
  const size = canvas.clientWidth; // récupère la largeur visible
  canvas.width = size;
  canvas.height = size;
  gridSize = size / tileCount;     // recalcule la taille d'une case
}
resizeCanvas(); // exécute une première fois
window.addEventListener("resize", resizeCanvas); // relance en cas de redimensionnement

// Boucle principale du jeu, s'exécute toutes les 100ms
function gameLoop() 
{
  if (hasStarted) 
    {
      update(); // met à jour la logique si le jeu a démarré
    }
    draw(); // dessine toujours
    setTimeout(gameLoop, 100); // relance la boucle après 100 ms
}

// Met à jour la logique du jeu à chaque tick
function update() 
{
  // Calcule la nouvelle position de la tête du serpent
  const head = 
  {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y,
  };

  // Si collision avec les murs ou le corps du serpent => Game Over
  if (
    head.x < 0 || head.x >= tileCount ||
    head.y < 0 || head.y >= tileCount ||
    snake.some(seg => seg.x === head.x && seg.y === head.y)
  ) 
  {
    alert("💥 Game Over !");
    resetGame();
    return;
  }

  // Ajoute la nouvelle tête au début du serpent
  snake.unshift(head);

  // Si la tête est sur la pomme
  if (head.x === apple.x && head.y === apple.y) 
    {
      score++; // incrémente le score
      document.getElementById("score").textContent = `Score : ${score}`;
      placeApple(); // génère une nouvelle pomme
    } 
  else {
    snake.pop(); // sinon retire la dernière case pour garder la longueur
  }
}

// Fonction pour dessiner tout le jeu
function draw() 
{
  // Fond
  ctx.fillStyle = "#dbe5c2";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Serpent
  ctx.fillStyle = "green"; // couleur verte
  snake.forEach(part => 
    {
      ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
    }
  );

  // Pomme
  ctx.fillStyle = "#af4c4cff"; // rouge foncé
  ctx.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize, gridSize);
}

// Génère une position aléatoire pour la pomme
function placeApple() 
{
  apple.x = Math.floor(Math.random() * tileCount);
  apple.y = Math.floor(Math.random() * tileCount);
}

// Réinitialise tous les paramètres pour recommencer une partie
function resetGame() 
{
  snake = [{ x: 10, y: 10 }]; // serpent au centre
  direction = { x: 0, y: 0 }; // immobile
  score = 0;
  hasStarted = false;
  document.getElementById("score").textContent = "Score : 0";
  placeApple();
}

// Gère les touches directionnelles du clavier
document.addEventListener("keydown", (e) => 
{
  switch (e.key) 
  {
    case "ArrowUp":
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
  hasStarted = true; // démarre le jeu dès qu’une flèche est pressée
}
);

// Lance la boucle du jeu au démarrage
gameLoop();
