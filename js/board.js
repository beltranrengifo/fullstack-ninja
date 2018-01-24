function Board(img) {
      this.img = new Image();
      this.img.src = img;
      // this.img.src = 'img/transparent-canvas.png';
      this.canvas = document.getElementById('canvas-game');
      this.canvas.height = 720;
      this.canvas.width = 1600;
      this.ctx = document.getElementById('canvas-game').getContext('2d');
      this.scale = 1600 / 720;
      this.ctx.mozImageSmoothingEnabled = true;
      this.ctx.webkitImageSmoothingEnabled = true;
      this.ctx.msImageSmoothingEnabled = true;
      this.ctx.imageSmoothingEnabled = true;
}

Board.prototype.render = function (board, ninja, delta, monster, monsterAttack) {
      this.ctx.drawImage(this.img, 0, 0, 1600, 720);
      
}

Board.prototype.clean = function () {
      this.ctx.clearRect(0, 0, 1600, 720);
}