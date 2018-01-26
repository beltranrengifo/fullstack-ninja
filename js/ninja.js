function Ninja(monster) {
      this.name = 'Fullstack Ninja';
      var sprites = {
            idle: {
                  img: 'img/sprites/ninja-idle.png',
                  frames: 24
            },
            idleR: {
                  img: 'img/sprites/ninja-idle-rev.png',
                  frames: 24
            },
            runL: {
                  img: 'img/sprites/ninja-run-large-backwards.png',
                  frames: 24
            },
            runR: {
                  img: 'img/sprites/ninja-run-large.png',
                  frames: 24
            },
            attackL: {
                  img: 'img/sprites/ninja-attack-1.png',
                  frames: 24
            },
            attackR: {
                  img: 'img/sprites/ninja-attack-1-rev.png',
                  frames: 24
            },
            jump: {
                  img: 'img/sprites/ninja-jump.png',
                  frames: 1
            },
            jumpR: {
                  img: 'img/sprites/ninja-jump-reverse.png',
                  frames: 1
            },
            dieLast: {
                  img: 'img/sprites/ninja-dies-last.png',
                  frames: 1
            },
            dies: {
                  img: 'img/sprites/ninja-dies.png',
                  frames: 24
            },
      };
      this.sprites = {};
      var that = this;
      Object.keys(sprites).forEach(function (key) {
            var img = new Image();
            img.src = sprites[key].img;
            that.sprites[key] = {
                  img: img,
                  frames: sprites[key].frames
            }
      });
      this.actualFrame = 0;
      this.setSprite('idle');
      this.scale = 295 / 479;
      this.frameWidth = 295;
      this.frameHeight = 479;
      this.direction = 1;
      this.playOnce = false;
      //postion
      this.x = 30;
      this.y = 285;
      this.speedX = 0;
      this.speedY = 0;
      this.maxSpeedX = 12;
      this.maxSpeedY = -43;
      this.jumping = false;
      // vida
      this.health = 100;
      this.extraPowerCount = 0;
      this.damage = 7;
      this.extraDamage = [];
      this.victories = 0;
      this.won = false;
      this.dead = false;
      this.defeated = false;
      this.canBeHurt = true;
}

Ninja.prototype.setSprite = function (name) {
      if (this.sprites[name].frames != 24) {
            this.actualFrame = 0;
      }
      this.currentSpriteFrames = this.sprites[name].frames;
      this.currentSprite = this.sprites[name].img;
}

Ninja.prototype.update = function (delta) {
      this.speedY += 3;
      if (this.x + this.speedX <= 20 || this.x + this.speedX >= 1100) {
            this.speedX = 0;
      }
      if (this.y + this.speedY >= 265) {
            this.speedY = 0;
      }
      this.x += this.speedX;
      this.y += this.speedY;
}


Ninja.prototype.render = function (board) {
      this.actualFrame = (this.actualFrame + 1) % this.currentSpriteFrames;
      board.ctx.drawImage(this.currentSprite, this.actualFrame * this.frameWidth, 0, this.frameWidth, this.frameHeight, this.x, this.y, 295, 479);
}

Ninja.prototype.move = function (direction) {
      this.totalFrames = 24;
      this.direction = direction;
      (this.direction > 0) ? this.setSprite('runR'): this.setSprite('runL');
      // move the ninja
      this.speedX = this.maxSpeedX * this.direction;
}

Ninja.prototype.jump = function () {
      (this.direction > 0) ? this.setSprite('jump'): this.setSprite('jumpR');
      if (this.y > 100) {
            this.speedY += this.maxSpeedY;      
      }
}

Ninja.prototype.stop = function () {
      this.speedX = 0;
      (this.direction > 0) ? this.setSprite('idle'): this.setSprite('idleR');
}

Ninja.prototype.attack = function () {
      sw.play();
      sw.volume = .4;
      (this.direction > 0) ? this.setSprite('attackL'): this.setSprite('attackR');
      if (this.detectMonsterContact(monster)) {
            if (monster.health < 1) {
                  if (!this.won) {
                        switch (monster.level) {
                              case 'level1':
                                    monster.img.src = 'img/sprites/monster-doom-die-xs-last.png';
                                    break;
                              case 'level2':
                                    monster.img.src = 'img/sprites/monster-wakkend-die-xs-last.png';
                                    break;
                              case 'level3':
                                    monster.img.src = 'img/sprites/monster-frunth-die-xs-last.png';
                                    break;
                        }
                        monster.currentFrame = 0;
                        monster.totalFrames = 1;
                        this.win();
                        this.won = true;
                        return;
                  }
            } else if (monster.health > 1) {
                  switch (monster.level) {
                        case 'level1':
                              monster.img.src = 'img/sprites/monster-doom-idle-xs.png';
                              break;
                        case 'level2':
                              monster.img.src = 'img/sprites/monster-wakkend-idle-xs.png';
                              break;
                        case 'level3':
                              monster.img.src = 'img/sprites/monster-frunth-idle-xs.png';
                              break;
                  }
                  monster.health -= 7;
                  monster.x += 10;
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
                  this.health -= 6;
                  hit.play();
                  if (this.x > 30) {
                        this.x -= 20;
                  }
            } else {
                  this.health = this.health;
            }
      } else {
            this.die();
      }
}

Ninja.prototype.updateScore = function () {
      var htmlElement = $('.ninja-health span');
      htmlElement.css('width', this.health + '%');
}

Ninja.prototype.win = function () {
      this.victories++;
      this.endLevel('win');
      powerUps.isAlive = false;
      HordeItem.isAlive = false;
}

Ninja.prototype.die = function () {
      this.dead = true;
      this.setSprite('dies');
      var that = this;
      powerUps.isAlive = false;
      HordeItem.isAlive = false;
      setTimeout(function () {
            that.setSprite('dieLast');
      }, 500)
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
      } else if (this.victories === 3) {
            buttonText = 'Well done #Ironhacker';
            actionText = 'the fullstack master';
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
Ninja.prototype.extraPower = function () {
      if (this.extraPowerCount < 4) {
            this.extraPowerCount++;
            $('.coin:nth-child(' + this.extraPowerCount + ')').css('background', 'url(img/coin-on.png)');
      } else {
            this.health += 30;
            this.extraPowerCount = 0;
            $('.coin').css('background', 'url(img/coin-off.png)');
      }
}