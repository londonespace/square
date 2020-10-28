document.addEventListener(
  'DOMContentLoaded', () => {
    let menu = new Mmenu("#m-menu", {
      extensions: ['pagedim-black'],

      navbar: {
        title: `<div class="m-menu-logo-wrapper">
          <img src="../img/square-logo-dark.svg" 
          class="m-menu-square-logo-dark" alt="Square"></div>`
      }
    });

    let html = document.querySelector('html')
    let body = document.querySelector('body');

    let observer = new MutationObserver(blockScroll);

    observer.observe(document.querySelector('#m-menu'),
      { attributes: true, attributeFilter: ['class'] });

    function blockScroll() {
      let isBodyBlocked = body.classList.contains('mm-wrapper_blocking');
      let isHtmlBlocked = html.classList.contains('mm-page_blocking');

      if (isBodyBlocked ^ isHtmlBlocked) {
        html.classList.toggle('mm-page_blocking');
      }
    }

  }
);