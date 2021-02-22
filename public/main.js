// need logic for max tweet length and DOM manipulation - put these in separate files - one for dom.js and one for logic.js

// Use highlightWithinTextarea module to highlight characters
// which exceed Twitter's 280 post limit. 

import { showCharacterCountWatcher, hideCharacterCountWatcher, showProgressBar, deleteProgressBar, hideProgressBar, hideModalProgressBar, showModalCharacterCountWatcher, hideModalCharacterCountWatcher, deleteModalProgressBar, showModalProgressBar } from './dom.js';
import { mainTweetBtn, modalTweetBtn } from './eventListeners.js';

function characterLimit(characters, id, div) {
    if (characters.length > 280) {
        $(id).highlightWithinTextarea({
            highlight: [280, characters.length]
        });

        if (div === "main") {
            hideProgressBar();
            showCharacterCountWatcher(characters);
            mainTweetBtn.className = "flex text-white py-2 px-4 bg-blue-400 cursor-default opacity-80 rounded-full focus:outline-none";
        }

        else if (div === "modal") {
            hideModalProgressBar();
            showModalCharacterCountWatcher(characters);
            modalTweetBtn.className = "flex text-white py-2 px-4 bg-blue-400 cursor-default opacity-80 rounded-full focus:outline-none";
        }

    }

    else {
        if (div === "main") {
            hideCharacterCountWatcher();
            deleteProgressBar(characters);
            showProgressBar(characters);
        }

        else if (div === "modal") {
            hideModalCharacterCountWatcher();
            deleteModalProgressBar(characters);
            showModalProgressBar(characters);
        }

    }
}

export { characterLimit };