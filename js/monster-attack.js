function MonsterAttack (board) {
      this.img = new Image();
      this.img.src = 'img/monster-rocket-1.png';
      this.x = 1200;
      this.y = 500;
      this.speedX = 900;
      this.frameWidth = 176;
      this.frameHeight = 80;
      this.ctx = board;
}

MonsterAttack.prototype.render = function (board,delta) {
      if (this.x < 0) {
            massiveAttack = false;
      } else {
            this.x -= this.speedX / 1000 * delta;     
            console.log('bola: '+Math.floor(this.x) + 'ninja: '+Math.floor(ninja.x));
            if ( ( Math.floor(this.x) < (Math.floor(ninja.x) + 3) ) &&  Math.floor(this.x) > (Math.floor(ninja.x) - 3) ) {
                  console.log('tocado');
                 // return;
            }
      }

      
      board.ctx.drawImage(this.img, this.x, this.y, this.frameWidth, this.frameHeight);
}