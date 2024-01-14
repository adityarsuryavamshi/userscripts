// ==UserScript==
// @name        Get Product List
// @version     1.1
// @namespace   https://github.com/adityarsuryavamshi
// @description Copy products from product hunt time travel page into clipboard
// @icon        https://ph-static.imgix.net/ph-favicon-coral.ico
// @author      Aditya
// @match       https://www.producthunt.com/time-travel/*
// @grant       GM_registerMenuCommand
// @grant       GM_setClipboard
// @grant       GM_notification
// ==/UserScript==


function getProductList() {

    const productList = Array.from(document.querySelectorAll('#__next > div.layoutContainer > div > div > div:nth-child(3) > div'));

    const allProducts = []

    for (const product of productList) {

        // Logo
        let productImgLogoURL;
        try {
            const productImgLogo = new URL(product.querySelector('li a img').src);
            productImgLogoURL = productImgLogo.origin + productImgLogo.pathname;
        } catch (err) { }

        // Name and Description
        const productName = product.querySelector('li > div > div:nth-of-type(1)').textContent;
        const productDescription = product.querySelector('li > div > div:nth-of-type(2)').textContent;

        // Comments
        const commentCount = parseInt(product.querySelector('li > div > div:nth-of-type(3) > a').textContent.replaceAll(',', ''))

        // Tags
        const tags = Array.from(product.querySelectorAll('li > div > div:nth-of-type(3) > div a[href*=topic]'))
            .map(e => e.textContent)
            .map(e => e.replaceAll('#', ''));

        // Votes
        const voteCount = parseInt(product.querySelector('li > div:nth-of-type(2)').textContent.replaceAll(',', ''));

        const productItem = {
            productName: productName,
            productDescription: productDescription,
            productLogo: productImgLogoURL,
            tags: tags,
            commentCount: commentCount,
            voteCount: voteCount,
        }
        allProducts.push(productItem)
    }

    return allProducts;
}

function onClick() {
    const productList = getProductList();
    GM_setClipboard(JSON.stringify(productList));
    GM_notification({ text: "Copied Product List onto Clipboard!" })
}


let lastScrollHeight;
let retryCount = 0;


function scrollToEnd(callBack) {
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

GM_registerMenuCommand('Get Products', onClick);
scrollToEnd(onclick);