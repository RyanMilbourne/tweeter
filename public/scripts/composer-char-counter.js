$(document).ready(function() {

  $('.tweet-text').on("input", function(event) {
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

});