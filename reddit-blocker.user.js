// ==UserScript==
// @name         Reddit Blocker
// @version      1.0.2
// @description  Blocks access to given subreddits and user profiles.
// @author       emily-chan2
// @match        *://reddit.com/r/*
// @match        *://reddit.com/user/*
// @match        *://*.reddit.com/r/*
// @match        *://*.reddit.com/user/*
// @match        *://www.reddit.com/r/*
// @match        *://www.reddit.com/user/*
// @match        *://www.*.reddit.com/r/*
// @match        *://www.*.reddit.com/user/*
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

function getName() {
    // If a subreddit, return subreddit name
    // If a user profile, return user name
    // Else return empty string
    let name = '';
    const url = window.location.href;
    if (isSubreddit()) {
        // Use regular expression to match the subreddit name pattern
        const regex = /https?:\/\/([^.]+)\.reddit\.com\/r\/([^\/]+)(?:\/.*)?/;
        const match = url.match(regex);
        if (match) {
            name = match[2];
        }
    }
    else if (isUserProfile()) {
        const regex = /https?:\/\/([^.]+)\.reddit\.com\/user\/([^\/]+)(?:\/.*)?/;
        const match = url.match(regex);
        if (match) {
            name = match[2];
        }
    }
    return name;
}

function isSubreddit() {
    return window.location.href.includes('reddit.com/r/');
}

function isUserProfile() {
    return window.location.href.includes('reddit.com/user/');
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
  <title>Blocked ${getName(window.location.href)}</title>
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
  <h1>The ${redditPageType} '${getName(window.location.href)}' has been blocked by Reddit Blocker.</h1>
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
    if (SUBREDDITS.includes(getName(window.location.href).toLowerCase())) {
        replacePage();
    }
}
else if (isUserProfile()) {
    if (USERS.includes(getName(window.location.href).toLowerCase())) {
        replacePage();
    }
}
