/*=======================
GLOBALS
=======================*/
var ninja = new Ninja();
var monsterSrc;
var levelBg;
var monsterName;
var monster;
var board;
/* ojo delta para smooth movement (extraído del ejemplo de los cubos)
https://codepen.io/boyander/pen/XVyEbv?editors=1010 */
var now = Date.now();
var delta = 0;

/*=======================
ASSIGN ASSETS PARA 
LAS FX CONSTRUCTORAS
=======================*/
function assignAssets(level) {
      /* el level es el data del elementos HTML sobre el que se clicka
      en la pantalla de seleccionar nivel */
      switch (level) {
            case 'level1':
                  monsterOptions = {
                        src: 'img/sprites/monster-doom-idle.png',
                        name: 'Da Doom',
                        pos: {x: 1110,y: 60}
                  }
                  levelBg = 'img/level1-bg.jpg';
                  break;
            case 'level2':
                  monsterOptions = {
                        src: 'img/sprites/monster-doom-idle.png',
                        name: 'Da Wakkend',
                        pos: {x: 1110,y: 60}
                  }
                  levelBg = 'img/level2-bg.jpg';
                  break;
            case 'level3':
                  monsterOptions = {
                        src: 'img/sprites/monster-doom-idle.png',
                        name: 'Da Wakkend',
                        pos: {x: 1000,y: 70}
                  }
                  levelBg = 'img/level3-bg.jpg';
                  break;
      }
      //nuevos objetos de board y monster
      board = new Board(levelBg);
      monster = new Monster(monsterOptions, board);
      //fx de start
      startGame(board, ninja, monster);
}

/*=======================
START GAME!
=======================*/
function startGame(board, ninja, monster) {
      //se calcula el delta
      then = now;
      now = Date.now();
      delta = now - then;
      /* limpiamos el canvas y repintamos 
      (OJO que el render del ninja se re-lanza desde el render del board) */
      board.clean(board.ctx);
      board.render(board, ninja, delta, monster);
      //lanzamos la secuencia del navegador
      window.requestAnimationFrame(function () {
            startGame(board, ninja, monster);
      });
};

/*=======================
KEY EVENTS MOVE NINJA
=======================*/
$(document).keydown(function (e) {
      switch (e.keyCode) {
            //izq
            case 37:
                  ninja.move(-1,monster);
                  break;
                  //dere
            case 39:
                  ninja.move(1,monster);
                  break;
            case 38:
                  ninja.jump();
                  break;
            case 65:
                  ninja.attack(monster);
                  break;
            default:
                  // exit this handler for other keys
                  return;
      }
});

//ON KEYUP SE RESETEA LA SPEED
$(document).keyup(function (e) {
      switch (e.keyCode) {
            case 37:
            case 38:
            case 39:
            case 65:
                  ninja.stop();
                  break;
            default:
                  return; // exit this handler for other keys
      }
});