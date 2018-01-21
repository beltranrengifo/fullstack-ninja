/*=======================
GLOBALS
=======================*/
var ninja = new Ninja();
var monsterImg;
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
                  monsterImg = 'img/doom.png';
                  monsterName = 'Da Doom';
                  levelBg = 'img/level1-bg.jpg';
                  break;
            case 'level2':
                  monsterImg = 'img/wakkend.png';
                  monsterName = 'Da Wakkend';
                  levelBg = 'img/level2-bg.jpg';
                  break;
            case 'level3':
                  monsterImg = 'img/frunth.png';
                  monsterName = 'Da Frunth';
                  levelBg = 'img/level3-bg.jpg';
                  break;
      }
      //nuevos objetos de board y monster
      monster = new Monster(monsterImg, monsterName);
      board = new Board(levelBg);
      //fx de start
      startGame(board, ninja);
}

/*=======================
START GAME!
=======================*/
function startGame(board, ninja) {
      //se calcula el delta
      then = now;
      now = Date.now();
      delta = now - then;
      /* limpiamos el canvas y repintamos 
      (OJO que el render del ninja se re-lanza desde el render del board) */
      board.clean(board.ctx);
      board.render(board, ninja, delta);
      //lanzamos la secuencia del navegador
      window.requestAnimationFrame(function () {
            startGame(board, ninja);
      });
};

/*=======================
KEY EVENTS MOVE NINJA
=======================*/
$(document).keydown(function (e) {
      console.log(e.keyCode);
      switch (e.keyCode) {
            //izq
            case 37:
                  ninja.move(-1);
                  break;
                  //dere
            case 39:
                  ninja.move(1);
                  break;
            case 38:
                  ninja.jump();
                  break;
            case 65:
                  ninja.attack();
                  break;
            default:
                  return; // exit this handler for other keys
      }
});

//ON KEYUP SE RESETEA LA SPEED
$(document).keyup(function (e) {
      ninja.stop();
});