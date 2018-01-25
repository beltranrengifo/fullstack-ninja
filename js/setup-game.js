/*=======================
GLOBALS
=======================*/
var ninja;
var levelBg;
var monster;
var monsterAttack;
var randomAttack;
var massiveAttack = false;
var board;
var massiveAttackSpeed = 0;
var rocketImage;
var powerUpOptions;
var powerUps;
var powerUpInterval;
var horde = [];
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
                              x: 1250,
                              y: 350
                        },
                        level: level,
                        thumb: 'img/doom-thumb.png'
                  }
                  levelBg = 'img/level1-bg.jpg';
                  rocketImage = 'img/monster-rocket-1.png';
                  break;
            case 'level2':
                  monsterOptions = {
                        src: 'img/sprites/monster-doom-idle-xs.png',
                        name: 'Da Wakkend',
                        pos: {
                              x: 1250,
                              y: 350
                        },
                        level: level,
                        thumb: 'img/wakkend-thumb.png'
                  }
                  levelBg = 'img/level2-bg.jpg';
                  rocketImage = 'img/monster-rocket-2.png';
                  massiveAttack = false;
                  massiveAttackSpeed = 500;
                  break;
            case 'level3':
                  monsterOptions = {
                        src: 'img/sprites/monster-doom-idle-xs.png',
                        name: 'Da Frunth',
                        pos: {
                              x: 1250,
                              y: 360
                        },
                        level: level,
                        thumb: 'img/frunth-thumb.png'
                  }
                  levelBg = 'img/level3-bg.jpg';
                  rocketImage = 'img/monster-rocket-3.png';
                  massiveAttack = false;
                  massiveAttackSpeed = 1500;
                  break;
      }

      var game = new Game(board, ninja, monster);
      board = new Board(levelBg);
      monster = new Monster(monsterOptions, board);
      monster.updateThumb();
      ninja = new Ninja(monster);
      monsterAttack = new MonsterAttack(board, rocketImage);
      powerUps = new PowerUp(powerUpOptions);

      //LOOP ATAQUES
      loopMassiveAtack(monsterAttack);
      //first load
      if (firstLoad) {
            startGame(game);
            firstLoad = false;
            // not first load - reset game parameters
      } else {
            ninja.health = 100;
            ninja.x = 30;
            ninja.dead = false;
            ninja.won = false;
            ninja.defeated = false;
            ninja.img.src = 'img/sprites/ninja-idle.png';
            that.totalFrames = 24;
            ninja.extraPowerCount = 0;
            powerUps.isAlive = true;
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

      monster.render(board, delta, ninja);
      monster.updateScore();
      ninja.render(board, delta);
      ninja.updateScore();
      if (!ninja.won) {
            //coins
            powerUps.render(board, delta);
            //fire balls
            if (massiveAttack) {
                  if (monsterAttack.x < 0) {
                        massiveAttack = false;
                  } else {
                        monsterAttack.render(board, delta);
                  }
                  if (
                        (Math.floor(monsterAttack.x) < Math.floor((ninja.x + 150))) &&
                        (Math.floor(monsterAttack.x) > Math.floor((ninja.x)))
                  ) {
                        if (Math.floor((ninja.y + 270)) > monsterAttack.y) {
                              ninja.checkDamage();
                              monsterAttack.x = 1200;
                              massiveAttack = false;
                        }
                  }
            }
            //rock avalanche
            createHorde(horde);
            horde.forEach(function (item, i) {
                  console.log(ninja.won);
                  item.render(board);
                  if (item.y > 720) {
                        horde.splice(i, 1);
                  }
                  if (!ninja.dead) {
                        if (
                              (ninja.x <= item.x) &&
                              (ninja.x + 150 >= item.x) &&
                              (ninja.y + 200 < item.y + 45) &&
                              (ninja.y + 300 > item.y)
                        ) {
                              horde.splice(i, 1);
                              ninja.checkDamage();
                        }
                  }
            });
      }


      //detect coins
      if (
            (ninja.x - 10 <= powerUps.x) &&
            (ninja.x + 150 >= powerUps.x + 70) &&
            (ninja.y + 100 < powerUps.y + 70) &&
            (ninja.y + 250 > powerUps.y)
      ) {
            ninja.extraPower()
            powerUps.restart();
      }



      //lanzamos la secuencia del navegador
      window.requestAnimationFrame(function () {
            startGame(board, ninja, monster);
      });
};


function loopMassiveAtack() {
      randomAttack = Math.round(Math.random() * (3000 - 500)) + 500;
      setTimeout(function () {
            monster.attack(ninja)
            loopMassiveAtack();
      }, randomAttack - massiveAttackSpeed);
};

//fill horde
function createHorde(horde) {
      while (horde.length < 2) {
            horde.push(new HordeItem());
      }
}

function changeLevel(level, victories, defeated) {
      console.log(defeated);
      console.log(victories);
      if (defeated) {
            levelSelection();
      } else {
            if (victories < 3) {
                  $('.level-box[data-level="' + level + '"]').addClass('defeated disabled').next().removeClass('disabled');
            } else {
                  // 3 victorias - partida ganada
                  console.log('has guanyat foquer');
            }
      }
      $('#game-board').fadeOut(500, function () {
            levelSelection();
      });

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