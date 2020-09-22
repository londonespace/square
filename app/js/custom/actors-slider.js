$(function () {
  let items = [];
  let duration = 500;
  let isBlock = false;

  inizializeSlider();

  $('#actors-slider .nav-btn-prev').on('click', () => displayNewElem('prev'));
  $('#actors-slider .nav-btn-next').on('click', () => displayNewElem('next'));

  function inizializeSlider() {
    wrapImgAndInfo();
    createItems();

    $(items[0]).addClass('active');

    for (let i = 1; i < items.length; i++) {
      $(items[i]).hide();
    }

    function wrapImgAndInfo() {
      $('#actors-slider .s-actors-portrait').wrap('<div class="as-image-wrapper"></div>');
      $('#actors-slider .s-actors-information').wrap('<div class="as-info-wrapper"></div>');
      $('#actors-slider .as-info-wrapper').wrapAll('<div class="as-info"></div>');
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
  }

  async function displayNewElem(direction) {
    if (isBlock) return;
    isBlock = true;

    let currentItem = items.find((item) => $(item).hasClass('active'));
    let newItem = selectNewItem(direction);

    await $(currentItem).removeClass('active').fadeOut(duration).promise();
    await $(newItem).addClass('active').fadeIn(duration).promise();

    isBlock = false;

    function selectNewItem(direction) {
      let newItem;

      if (direction === 'prev') newItem = $(currentItem).prev();
      if (direction === 'next') newItem = $(currentItem).next();

      if (!newItem.length && direction === 'prev') newItem = items[items.length - 1];
      if (!newItem.length && direction === 'next') newItem = items[0];

      return newItem;
    }
  }
});