$(document).ready(() => {
      /*=======================
      PANTALLA DE INICIO / SELECCIÓN DE NIVEL
      =======================*/
      /* firstLoad();
      setTimeout(function () {
            levelSelection();
      }, 5000); */
      //show instructions
      $('.how-to-play').click(function () {
            console.log('si');
            $('.how-to-play-content').fadeToggle();
      });
      //mute audio
      $('#audio-control').click(function () {
            $('#audio-control i').toggleClass('fa-volume-off fa-volume-up');
            return theme.paused ? theme.play() : theme.pause();
      });
      levelSelection();
});

function firstLoad() {
      audioIntro.play();
      $('.fullstack').addClass('visible');
      setTimeout(function () {
            $('.ninja').addClass('visible ninja-small');
      }, 2000);
      setTimeout(function () {
            gong.play();
      }, 3100);
}

function levelSelection(a) {
      theme.addEventListener('ended', function () {
            this.currentTime = 0;
            this.play();
      }, false);
      theme.play();
      theme.volume = 0.2;
      $('#first-load').fadeOut(500, function () {
            $('#level-selection').fadeIn(500);
      });
      $('.level-box:not(.disabled)').click(function () {
            $('#level-selection').fadeOut(500, function () {
                  $('#game-board').fadeIn(500);
            });
            var level = $(this).attr('data-level');
            $('body').removeClass().addClass(level);
            assignAssets(level);
      });
};