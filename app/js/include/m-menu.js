document.addEventListener(
  'DOMContentLoaded', () => {
    wrapContent();

    new Mmenu("#m-menu", {
      extensions: ['pagedim-black'],

      navbar: {
        title: `<div class="m-menu-logo-wrapper">
          <img src="../img/square-logo-dark.svg" 
          class="m-menu-square-logo-dark" alt="Square"></div>`
      }
    });

    let observer = new MutationObserver(blockScroll);

    observer.observe(document.querySelector('#m-menu'),
      { attributes: true, attributeFilter: ['class'] });

    function blockScroll() {
      let isBodyBlocked = $('body').hasClass('mm-wrapper_blocking');
      let isHtmlBlocked = $('html').hasClass('mm-page_blocking');

      if (isBodyBlocked ^ isHtmlBlocked) {
        $('html').toggleClass('mm-page_blocking');
      }
    }

    function wrapContent() {
      let tags = ['header', 'main', 'footer'];
      let contentParts = [];

      for (let tag of tags) {
        if (!$(tag)) continue;
        contentParts.push($(tag));
      }

      contentParts.forEach(part => part.wrap(
        `<div id="${part.prop('tagName').toLowerCase()}-wrapper"></div>`)
      );
    }

  }
);