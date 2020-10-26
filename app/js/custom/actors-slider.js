$(function () {
  let duration = 500;
  let isBlock = false;

  let imageContainer = $('.s-actors-image-container');

  let buttons = {
    prev: $('#actors-slider .s-actors-nav-btn-prev'),
    next: $('#actors-slider .s-actors-nav-btn-next')
  };

  let counter = $('.s-actors-nav-counter');

  let images = $('#actors-slider .s-actors-image');
  let info = $('#actors-slider .s-actors-info');
  let items = [];

  inizializeSlider();
  manageContainerHeight();

  $(window).on('resize', manageContainerHeight);

  buttons.prev.on('click', () => displayNewElem('prev'));
  buttons.next.on('click', () => displayNewElem('next'));

  function inizializeSlider() {
    createItems();
    $(items[0]).addClass('active');

    for (let i = 1; i < items.length; i++) {
      $(items[i]).hide();
    }

    counter.text(() => `${1}/${items.length}`);

    function createItems() {
      for (let i = 0; i < images.length; i++) {
        let item = [images[i], info[i]];
        item.index = i;
        items.push(item);
      }
    }
  }


  async function displayNewElem(direction) {
    if (isBlock) return;
    isBlock = true;

    let currentItem = items.find((item) => $(item).hasClass('active'));
    let newItem = selectNewItem(direction);

    updateCounter();

    await $(currentItem).removeClass('active').fadeOut(duration).promise();
    await $(newItem).addClass('active').fadeIn(duration).promise();

    isBlock = false;

    function selectNewItem(direction) {
      let newItem;

      if (direction === 'prev') newItem = items[currentItem.index - 1];
      if (direction === 'next') newItem = items[currentItem.index + 1];

      if (direction === 'prev' && currentItem.index === 0) {
        newItem = items[items.length - 1];
      }

      if (direction === 'next' && currentItem.index === items.length - 1) {
        newItem = items[0];
      }

      return newItem;
    }

    function updateCounter() {
      let newVal = newItem.index + 1;
      counter.text(() => `${newVal}/${items.length}`);
    }
  }

  function manageContainerHeight() {
    imageContainer.height(imageContainer.width());
    $('.s-actors-image').width(imageContainer.width());
    $('.s-actors-image').height(imageContainer.width());
  }
});