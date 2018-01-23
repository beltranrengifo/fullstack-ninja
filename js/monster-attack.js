function MonsterAttack(board) {
      this.img = new Image();
      this.img.src = 'img/monster-rocket-1.png';
      this.x = 1200;
      this.y = 500;
      this.speedX = 900;
      this.frameWidth = 176;
      this.frameHeight = 80;
      this.ctx = board;
}

MonsterAttack.prototype.render = function (board, delta) {
      if (this.x < 0) {
            massiveAttack = false;
      } else {
            
            this.x -= this.speedX / 1000 * delta;
            board.ctx.drawImage(this.img, this.x, this.y, this.frameWidth, this.frameHeight);
      }
}

MonsterAttack.prototype.explode = function () {
      this.frameWidth = 200;
      this.frameHeight = 214;
      this.y = 400;
      this.img.src = 'img/explosion.png';
      var that = this;
      setTimeout(function(){
            that.frameWidth = 176;
            that.frameHeight = 80;
            that.y = 500;
            that.speedX = 900;
            that.img.src = 'img/monster-rocket-1.png';
            return;
      },200);
      
}

