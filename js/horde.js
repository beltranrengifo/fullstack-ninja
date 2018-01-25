function HordeItem() {
      this.img = new Image();
      this.imgArray = ['img/horde-stone-1.png', 'img/horde-stone-2.png', 'img/horde-stone-3.png', 'img/horde-stone-4.png'];
      this.img.src = this.imgArray[this.random(0, 4)];
      this.x = this.random(20, 1300);
      this.y = this.random(-1400, -40);
      this.speedY = 500;
      this.isAlive = true;
      this.frameWidth = 90;
      this.frameHeight = 90;
      this.isAlive = true;
}

HordeItem.prototype.render = function (board) {
      if (this.isAlive) {
            this.y += this.speedY / 1000 * delta;
            board.ctx.drawImage(this.img, this.x, this.y, this.frameWidth, this.frameHeight);
      }
}

HordeItem.prototype.random = function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
}