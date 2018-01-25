function PowerUp(powerUpOptions) {
      this.img = new Image();
      this.img.src = 'img/sprites/coin.png';
      this.y = -200;
      this.speed = 300;
      this.x = this.random(400, 1000);
      this.frameWidth = 70;
      this.frameHeight = 70;
      this.shift = 0;
      this.totalFrames = 24;
      this.currentFrame = 0;
      this.isAlive = true;
}

PowerUp.prototype.render = function (board, delta) {
      if (this.isAlive) {
            if (this.y > 720) {
                  this.y = this.random(-1200, -3500);
                  this.x = this.random(40, 1200);
            } else {
                  this.y += this.speed / 1000 * delta;
                  board.ctx.drawImage(this.img, this.shift, 0, this.frameWidth, this.frameHeight, this.x, this.y, this.frameWidth, this.frameHeight);
                  this.shift += (this.frameWidth);
                  if (this.currentFrame == this.totalFrames) {
                        this.shift = 0;
                        this.currentFrame = 0;
                  }
                  this.currentFrame++;
            }
      }
}

PowerUp.prototype.random = function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
}

PowerUp.prototype.restart = function () {
      this.y = this.random(-1200, -3500);
      this.x = this.random(40, 1200);
}