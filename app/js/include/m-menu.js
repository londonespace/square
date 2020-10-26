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

    let menuParentElem = document.querySelector('#m-menu');
    let hamburger = document.querySelector('.hamburger');

    let observer = new MutationObserver(toggleHamburger);

    observer.observe(document.querySelector('#m-menu'),
      { attributes: true, attributeFilter: ['class'] });

    function toggleHamburger() {
      console.log(1);
      let isHambActive = hamburger.classList.contains('is-active');
      let isMenuActive = menuParentElem.classList.contains('mm-menu_opened');

      if (!isMenuActive && isHambActive) {
        hamburger.classList.remove('is-active');
      }

      if (isMenuActive && !isHambActive) {
        setTimeout(
          () => hamburger.classList.add('is-active'),
          menu.conf.transitionDuration
        );
      }
    }
  }
);