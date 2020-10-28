$(function () {
  $('.s-actors-social-buttons').on('click', onClick);

  function onClick(event) {
    let link = event.target.closest('.s-actors-social-button');
    if (!link) return;

    if ($(link).hasClass('s-actors-like')) {
      $(link).find('.fa').toggleClass('fa-heart fa-heart-o active')
    }

    if ($(link).hasClass('s-actors-share')) {
      navigator.clipboard.writeText('https://github.com/londonespace');
      displayCopyMessage();
    }
  }

  function displayCopyMessage() {
    let message = $('.s-actors-share-message');

    if (message.length > 0) {
      message.remove();
    }

    let newMessage = $(document.createElement('div'));
    newMessage.addClass('s-actors-share-message');
    newMessage.append('<span>Link copied!</span>')

    newMessage.appendTo($('.s-actors-social-buttons'));
    newMessage.hide().fadeIn(250).delay(1000).fadeOut(250);
  }
});