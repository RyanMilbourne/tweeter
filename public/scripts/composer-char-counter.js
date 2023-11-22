$(document).ready(function() {

  $(document).on("input", '.tweet-text', function(event) {
    const inputLength = this.value.length;
    const startCount = 140;

    const remainingChar = (startCount - inputLength);

    const ancestor = $(this).closest('.create-tweet');

    const counter = ancestor.find('.counter');

    counter.text(remainingChar);

    if (remainingChar < 0) {
      counter.addClass('exceeded-character-limit');
    } else {
      counter.removeClass('exceeded-character-limit');
    }
  });

  // add scroll-to-top button on scroll
  $(window).scroll(function() {
    // check if user is at top of page
    if ($(this).scrollTop() > 100) {
      const $scrollButton = $(`<div class="scroll-to-top">
        <i class="fa-solid fa-caret-up"></i>
      </div>`);

      $('.bottom-nav').append($scrollButton);

      $scrollButton.show();
    } else {
      $('.scroll-to-top').remove(); // hide button if at top of page
    }
  });

  // make scroll-to-top button functional
  $('.bottom-nav').on('click', function() {
    $('html, body').animate({ scrollTop: 0 }, 150);
  });

});