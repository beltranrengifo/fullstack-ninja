$(document).ready(() => {
      /*=======================
      PANTALLA DE INICIO / SELECCIÓN DE NIVEL
      =======================*/
      //NOTE: comentado para desarrollo
     /*  firstLoad();
      setTimeout(function () {
            levelSelection();
      }, 5000); */
      // CLOSE NOTE

     

      //NOTE: añadido SOLO para desarrollo
      levelSelection();
      // CLOSE NOTE      
});

function firstLoad() {
      $('.fullstack').addClass('visible');
      setTimeout(function () {
            $('.ninja').addClass('visible ninja-small');
      }, 2000);
}

function levelSelection() {
      //NOTE: comentado para desarrollo
      $('#first-load').fadeOut(500, function () {
            $('#level-selection').fadeIn(500);
      });
      // CLOSE NOTE
      $('.level-box:not(.disabled)').click(function () {
            $('#level-selection').fadeOut(500, function () {
                  $('#game-board').fadeIn(500);
            });
            var level = $(this).attr('data-level');
            $('body').removeClass().addClass(level);
            assignAssets(level);
      });
};

