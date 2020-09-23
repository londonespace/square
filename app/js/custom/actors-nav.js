$(function () {
  let container = $('#actors-slider .s-actors-info-container');
  let button = $('#actors-slider .s-actors-full-screen');

  let cord = {
    get x() {
      return $(container).innerWidth() - $(button).innerWidth();
    },

    get y() {
      return $(container).innerHeight() - $(button).innerHeight();
    }
  }

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
  }

  function maximizeNav() {
    $(container).css('transform', 'translate(0)').removeClass('minimized');
  }
})