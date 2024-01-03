// ==UserScript==
// @name        Redirect to Old Reddit
// @version     1.0
// @namespace   https://github.com/adityarsuryavamshi
// @description Force reddit to take old reddit interface
// @icon        https://www.redditstatic.com/desktop2x/img/favicon/android-icon-512x512.png
// @author      Aditya
// @match       https://www.reddit.com/r/*
// @run-at      document-start
// ==/UserScript==

location.href = location.href.replace('www', 'old');