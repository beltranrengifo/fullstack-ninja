function MonsterAttack (board) {
      this.img = new Image();
      this.img.src = 'img/monster-rocket-1.png';
      this.x = 130;
      this.y = 300;
      this.frameWidth = 538;
      this.frameHeight = 244;
      this.ctx = board;
}

MonsterAttack.prototype.render = function (board) {
      
      // board.ctx.drawImage(this.img, this.shift, 0, this.frameWidth, this.frameHeight, this.x, this.y, this.frameWidth, this.frameHeight);
      board.ctx.drawImage(this.img, this.x, this.y, this.frameWidth, this.frameHeight);
      console.log('joi');
      /* this.shift += (this.frameWidth);
      if (this.currentFrame == this.totalFrames) {
            this.shift = 0;
            this.currentFrame = 0;
      } */
      //this.currentFrame++;
      // monsterAttack.render();
}