/*
/* Base Javascript
/* ========================= */

// Homepage Hero Slider
$(function() {
  $("#js-indexSlider").slick({
    dots: true,
    infinite: true,
    autoplay: true,
    arrows: false
  });
});

// Nav Sub Menu
$(function() {
  $('.nav-item.has-sub').mouseenter(function() {
    $(this).find('.nav-sub').addClass('active');
    $(this).parents('.nav').addClass('js-show-submenu');
    $(this).parents('.nav').find('.nav-sub-bg').addClass('fadeInDown');
    $(this).find('.nav-sub').addClass('fadeInDown');
  });

    $('.nav-item.has-sub').mouseleave(function() {
    $(this).find('.nav-sub').removeClass('active');
    $(this).parents('.nav').removeClass('js-show-submenu');
    $(this).parents('.nav').find('.nav-sub-bg').removeClass('fadeInDown');
    $(this).find('.nav-sub').removeClass('fadeInDown');
  });

  $('.nav-item.has-sub').click(function() {
    $(this).find('.nav-sub').toggleClass('active');
    $(this).parents('.nav').toggleClass('js-show-submenu');
    $(this).parents('.nav').find('.nav-sub-bg').toggleClass('fadeInDown');
    $(this).find('.nav-sub').toggleClass('fadeInDown');
  });
});

// scroll to anchor smoothly
$(function() {
$('a[href*="#"]')
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 500, function() {
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) {
            return false;
          } else {
            $target.attr('tabindex','-1');
            $target.focus();
          };
        });
      }
    }
  });
});