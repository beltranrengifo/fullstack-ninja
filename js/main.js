$(document).ready(() => {
      /*=======================
      PANTALLA DE INICIO / SELECCIÓN DE NIVEL
      =======================*/
      firstLoad();
      setTimeout(function () {
            levelSelection();
      }, 5000);
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
      // theme.play();
      theme.volume = 0.6;
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