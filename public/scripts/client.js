/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Ryan",
        "avatars": "https://avatars.githubusercontent.com/u/73450753?v=4",
        "handle": "RyanMilbourne"
      },
      "content": {
        "text": "I can see the back of my head"
      },
      "created_at": 1461113959088
    }
  ]

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

    const date = new Date(element.created_at);
    const dateStamp = date.toDateString();

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

  renderTweets(data);

});