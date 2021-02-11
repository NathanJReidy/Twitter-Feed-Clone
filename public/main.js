// need logic for max tweet length and DOM manipulation - put these in separate files - one for dom.js and one for logic.js

// Use highlightWithinTextarea module to highlight characters
// which exceed Twitter's 280 post limit. 

function characterLimit(characters) {
    if (characters.length > 280) {
        $('#resize-ta').highlightWithinTextarea({
            highlight: [280, characters.length]
        });
    }
}

export { characterLimit };