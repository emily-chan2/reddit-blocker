// ==UserScript==
// @name         Reddit Blocker
// @version      1.0.1
// @description  Blanks out given subreddits and user profiles.
// @author       michael-chan2
// @match        *://reddit.com/*
// @match        *://new.reddit.com/*
// @match        *://old.reddit.com/*
// @match        *://www.reddit.com/*
// @match        *://www.new.reddit.com/*
// @match        *://www.old.reddit.com/*
// ==/UserScript==

"use strict";

let SUBREDDITS = [
    // Put names of subreddits in quotes delimited by commas
    // Example: 'askreddit', 'funny'
    
];
let USERS = [
    // Put usernames in quotes delimited by commas
    // Example: 'spez', 'gallowboob'
    
];

function getLastPathSegment(url) {
    // Delete query parameters
    const questionMarkIndex = url.indexOf("?");
    if (questionMarkIndex !== -1) {
        url = url.substring(0, questionMarkIndex);
    }

    // Delete hash and anything following
    const hashIndex = url.indexOf("#");
    if (hashIndex !== -1) {
        url = url.substring(0, hashIndex);
    }

    // Delete trailing slashes
    while (url.endsWith('/')) {
        url = url.slice(0, -1);
    }

    // Return the last element
    const parts = url.split('/');
    return parts.pop();
}

function isUserProfile() {
    return window.location.href.includes('reddit.com/user/');
}

function isSubreddit() {
    return window.location.href.includes('reddit.com/r/');
}

const lowercaseAndRemoveWhitespace = (arr) =>
    arr.map(str => str.toLowerCase().replace(/\s/g, ""));

function removeEmptyStrings(arr) {
    return arr.filter(str => str !== "");
}

function replacePage() {
    const redditPageType = isSubreddit() ? `subreddit` : `user profile`;
    let replacementContent=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blocked ${getLastPathSegment(window.location.href)}</title>
  <style>
  body {
    font-family: sans-serif;
    color: #fff; /* Text color for dark mode */
    margin: 50px;
    background-color: #222; /* Background color for dark mode */
  }
  h1 {
    font-size: 2em;
    margin-bottom: 20px;
    color: #f1f1f1; /* Heading color for dark mode */
  }
  a {
    text-decoration: none;
    color: #00bfff; /* Light blue for links */
  }
  a:hover {  /* Change color on hover */
    color: #add8e6; /* Light blue with a slight hover effect */
  }
  </style>
</head>
<body>
  <h1>The ${redditPageType} '${getLastPathSegment(window.location.href)}' has been blocked by Reddit Blocker.</h1>
  <p>Here are some things you can try:</p>
  <ul>
    <li><a href="javascript:history.back()">Go back to the previous page.</a></li>
    <li>Remove the blocked ${redditPageType} from the userscript.</li>
  </ul>
</body>
</html>`;
    document.write(replacementContent);
}

SUBREDDITS = lowercaseAndRemoveWhitespace(SUBREDDITS);
USERS = lowercaseAndRemoveWhitespace(USERS);
SUBREDDITS = removeEmptyStrings(SUBREDDITS);
USERS = removeEmptyStrings(USERS);

if (isSubreddit()) {
    if (SUBREDDITS.includes(getLastPathSegment(window.location.href).toLowerCase())) {
        replacePage();
    }
}
else if (isUserProfile()) {
    if (USERS.includes(getLastPathSegment(window.location.href).toLowerCase())) {
        replacePage();
    }
}
