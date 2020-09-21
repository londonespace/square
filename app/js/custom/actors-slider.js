let items = [];

function inizializeActorsSlider() {
  function wrapImgAndInfo() {
    $('#actors-slider .s-actors-image-container img').wrap('<div class="as-image-wrapper"></div>');
    $('#actors-slider .s-actors-information').wrap('<div class="as-info-wrapper"></div>');
  }

  function createItems() {
    for (let i = 0; i < $('#actors-slider .as-image-wrapper').length; i++) {
      let item = [
        $('#actors-slider .as-image-wrapper')[i],
        $('#actors-slider .as-info-wrapper')[i]
      ];

      items.push(item);
    }
  }

  wrapImgAndInfo();
  createItems();

  $(items[0]).addClass('active');

  for (let i = 1; i < items.length; i++) {
    $(items[i]).hide();
  }
}

inizializeActorsSlider();

// $(function () {
//   let duration = 500;

//   $('#actors-slider .nav-prev').on('click', displayPrevElem);

//   function displayPrevElem() {
//     let currentItem = $('#actors-slider .as-item-wrapper.active');
//     let prevItem = currentItem.next();

//     currentItem.removeClass('active').css('display: block');
//     currentItem.fadeOut(duration);

//     setTimeout(() => prevItem.addClass('active').fadeIn(duration), duration);
//   }
// });