// ==UserScript==
// @name        Expand Macros
// @version     1.0
// @namespace   https://github.com/adityarsuryavamshi
// @description Expand Macros. Macros can be configured in script storage
// @icon        https://api.dicebear.com/7.x/adventurer/svg?seed=expand-macros
// @author      Aditya
// @match       *://*/*
// @grant       GM_getValue
// ==/UserScript==


// Only setting e.target.value should work in most cases, but unfortunately we have things like react where the DOM content can be changed
// but the React state won't be updated, to do this we have to use this trick. Thanks to https://stackoverflow.com/a/66663506
function setNativeValue(element, value) {
    const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
    const prototype = Object.getPrototypeOf(element);
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;

    if (valueSetter && valueSetter !== prototypeValueSetter) {
        prototypeValueSetter.call(element, value);
    } else {
        valueSetter.call(element, value);
    }
}


function textAreaInputChangeHandler(e) {
    const valueToSet = GM_getValue(e.target.value, e.target.value);
    try {
        setNativeValue(e.target, valueToSet);
    } catch (err) {
        e.target.value = valueToSet;
    }

}


function addListeners() {
    const textAreas = document.querySelectorAll('textarea');
    if (textAreas.length == 0) {
        return;
    }
    for (const ta of textAreas) {
        // We kinda don't care if there are multiple registrations of this (such as on mutation change events),
        // since the target value gets modified on the first change itself and subsequent calls to the same function wouldn't have any effect
        ta.addEventListener('input', textAreaInputChangeHandler);
    }
}


addListeners();

function mutationChangeHandler() {
    addListeners();
    observer.disconnect();
}

// Mutation Observer Pattern based on https://stackoverflow.com/a/76354874, for if the contents are added post DOM load
const observer = new MutationObserver(mutationChangeHandler);

observer.observe(document.body, { childList: true, subtree: true });