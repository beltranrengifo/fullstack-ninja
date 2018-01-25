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
      $('.fullstack').addClass('visible');
      setTimeout(function () {
            $('.ninja').addClass('visible ninja-small');
      }, 2000);
}

function levelSelection(a) {
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

