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

  $(button).addClass('in-nav');
  $(button).on('click', onClick);

  function onClick() {
    if ($(container).hasClass('minimized')) {
      maximizeNav();
    } else {
      minimizeNav();
    }
  }

  async function minimizeNav() {
    await $(button).appendTo('#actors-slider')
      .css({ 'left': cord.x, 'bottom': cord.y })
      .toggleClass('in-nav out-nav').promise();

    $(button).css({ 'left': 0, 'bottom': 0 })
      .on('transitionend', onTransitionEnd);

    $(container).addClass('minimized');

    function onTransitionEnd() {
      $(button).css({ 'left': '', 'bottom': '' })
        .off('transitionend', onTransitionEnd);
    }
  }

  function maximizeNav() {
    $(button).css({ 'left': cord.x, 'bottom': cord.y })
      .on('transitionend', onTransitionEnd);

    $(container).removeClass('minimized');

    function onTransitionEnd() {
      $(button).appendTo(container)
        .toggleClass('in-nav out-nav')
        .css({ 'left': '', 'bottom': '' })
        .off('transitionend', onTransitionEnd);
    }
  }
})