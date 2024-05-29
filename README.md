# reddit-blocker

## Description
This userscript allows you to block whatever subreddits and/or user profiles you choose. It won't stop those subreddits from coming up on your feed. Nor will it stop you from seeing comments or posts made by those users. It just blocks the content if you navigate directly to those pages.

I wrote this to stop myself from doomscrolling certain subreddits. I decided to add the ability to block users as well since the coding logic was so similar.

If you navigate to a listed page, its content will be replaced with a message like this:

![Example of blocked page](img/browserScreenshot.png?raw=true)

## Usage
Simply enter the subreddits and users you want to block in their appropriate arrays and save the file.

![Example of how to edit arrays](img/exampleArray.png?raw=true)

As with any userscript that relies on user editing, it's important that you turn off auto-updating of the script. Otherwise your custom arrays will be overwritten if I decide to update this script in the future.
