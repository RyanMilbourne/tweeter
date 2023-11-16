/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  /* when clicking "write new tweet" operation */
  $('.nav-action').on("click", () => {

    const $tweetForm = $('.new-tweet');

    // condition to prevent stacking
    if (!$tweetForm.has('.create-tweet').length) {
      const $createTweet = $(`
      <div class="new-tweet-container">
      <h2>Compose a Tweet</h2>
      <form method="POST" action="/tweets" class="create-tweet">
      <div class="tweet-cta">
        <label for="tweet-text">What are you humming about?</label>
        <i class="fa-solid fa-circle-chevron-up"></i>
        </div>
        <textarea name="text" id="tweet-text" class="tweet-text"></textarea>
        <div id="alert"></div>
        <div class="new-tweet-footer">
          <button type="submit" class="submit-button">Tweet</button>
          <output name="counter" class="counter" for="tweet-text">140</output>
        </div>
      </form>
      </div>`);

      $tweetForm.hide().append($createTweet);
      $tweetForm.slideDown(500, () => {
        $tweetForm.find('.tweet-text').focus(); // set textArea to "focus"
      });

      $('.fa-solid').on('click', () => {
        $tweetForm.slideToggle(500);
      })
    }

    // Scroll to the new-tweet section
    $('html, body').animate({
      scrollTop: $tweetForm.offset().top - 100
    }, { duration: 500 });
    $tweetForm.find('.tweet-text').focus(); // set textArea to "focus"
  });

  const loadTweets = function() {

    $.get('/tweets', function(response) {
      renderTweets(response);
    })
      .done(function() {
        console.log("Tweets loaded");
      })
      .fail(function(error) {
        console.error("Could not load tweets: ", error);
      });

  };

  /* render tweets from database */
  const renderTweets = function(tweets) {

    const $tweetsContainer = $('#tweets-container');

    tweets.forEach((element) => {
      const $tweetElement = createTweetElement(element);
      $tweetsContainer.prepend($tweetElement);
    });

  };

  /* creating dom-structure for tweets */
  const createTweetElement = function(element) {
    const name = element.user.name;
    const avatar = element.user.avatars;
    const handle = element.user.handle;
    const message = element.content.text;
    const dateStamp = timeago.format(element.created_at);

    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const $tweet = $(`<article class="tweet">
    <header>
      <div class="user-wrapper">
        <img src="${avatar}" class="avatar" alt="avatar">
        ${name}
      </div>
      <div class="handle">
        ${handle}
      </div>
    </header>
    <div class="user-tweet">
      ${escape(message)}
    </div>
    <footer>
      <div class="date-stamp">
        ${dateStamp}
      </div>
      <div class="tweet-options">
        <div class="tweet-toggle">
          <i class="fa-solid fa-flag"></i>
        </div>
        <div class="tweet-toggle">
          <i class="fa-solid fa-retweet"></i>
        </div>
        <div class="tweet-toggle">
          <i class="fa-solid fa-heart"></i>
        </div>
      </div>
    </footer>
  </article>`);

    return $tweet;
  };

  /* submiting new tweet */
  $(document).on("submit", '.create-tweet', function(event) {

    event.preventDefault();

    const $formData = $(this).serialize();
    const message = $('#tweet-text').val();
    const $alert = $('#alert');

    $alert.html('');

    if (message.length > 140) {
      const $alertMessage = $('<p><i>*Character limit exceeded</i></p>');
      return $($alert).append($alertMessage);
    }

    if (message === null || message === "") {
      const $message = $('<p><i>*Please enter some text before submmitting a tweet</i></p>')
      return $($alert).append($message);
    }

    $.post('/tweets', $formData)
      .done(function(response) {
        console.log('Server Response:', response);
        loadTweets();
        $('#tweet-text').val("").focus(); // reset textArea
        $('.counter').val(140); // reset the counter
      })
      .fail(function(error) {
        console.error('Error:', error);
      });

  });

  loadTweets();

});