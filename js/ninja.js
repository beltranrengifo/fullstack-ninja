function Ninja(monster) {
      this.name = 'Fullstack Ninja';
      this.img = new Image();
      this.img.src = 'img/sprites/ninja1.png';
      this.scale = 295 / 479;
      //para los sprites
      this.shift = 0;
      this.frameWidth = 295;
      this.frameHeight = 479;
      this.totalFrames = 1;
      this.currentFrame = 0;
      this.direction = 1;
      //postion
      this.x = 30;
      this.y = 285;
      this.speedX = 0;
      this.speedY = 0;
      this.maxSpeedX = 600;
      this.maxSpeedY = 700;
      // vida
      this.health = 100;
      this.damage = 7;
      this.extraDamage = [];
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
      } else if (this.x > 1390) {
            this.x = 1380;
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
      } 
      else {
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
      this.totalFrames = 1;
      this.img.src = 'img/sprites/ninja1.png';
      //resetea el current frame al 0, para los sprites de 1 sola img
      this.currentFrame = 0;
}

Ninja.prototype.attack = function(monster) {
      this.totalFrames = 24;
      if (this.direction === 1) {
            this.img.src = 'img/sprites/ninja-attack-1.png';
      } else {
            this.img.src = 'img/sprites/ninja-attack-1-rev.png';
      }
      console.log(monster);
      monster.health -= 10;
      // if ( this.detectContact(this.monster) ) {

      // }
      console.log('desde metodo attack ninja: '+monster.health);
}