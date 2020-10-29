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

  let isNavControlFormed = true;
  reviseNavControl();

  $(button).addClass('compress');

  $(button).on('click', onClick);

  $(window).on('resize', reviseNavControl);

  function onClick() {
    if ($(container).hasClass('minimized')) {
      maximizeNav();
    } else {
      minimizeNav();
    }
  }

  function minimizeNav() {
    $(container).addClass('minimized');
    $(button).removeClass('compress').addClass('expand');
  }

  function maximizeNav() {
    $(container).removeClass('minimized');
    $(button).removeClass('expand').addClass('compress');
  }

  function reviseNavControl() {
    if ($(window).width() <= breakpoints.md && isNavControlFormed) {
      disolveNavControl();
      isNavControlFormed = false;
    }

    if ($(window).width() > breakpoints.md && !isNavControlFormed) {
      formNavControl();
      isNavControlFormed = true;
    }
  }

  function disolveNavControl() {
    $('#actors-slider .s-actors-nav-control').children().appendTo($(container));
    $('#actors-slider .s-actors-nav-control').remove();
  }

  function formNavControl() {
    $('<div class="s-actors-nav-control"></div>').appendTo($(container));
    let navControlElems = ['btn-prev', 'btn-next', 'counter'];

    for (let elem of navControlElems) {
      $(`.s-actors-nav-${elem}`).appendTo($('.s-actors-nav-control'));
    }
  }
})