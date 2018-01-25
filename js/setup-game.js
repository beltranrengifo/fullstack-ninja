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
var massiveAttackSpeed = 0;
var rocketImage;
var powerUpOptions;
var powerUps;
var powerUpInterval;
var horde = [];
var now = Date.now();
var delta = 0;
var firstLoad = true;
/*=======================
ASSIGN ASSETS PARA 
LAS FX CONSTRUCTORAS
=======================*/
function assignAssets(level) {
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
                        src: 'img/sprites/monster-wakkend-idle-xs.png',
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
            monster.health=100;
            ninja.health = 100;
            ninja.x = 30;
            ninja.dead = false;
            ninja.won = false;
            ninja.defeated = false;
            ninja.img.src = 'img/sprites/ninja-idle.png';
            that.totalFrames = 24;
            ninja.extraPowerCount = 0;
            $('.coin').css('background', 'url(img/coin-off.png)');
            powerUps.isAlive = true;
      }
}
/*=======================
START GAME!
=======================*/
function startGame(game) {
      then = now;
      now = Date.now();
      delta = now - then;
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
            coin2.play();
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
function createHorde(horde) {
      while (horde.length < 2) {
            horde.push(new HordeItem());
      }
}
function changeLevel(level, victories, defeated) {
      if (defeated) {
            levelSelection();
      } else {
            if (ninja.victories < 3) {
                  $('.level-box[data-level="' + level + '"]').addClass('defeated disabled').next().removeClass('disabled');
                  $('#game-board').fadeOut(500, function () {
                        levelSelection();
                  });
            } else {
                  // 3 victorias - partida ganada
                  $('.level-box[data-level="level3"]').addClass('defeated disabled');
                  $('#game-board').fadeOut(500, function () {
                        levelSelection('game');
                  });
            }
      }
}
/*=======================
KEY EVENTS MOVE NINJA
=======================*/
$(document).keydown(function (e) {
      switch (e.keyCode) {
            case 37:
                  ninja.move(-1, monster);
                  run.play();
                  break;
            case 39:
                  ninja.move(1, monster);
                  run.play();
                  break;
            case 38:
                  ninja.jump();
                  jump.play();
                  jump.volume = .1;
                  break;
            case 65:
                  ninja.attack(monster);
                  break;
            default:
                  return;
      }
});
$(document).keyup(function (e) {
      switch (e.keyCode) {
            case 37:
            case 38:
            case 39:
            case 65:
                  ninja.stop();
                  run.pause();
                  run.currentTime = 0;
                  jump.pause();
                  jump.currentTime = 0;
                  break;
            default:
                  return;
      }
});