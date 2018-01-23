/*=======================
GLOBALS
=======================*/
var ninja = new Ninja(monster);
var levelBg;
var monster;
var monsterAttack;
var randomAttack;
var massiveAttack = false;
var board;
/* ojo delta para smooth movement (extraído del ejemplo de los cubos)
https://codepen.io/boyander/pen/XVyEbv?editors=1010 */
var now = Date.now();
var delta = 0;
var firstLoad = true;
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
                        src: 'img/sprites/monster-doom-idle-xs.png',
                        name: 'Da Doom',
                        pos: {
                              x: 1300,
                              y: 350
                        },
                        level: level
                  }
                  levelBg = 'img/level1-bg.jpg';
                  break;
            case 'level2':
                  monsterOptions = {
                        src: 'img/sprites/monster-doom-idle-xs.png',
                        name: 'Da Wakkend',
                        pos: {
                              x: 1110,
                              y: 60
                        },
                        level: level
                  }
                  levelBg = 'img/level2-bg.jpg';
                  break;
            case 'level3':
                  monsterOptions = {
                        src: 'img/sprites/monster-doom-idle-xs.png',
                        name: 'Da Wakkend',
                        pos: {
                              x: 1000,
                              y: 70
                        },
                        level: level
                  }
                  levelBg = 'img/level3-bg.jpg';
                  break;
      }

      var game = new Game(board, ninja, monster);
      board = new Board(levelBg);
      monster = new Monster(monsterOptions, board);
      monsterAttack = new MonsterAttack(board);
      ninja.x = 30;
      ninja.won = false;
      loopMassiveAtack(monsterAttack);

      //first load
      if (firstLoad) {
            startGame(game);
            firstLoad = false;
      }
}


/*=======================
START GAME!
=======================*/
function startGame(game) {
      //se calcula el delta
      then = now;
      now = Date.now();
      delta = now - then;
      /* limpiamos el canvas y repintamos 
      (OJO que el render del ninja se re-lanza desde el render del board) */
      board.clean(board.ctx);
      board.render(board, ninja, delta, monster);
      if (massiveAttack) {
            monsterAttack.render(board, delta);
            if ( (Math.floor(monsterAttack.x) < Math.floor((ninja.x + 150))) && (Math.floor(monsterAttack.x) > Math.floor((ninja.x))) ) {
                  if (Math.floor((ninja.y + 270)) > monsterAttack.y) {
                        console.log('tocado');
                        //monsterAttack.x = 1200;
                        monsterAttack.explode();
                  }
            }
      }
      //lanzamos la secuencia del navegador
      window.requestAnimationFrame(function () {
            startGame(board, ninja, monster);
      });
};


function loopMassiveAtack() {
      randomAttack = Math.round(Math.random() * (3000 - 500)) + 500;
      setTimeout(function () {
            monster.attack()
            loopMassiveAtack();
      }, randomAttack);
};


function changeLevel(level, victories) {
      if (victories < 3) {
            $('.level-box[data-level="' + level + '"]').addClass('defeated disabled').next().removeClass('disabled');
            $('#game-board').fadeOut(500, function () {
                  levelSelection();
            });
      } else {
            // 3 victorias - partida ganada
            console.log('has guanyat foquer');
            $('#game-board').fadeOut(500, function () {
                  levelSelection();
            });
      }
}



/*=======================
KEY EVENTS MOVE NINJA
=======================*/
$(document).keydown(function (e) {
      switch (e.keyCode) {
            //izq
            case 37:
                  ninja.move(-1, monster);
                  break;
                  //dere
            case 39:
                  ninja.move(1, monster);
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