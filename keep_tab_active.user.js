// ==UserScript==
// @name        Keep Tab Active
// @version     1.0
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
// @resource    backgroundAudio https://raw.githubusercontent.com/adityarsuryavamshi/userscripts/master/media/background.mp3
// ==/UserScript==




function enableAudio() {
    const audioContent = GM_getResourceURL("backgroundAudio")
    const audioElem = GM_addElement('audio', {
        id: 'vm-background-playback',
        src: audioContent,
        loop: true
    })

    audioElem.play()
        .catch(e => {
            console.error(`Failed to play audio: ${e}`)
        });

    return audioElem;
}


function disableAudio() {
    document.querySelector('#vm-background-playback').remove();
}


function handleClick() {
    const enabledState = GM_getValue("enabled", false);

    if (!enabledState) {
        // Currently not in enabledState so enable it
        try {
            enableAudio()
        } catch (err) {
            console.error(`Failed to enableAudio: ${err}`)
        }

        GM_setValue("enabled", true);
        GM_unregisterMenuCommand('Enable');
        GM_registerMenuCommand("Disable", handleClick);
    } else {
        // Currently in enabledState so try to disableAudio
        try {
            disableAudio();
        } catch (err) {
            console.error(`Failed to disableAudio : ${err}`)
        }
        GM_setValue("enabled", false);
        GM_unregisterMenuCommand("Disable");
        GM_registerMenuCommand("Enable", handleClick);
    }
}

GM_registerMenuCommand("Enable", handleClick);


// Persist across location.reload()'s
if (GM_getValue("enabled")) {
    enableAudio();
    GM_unregisterMenuCommand('Enable');
    GM_registerMenuCommand("Disable", handleClick);
}