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
      this.thumb = monsterOptions.thumb;
}

Monster.prototype.render = function (board, delta) {
      board.ctx.drawImage(this.img, this.shift, 0, this.frameWidth, this.frameHeight, this.x, this.y, this.frameWidth, this.frameHeight);
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
      thatMonster = this;
      this.img.src = 'img/sprites/monster-doom-attack-xs.png'; 
      setTimeout(function(){
            thatMonster.img.src = 'img/sprites/monster-doom-idle-xs.png';
      },1000);
}

Monster.prototype.updateScore = function () {
      var htmlElement = $('.monster-health span');
      htmlElement.css('width',this.health+'%');
}

Monster.prototype.updateThumb = function(){
      $('.monster-counters img').attr('src',this.thumb);
}