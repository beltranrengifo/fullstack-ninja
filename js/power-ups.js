function PowerUp(powerUpOptions) {
      this.img = new Image();
      this.img.src = 'img/Coin_demo.png';
      this.y = -200;
      this.speed = 200;
      this.x = this.random(400, 1000);
      this.frameWidth = 70;
      this.frameHeight = 70;
}

PowerUp.prototype.render = function (board, delta) {
      if (this.y > 720) {
            this.y = this.random(-1200, -3500);
            this.x = this.random(40, 1200);
      } else {
            this.y += this.speed / 1000 * delta;
            // this.x = this.random(400, 1100);
            board.ctx.drawImage(this.img, this.x, this.y, this.frameWidth, this.frameHeight);
      }
}

PowerUp.prototype.random = function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
}

PowerUp.prototype.restart = function() {
      this.y = this.random(-1200, -3500);
}