// ==UserScript==
// @name        Clear Clipboard On Paste
// @version     1.0
// @namespace   https://github.com/adityarsuryavamshi
// @description Clear Clipboard on Paste, essentially allowing a single paste per entry. Useful to prevent accidentally pasting sensitive data
// @icon        https://api.dicebear.com/7.x/adventurer/svg?seed=clear-clipboard-on-paste
// @author      Aditya
// @match       *://*/*
// @grant       GM_setClipboard
// ==/UserScript==



// Trick from https://stackoverflow.com/a/31725405, there's also this https://stackoverflow.com/a/7733032 which could be the right way to do it (debatable)
document.querySelector('body').addEventListener('paste', (e) => {
    setTimeout(() => {
        GM_setClipboard("", "text/plain");
    }, 0)
})
