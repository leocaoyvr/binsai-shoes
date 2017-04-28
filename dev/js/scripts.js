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
  });

    $('.nav-item.has-sub').mouseleave(function() {
    $(this).find('.nav-sub').removeClass('active');
    $(this).parents('.nav').removeClass('js-show-submenu');
    $(this).parents('.nav').find('.nav-sub-bg').removeClass('fadeInDown');
  });

  $('.nav-item.has-sub').click(function() {
    $(this).find('.nav-sub').toggleClass('active');
    $(this).parents('.nav').toggleClass('js-show-submenu');
    $(this).parents('.nav').find('.nav-sub-bg').toggleClass('fadeInDown');
  });
});
