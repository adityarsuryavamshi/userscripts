// ==UserScript==
// @name        Keep Tab Active
// @version     1.0.1
// @namespace   https://github.com/adityarsuryavamshi
// @description Keep tab active by playing a background audio. This is usually used in conjunction with other scripts to perform background tasks.
// @icon        https://api.dicebear.com/7.x/adventurer/svg?seed=keep-tab-active
// @author      Aditya
// @match       *://*/*
// @grant       GM_getResourceURL
// @grant       GM_addElement
// @grant       GM_registerMenuCommand
// @grant       GM_unregisterMenuCommand
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @resource    backgroundAudio https://raw.githubusercontent.com/adityarsuryavamshi/userscripts/master/media/background.mp3
// ==/UserScript==


const enabledKey = (location) => `enabled_${location.href}`;


async function enableAudio() {
    const audioContent = GM_getResourceURL("backgroundAudio")
    const audioElem = GM_addElement('audio', {
        id: 'vm-background-playback',
        src: audioContent,
        loop: true
    })

    try {
        await audioElem.play()
        return true;
    } catch (err) {
        console.log(`Failed to enableAudio: ${err}`)
        return false;
    }
}


function disableAudio() {
    document.querySelector('#vm-background-playback').remove();
}

async function handleDisableClick() {
    try {
        disableAudio();
        GM_deleteValue(enabledKey(location));
        GM_unregisterMenuCommand("Disable");
        GM_registerMenuCommand("Enable", handleEnableClick);
    } catch (err) {
        console.error(`Failed to disableAudio : ${err}`)
    }

}

async function handleEnableClick() {
    const audioEnabled = await enableAudio();
    if (audioEnabled) {
        GM_setValue(enabledKey(location), true);
        GM_unregisterMenuCommand('Enable');
        GM_registerMenuCommand('Disable', handleDisableClick)
    } else {
        // Delete key if it exists, if we were not able to enable audio
        GM_deleteValue(enabledKey(location));
    }
}



GM_registerMenuCommand("Enable", handleEnableClick);


(async () => {
    // Persist across location.reload()'s
    if (GM_getValue(enabledKey(location))) {
        handleEnableClick();
    }
})()
