// ==UserScript==
// @name        Clear Images
// @version     1.0
// @namespace   https://github.com/adityarsuryavamshi
// @description Strip out unnecessary branding from Reddit Media Pages
// @icon        https://www.redditstatic.com/desktop2x/img/favicon/android-icon-512x512.png
// @author      Aditya
// @match       https://www.reddit.com/media*
// ==/UserScript==


const pageURL = new URL(location.href);
const pageSearchParams = new URLSearchParams(pageURL.search);
const originalImgSrc = pageSearchParams.get('url');


const htmlPage = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reddit - ${originalImgSrc} </title>
    <style>
        body {
            margin: 0;
            height: 100vh;
            display: grid;
            place-items: center;
            background-color: #0e0e0e
        }

        img.zoomed-in {
            height: 100%;
            max-height: unset;
            cursor: zoom-out;
        }

        img {
            display: block;
            margin: auto;
            max-width: 100%;
            max-height: 100vh;
            cursor: zoom-in;
        }
    </style>
</head>

<body>
    <img src="${originalImgSrc}">
</body>

</html>
`

document.querySelector('html').innerHTML = htmlPage;
const imgElement = document.querySelector('img');

imgElement.addEventListener('click', e => {
    if (screen.width > imgElement.width) {
        imgElement.classList.toggle('zoomed-in');
    }
})