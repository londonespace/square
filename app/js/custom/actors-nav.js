$(function () {
  let container = $('#actors-slider .s-actors-nav');
  let button = $('#actors-slider .s-actors-popup-btn');

  let cord = {
    get x() {
      return $(container).innerWidth() - $(button).innerWidth();
    },

    get y() {
      return $(container).innerHeight() - $(button).innerHeight();
    }
  }

  $(button).addClass('compress');
  $(button).on('click', onClick);

  function onClick() {
    if ($(container).hasClass('minimized')) {
      maximizeNav();
    } else {
      minimizeNav();
    }
  }

  function minimizeNav() {
    $(container).css('transform', `translate(-${cord.x}px, ${cord.y}px)`)
      .addClass('minimized');
    $(button).removeClass('compress').addClass('expand');
  }

  function maximizeNav() {
    $(container).css('transform', 'translate(0)').removeClass('minimized');
    $(button).removeClass('expand').addClass('compress');
  }
})