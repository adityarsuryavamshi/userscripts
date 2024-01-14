// ==UserScript==
// @name        Scroll to End
// @version     1.0
// @namespace   https://github.com/adityarsuryavamshi
// @description Scroll to End of a Non-Infinitely Loading Page
// @icon        https://api.dicebear.com/7.x/adventurer/svg?seed=scroll-to-end
// @author      Aditya
// @match       *://*/*
// ==/UserScript==


let lastScrollHeight;
let retryCount = 0;


function scrollToEnd(callBack = () => { }) {
    const currentScrollHeight = document.body.scrollHeight;
    if (currentScrollHeight === lastScrollHeight) {
        retryCount += 1
    } else {
        retryCount = 0
    }

    if (retryCount < 10) {
        scroll(0, currentScrollHeight);
        lastScrollHeight = currentScrollHeight;
        setTimeout(scrollToEnd, 300);
    } else {
        callBack();
    }

}

scrollToEnd();