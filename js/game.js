var ninja = new Ninja();
var monsterImg;
var levelBg;
var monsterName;
var monster;
var board;

var now = Date.now();
var delta = 0;

function assignAssets(level) {
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
      monster = new Monster(monsterImg, monsterName);
      board = new Board(levelBg);
      startGame(board, ninja);
}

function startGame(board, ninja) {

      board.clean(board.ctx);
      board.render(board, ninja, delta);

      window.requestAnimationFrame(function () {
            startGame(board, ninja);
      });
};

$(window).keydown(function (e) {
      console.log(e.which);
      ninja.move(e.which);
      ninja.jump(e.which);
});