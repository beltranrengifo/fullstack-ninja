function Ninja() {
      this.name = 'Fullstack Ninja';
      this.img = new Image();
      this.img.src = 'img/ninja1.png';
      this.x = 30;
      this.y = 285;
      this.vx = 0;
      this.vy = 0;
      this.scale = 180 / 340;
      this.speed = 0;
      this.maxSpeed = 350;
}

Ninja.prototype.render = function (board, delta) {
      this.x += this.speed / 1000 * delta;
      board.ctx.drawImage(this.img, this.x, this.y, 180, 340);
}

Ninja.prototype.move = function (direction) {
      if (this.x < 0) {
            this.x = 0;
      } else if (this.x > 1420) {
            this.x = 1420;
      } else {
            this.speed = this.maxSpeed * direction;
      }
      
      // switch (key) {
      //       case 39:
      //             this.x += this.speed;
      //             //boundaries
      //             if (this.x > 1420) {
      //                   this.x = 1380;
      //             }
      //             break;
      //       case 37:
      //             this.x -= this.speed;
      //             //boundaries
      //             if (this.x < 0) {
      //                   this.x = 40;
      //             }
      //             break;
      // }
}

Ninja.prototype.stop = function () {
      this.speed = 0;
}

/* Ninja.prototype.jump = function (key) {
      console.log(this.y);
      switch (key) {
            case 38:
                  this.vy = (this.gravity - this.speed);
                  if (this.y <= 285) {
                        this.y += this.vy;      
                  }
                  
                  
                  break;
      }
} */