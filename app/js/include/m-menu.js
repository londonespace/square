document.addEventListener(
  'DOMContentLoaded', () => {
    new Mmenu("#m-menu", {
      extensions: ['theme-black', 'effect-menu-slide', 'pagedim-black'],

      navbar: {
        title: '<img src="../img/square-logo-dark.svg" class="m-menu-square-logo-dark" alt="Салон красоты Митлер">'
      }
    });
  }
);