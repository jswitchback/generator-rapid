(function ($, Drupal, window, document, undefined) {

  jQuery(document).ready(function($){

    $(window).scroll(function() {
      if($(this).scrollTop() > 300) {
        $('#to-top').fadeIn();
      } else {
        $('#to-top').fadeOut();
      }
    });

    $('#to-top').click(function() {
      $('body,html').animate({scrollTop:0},500);
      return false;
    });

  });

} (jQuery));