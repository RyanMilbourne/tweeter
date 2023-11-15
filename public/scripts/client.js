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
    })
  };

  const renderTweets = function(tweets) {

    const $tweetsContainer = $('#tweets-container');

    tweets.forEach((element) => {
      const $tweetElement = createTweetElement(element);
      $tweetsContainer.append($tweetElement);
    })

  }

  const createTweetElement = function(element) {
    const name = element.user.name;
    const avatar = element.user.avatars;
    const handle = element.user.handle;
    const message = element.content.text;
    const dateStamp = timeago.format(element.created_at);

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
      ${message}
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

    if (message.length > 140) {
      return alert("Too many characters!");
    }

    if (message === null || message === "") {
      return alert("Please enter some text before submitting a tweet!");
    }
    /*
    mentor version of post ajax request

    $.ajax('/tweets', { method: 'POST', data: $formData })
      .then(function(data, textStatus, jqXHR) {
        console.log("data: ", data);
        console.log("status: ", textStatus);
        console.log("jqXHR", jqXHR);
      });
    */

    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: $formData,
      success: function(response) {
        console.log('Server Response:', response);
      },
      error: function(error) {
        console.error('Error:', error);
      }
    });

  });

  loadTweets()

});