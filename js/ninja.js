function Ninja() {
      this.name = 'Fullstack Ninja';
      this.img = new Image();
      this.img.src = 'img/ninja1.png';
      this.x = 30;
      this.y = 285;
      this.vx = 0;
      this.vy = 0;
      this.scale = 180 / 340;
      this.speed = 10;
      this.gravity = 0.1;
}

Ninja.prototype.render = function (board) {
      board.ctx.drawImage(this.img, this.x, this.y, 180, 340);
      board.ctx.save();
}

Ninja.prototype.move = function (key) {
      switch (key) {
            case 39:
                  this.x += this.speed;
                  //boundaries
                  if (this.x > 1420) {
                        this.x = 1380;
                  }
                  break;
            case 37:
                  this.x -= this.speed;
                  //boundaries
                  if (this.x < 0) {
                        this.x = 40;
                  }
                  break;
      }
}

Ninja.prototype.jump = function (key) {
      console.log(this.y);
      switch (key) {
            case 38:
                  this.vy = (this.gravity - this.speed);
                  if (this.y <= 285) {
                        this.y += this.vy;      
                  }
                  
                  
                  break;
      }
}