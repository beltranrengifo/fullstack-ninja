function Monster(imgSrc,name,board) {
      this.name = name;
      this.health = 100;
      this.x = 1330;
      this.y = 430;
      this.speedX = 10;
      //image properties
      this.img = new Image();
      this.img.src = imgSrc;
      //sprites
      this.shift = 0;
      this.frameWidth = 263;
      this.frameHeight = 200;
      this.totalFrames = 1;
      this.currentFrame = 0;
      
}



Monster.prototype.render = function (board, delta) {
      // this.x += this.speedX / 1000 * delta;
      // board.ctx.drawImage(this.img, this.shift, 0, this.frameWidth, this.frameHeight, this.x, this.y, 295, 479);
      board.ctx.drawImage(this.img, this.x, this.y, this.frameWidth, this.frameHeight);
      // this.shift += (this.frameWidth);
      // if (this.currentFrame == this.totalFrames) {
      //       this.shift = 0;
      //       this.currentFrame = 0;
      // }
      // this.currentFrame++;
}