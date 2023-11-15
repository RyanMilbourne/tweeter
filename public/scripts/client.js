/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: function(response) {
        renderTweets(response);
      },
      error: function(error) {
        console.error("Could not load tweets: ", error);
      }
    });
  };

  const renderTweets = function(tweets) {

    const $tweetsContainer = $('#tweets-container');

    tweets.forEach((element) => {
      const $tweetElement = createTweetElement(element);
      $tweetsContainer.prepend($tweetElement);
    });

  };

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

  $('.create-tweet').on("submit", function(event) {

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

    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: $formData,
      success: function(response) {
        console.log('Server Response:', response);
        window.location.reload();
      },
      error: function(error) {
        console.error('Error:', error);
      }
    });

  });

  loadTweets();

});