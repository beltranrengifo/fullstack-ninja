function Monster(monsterOptions, board) {
      this.name = monsterOptions.name;
      this.health = 100;
      this.x = monsterOptions.pos.x;
      this.y = monsterOptions.pos.y;
      this.speedX = 10;
      //image properties
      this.img = new Image();
      this.img.src = monsterOptions.src;
      //sprites
      this.shift = 0;
      this.frameWidth = 291.58;
      this.frameHeight = 292;
      this.totalFrames = 24;
      this.currentFrame = 0;
      this.level = monsterOptions.level;
}

Monster.prototype.render = function (board, delta) {
      board.ctx.drawImage(this.img, this.shift, 0, this.frameWidth, this.frameHeight, this.x, this.y, this.frameWidth, this.frameHeight);
      // board.ctx.drawImage(this.img, this.x, this.y, this.frameWidth, this.frameHeight);
      this.shift += (this.frameWidth);
      if (this.currentFrame == this.totalFrames) {
            this.shift = 0;
            this.currentFrame = 0;
      }
      this.currentFrame++;
}

Monster.prototype.attack = function() {
      massiveAttack = true; 
      if (monsterAttack.x < 0) {
            monsterAttack.x = 1200;
      }    
}
