function Ninja(monster) {
      this.name = 'Fullstack Ninja';
      this.img = new Image();
      this.img.src = 'img/sprites/ninja-idle.png';
      this.scale = 295 / 479;
      //para los sprites
      this.shift = 0;
      this.frameWidth = 295;
      this.frameHeight = 479;
      this.totalFrames = 24;
      this.currentFrame = 0;
      this.direction = 1;
      this.playOnce = false;
      //postion
      this.x = 30;
      this.y = 285;
      this.speedX = 0;
      this.speedY = 0;
      this.maxSpeedX = 600;
      this.maxSpeedY = 700;
      this.jumping = false;
      // vida
      this.health = 120;
      this.damage = 7;
      this.extraDamage = [];
      this.victories = 0;
      this.won = false;
      this.defeated = false;
      this.canBeHurt = true;
}

Ninja.prototype.render = function (board, delta) {
      this.x += this.speedX / 1000 * delta;
      //comprobamos que el ninja no se vaya del canvas en el eje Y
      if (this.y > 285) {
            this.y = 286;
      } else if (this.y <= 0) {
            this.y = 1;
      } else {
            this.y -= this.speedY / 1000 * delta;
      }

      board.ctx.drawImage(this.img, this.shift, 0, this.frameWidth, this.frameHeight, this.x, this.y, 295, 479);
      this.shift += (this.frameWidth);

      if (this.currentFrame == this.totalFrames) {
            this.shift = 0;
            this.currentFrame = 0;
      }
      this.currentFrame++;
}

Ninja.prototype.move = function (direction) {
      this.totalFrames = 24;
      this.direction = direction;
      if (this.x < 20) {
            this.x = 20;
      } else if (this.x > 1100) {
            this.x = 1090;
      } else if (this.y > 284) {
            if (this.direction === -1) {
                  this.img.src = 'img/sprites/ninja-run-large-backwards.png';
            } else {
                  this.img.src = 'img/sprites/ninja-run-large.png';
            }
            this.speedX = this.maxSpeedX * this.direction;
      }
}

Ninja.prototype.jump = function () {
      this.totalFrames = 1;
      //resetea el current frame al 0, para los sprites de 1 sola img
      this.currentFrame = 0;
      if (this.direction === 1) {
            this.img.src = 'img/sprites/ninja-jump.png';
      } else {
            this.img.src = 'img/sprites/ninja-jump-reverse.png';
      }

      this.speedY = this.maxSpeedY;

      if (this.y > 285) {
            this.y = 285;
      } else if (this.y < 285) {
            this.stop();
      } else {
            this.y -= this.speedY / 1000 * delta;
      }
}


Ninja.prototype.stop = function () {
      this.speedX = 0;
      if (this.y < 285) {
            // velocidad negativa para bajar al ninja al suelo
            this.speedY = -650;
      } else {
            this.speedY = 0;
      }
      this.totalFrames = 24;
      if (this.direction === 1) {
            this.img.src = 'img/sprites/ninja-idle.png';
      } else {
            this.img.src = 'img/sprites/ninja-idle-rev.png';
      }
}

Ninja.prototype.attack = function (monster) {
      this.totalFrames = 24;
      if (this.direction === 1) {
            this.img.src = 'img/sprites/ninja-attack-1.png';
      } else {
            this.img.src = 'img/sprites/ninja-attack-1-rev.png';
      }
      if (this.detectMonsterContact(monster)) {
            if (monster.health <= 1 && this.won === false) {
                  monster.img.src = 'img/sprites/monster-doom-die-xs.png';
                  setTimeout(function () {
                        monster.currentFrame = 0;
                        monster.totalFrames = 1;
                        monster.img.src = 'img/sprites/monster-doom-die-xs-last.png';
                  }, 600)
                  this.won = true;
                  this.win();
                  return;
            } else if (monster.health > 1) {
                  monster.img.src = 'img/sprites/monster-doom-hurt-xs.png';
                  monster.x += 10;
                  setTimeout(function () {
                        monster.img.src = 'img/sprites/monster-doom-idle-xs.png';
                  }, 1000);
                  monster.health -= 10;
                  return;
            }
      }
}

Ninja.prototype.detectMonsterContact = function (monster) {
      if (this.x + this.frameWidth >= monster.x) {
            return true;
      }
}

Ninja.prototype.checkDamage = function (monsterAttack) {
      if (this.health > 0) {
            if (this.canBeHurt) {
                  this.canBeHurt = false;
                  this.health -= 10;
                  this.x -= 20;
                  this.img.src = 'img/sprites/ninja-hurt.png'
                  that = this;
                  setTimeout(function () {
                        that.img.src = 'img/sprites/ninja-idle.png';
                        that.canBeHurt = true;
                  }, 1000);
            } else {
                  this.health = this.health;
            }
      } else {
            this.die();
      }
}

Ninja.prototype.win = function () {
      this.victories++;
      this.endLevel('win');
}

Ninja.prototype.die = function () {
      this.img.src = 'img/sprites/ninja-dies.png';
      that = this;
      setTimeout(function () {
            that.currentFrame = 0;
            that.totalFrames = 1;
            that.img.src = 'img/sprites/ninja-dies-last.png';
      }, 600)
      this.endLevel('die');
}

Ninja.prototype.endLevel = function (action) {
      var actionText = 'win';
      var monsterAction = 'has been defeated';
      var buttonText = 'Next level';
      if (action === 'die') {
            actionText = 'lose';
            monsterAction = 'has defeated you';
            buttonText = 'Try again';
            this.defeated = true;
      }
      that = this;
      $('#game-result-modal h2 span').text(actionText);
      $('#game-result-modal h3').html('<span>' + monster.name + '</span> ' + monsterAction);
      $('.next-level-btn button').text(buttonText);
      $('#game-result-modal').fadeIn();
      $('.next-level-btn button').click(function () {
            $('#game-result-modal').fadeOut();
            changeLevel(monster.level, that.victories, that.defeated);
      });
      //esto para quitar las bullets es una chapuza
      monsterAttack.cancel();
}