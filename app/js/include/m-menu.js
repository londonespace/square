document.addEventListener(
  'DOMContentLoaded', () => {
    new Mmenu("#m-menu", {
      extensions: ['pagedim-black'],

      navbar: {
        title: `<div class="m-menu-logo-wrapper">
          <img src="../img/square-logo-dark.svg" 
          class="m-menu-square-logo-dark" alt="Салон красоты Митлер"></div>`
      }
    });
  }
);