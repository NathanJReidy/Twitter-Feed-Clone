// need logic for max tweet length and DOM manipulation - put these in separate files - one for dom.js and one for logic.js

// let exampleString = "Since gold is so highly negatively correlated to real rates, the gold price is now a barometer of the solvency of the United States government. The higher real rates go, the lower gold goes, and the closer the US Gov is to declaring insolvency. The US Gov is so heavily indebted that it cannot afford real rates to rise significantly. It is obvious that they will be forced to implement yield curve control, thereby pinning gov. bond rates below the inflation rate, to eat away at their debt. This will result in negative real yields for several years, if not decades, causing the greatest bull market in gold the world has ever seen.";
// console.log(exampleString.slice(280, exampleString.length));
// let highlightedString = exampleString.slice(280, exampleString.length);

// Need to manipulate the DOM to add a span class within the .value 
// of the tweet if characters.length > 280
// let exampleVar = '';

function characterLimit(characters) {
    if (characters.length > 280) {
        // let redWord = characters.slice(280, characters.length);
        // exampleVar = redWord;
        // console.log(`exampleVar is ${exampleVar}`);
        $('#resize-ta').highlightWithinTextarea({
            // highlight: exampleVar
            highlight: [280, characters.length]
        });
    }
}

export { characterLimit };