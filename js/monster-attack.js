function MonsterAttack(board, img) {
      this.img = new Image();
      this.img.src = img;
      this.x = 1200;
      this.y = 500;
      this.speedX = 900;
      this.frameWidth = 176;
      this.frameHeight = 80;
      this.ctx = board;
}

MonsterAttack.prototype.render = function (board, delta) {
      this.x -= this.speedX / 1000 * delta;
      board.ctx.drawImage(this.img, this.x, this.y, this.frameWidth, this.frameHeight);
}

MonsterAttack.prototype.cancel = function () {
      this.x = 2000;
      this.speedX = 0;
      this.img.src = '';
}
