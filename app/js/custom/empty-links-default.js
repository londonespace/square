$(function () {
  $(document).on('click', (event) => {
    let link = event.target.closest('a');

    if (!link || $(link).attr('href') !== '#') return;

    event.preventDefault();
  });
}) 