kaboom({
  global: true,
  width: 1000,  
  height: 500,
  scale: 1,
  debug: true,
  clearColor: [0, 0, 0, 1],
});

let player; // Déclaration de player au niveau global
let movementsQueue = [];
const MOVE_SPEED = 100;
const movementDuration = 500; //
let currentMovementTimeout = null; // 

// Initialisation du WebSocket
const ws = new WebSocket('ws://localhost:8765');

ws.onmessage = function (event) {
  console.log("Message brut reçu du serveur:", event.data);
  const mouvement = event.data;
  console.log("Mouvement interprété:", mouvement);
  movementsQueue.push(mouvement); 
};


function movePlayer(direction) {
  if (!player) {
    console.log("Le joueur n'est pas initialisé.");
    return;
  }

  let movementDistance = MOVE_SPEED * (movementDuration / 1000); // en pixels
  let newPos;

  switch (direction) {
    case "haut":
      player.changeSprite("link-going-up");
      newPos = player.pos.add(0, -movementDistance);
      break;
    case "bas":
      player.changeSprite("link-going-down");
      newPos = player.pos.add(0, movementDistance);
      break;
    case "gauche":
      player.changeSprite("link-going-left");
      newPos = player.pos.add(-movementDistance, 0);
      break;
    case "droite":
      player.changeSprite("link-going-right");
      newPos = player.pos.add(movementDistance, 0);
      break;
  }

  // Déplace le joueur vers la nouvelle position sur la durée spécifiée
  player.pos = newPos;

  setTimeout(() => {
    console.log(`Le joueur s'est déplacé vers ${direction} et s'arrête.`);
  }, movementDuration);
}



function processMovementsQueue() {
  if (movementsQueue.length > 0) {
    const movement = movementsQueue.shift();
    movePlayer(movement);
  }
}

// loadRoot("../public/sprite/");
loadRoot("sprite/");
loadSprite("link-going-left", "linkGoingLeft.png");
loadSprite("link-going-right", "linkGoingright.png");
loadSprite("link-going-down", "linkgoindown.png");
loadSprite("link-going-up", "linkgoingup.png");
loadSprite("left-wall", "leftwall.png");
loadSprite("top-wall", "topwall.png");
loadSprite("bottom-wall", "bottomwall.png");
loadSprite("right-wall", "rightwall.png");
loadSprite("bottom-left-wall", "bottomleft.png");
loadSprite("bottom-right-wall", "bottomright.png");
loadSprite("top-left-wall", "topleft.png");
loadSprite("top-right-wall", "topright.jpg");
loadSprite("top-door", "door.png");
loadSprite("fire-pot", "firepot.png");
loadSprite("left-door", "doorleft.png");
loadSprite("lanterns", "lanterns.png");
loadSprite("slicer", "slicer.png");
loadSprite("skeletor", "skeletor.png");
loadSprite("kaboom", "kaboom.png");
loadSprite("stairs", "stairs.png");
loadSprite("btc", "btc.png");
loadSprite("bg", "bg.png");

scene("game", ({ level, score }) => {
  layers(["bg", "obj", "ui"], "obj");

  const maps = [
    [
      "yccccccc)ccccc)ccccccw",
      "a          (         b",
      "a  ((((((  (     ( - b",
      "a  (       (     ((((b",
      "a  (       (         b",
      "a  (    ((((      }  b",
      "a  (                 b",
      "a  (            *    b",
      "a  (                 b",
      "xddddddddddddddddddddz",
    ],
  ];

  const levelCfg = {
    width: 46,
    height: 48,
    a: [sprite("left-wall"), solid(), "wall"],
    c: [sprite("top-wall"), solid(), "wall"],
    d: [sprite("bottom-wall"), solid(), "wall"],
    b: [sprite("right-wall"), solid(), "wall"],
    x: [sprite("bottom-left-wall"), solid(), "wall"],
    z: [sprite("bottom-right-wall"), solid(), "wall"],
    y: [sprite("top-left-wall"), solid(), "wall"],
    w: [sprite("top-right-wall"), solid(), "wall"],
    "^": [sprite("top-door"), "next-level", "door"],
    "-": [sprite("btc"), solid(), "wall"],
    "(": [sprite("fire-pot"), solid(), "wall"],
    "%": [sprite("left-door"), "next-level", "door"],
    ")": [sprite("lanterns"), solid(), "wall"],
    "*": [sprite("slicer"), "slicer", { dir: -1 }, "dangerous"],
    "}": [sprite("skeletor"), "dangerous", "skeletor", { dir: -1, timer: 0 }],
    $: [sprite("stairs"), "next-level"],
  };

  addLevel(maps[level], levelCfg);

  add([sprite("bg"), layer("bg")]);

  add([text("Unity Quest"), pos(160, 500), scale(4)]);

  player = add([
    sprite("link-going-right"), 
    pos(50, 190),
    {
      
      dir: vec2(1, 0),
    },
  ]);

  player.action(() => {
    player.resolve();
    processMovementsQueue(); 
  });

  const SLICER_SPEED = 100;

  action("slicer", (s) => {
    s.move(s.dir * SLICER_SPEED, 0);
  });

  collides("slicer", "wall", (s) => {
    s.dir = -s.dir;
  });

  const SKELETOR_SPEED = 60;
  action("skeletor", (s) => {
    s.move(0, s.dir * SKELETOR_SPEED);
    s.timer -= dt();
    if (s.timer <= 0) {
      s.dir = -s.dir;
      s.timer = rand(5);
    }
  });

  collides("skeletor", "wall", (s) => {
    s.dir = -s.dir;
  });


  scene("lose", ({ score }) => {
    add([text(score, 32), origin("center"), pos(width() / 2, height() / 2)]);
  });


});


start("game", { level: 0, score: 0 });


