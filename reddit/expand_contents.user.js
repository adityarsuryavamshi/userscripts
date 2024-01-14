// ==UserScript==
// @name        Expand Contents
// @version     1.0
// @namespace   https://github.com/adityarsuryavamshi
// @description Expand Descriptions and Images
// @icon        https://www.redditstatic.com/desktop2x/img/favicon/android-icon-512x512.png
// @author      Aditya
// @match       https://old.reddit.com/*
// ==/UserScript==

document.querySelectorAll('#siteTable .thing .entry .expando-button').forEach(e => e.click());
document.querySelectorAll('.expando-gate').forEach(e => e.click());