import { textarea, modalTextArea } from './eventListeners.js';


// Store all current tweets in an array of objects
let allTweets = [];

function createTweet(text, image, likes, retweets) {
    allTweets.push({
        text,
        image,
        likes,
        retweets,
    })

}

// Focuses main text area after highlighting excess characters 
function focusMainText() {
    textarea.focus(); //sets focus to element
    let val = textarea.value; //store the value of the element
    textarea.value = ''; //clear the value of the element
    textarea.value = val; //set that value back.
}


// Focuses modal text area after highlighting excess characters 
function focusModalText() {
    modalTextArea.focus(); //sets focus to element
    let val = modalTextArea.value; //store the value of the element
    modalTextArea.value = ''; //clear the value of the element
    modalTextArea.value = val; //set that value back.
}

// Updates the number of likes on the liked card, in the array of objects
function updateLikeCount(index) {
    allTweets[index].likes += 1;
}

// Updates the number of retweets on the retweeted card, in the array of objects 
function updateRetweetCount(index) {
    allTweets[index].retweets += 1;
}







function windowScrollUp() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}






// import ProgressBar from 'progressbar.js';
// Add js script for progress bar that counts how close the tweet is to the 280 character limit

function createProgressBar(characterLimitDecimal, ID) {
    // Creates blue bar
    if (characterLimitDecimal < (260 / 280)) {
        let bar = new ProgressBar.Circle(ID, {
            strokeWidth: 8,
            easing: 'easeInOut',
            duration: 1400,
            color: '#2f64eb',
            trailColor: '#eee',
            trailWidth: 8,
            svgStyle: null,
        })
    
        bar.animate(characterLimitDecimal);  // Number from 0.0 to 1.0
    }
    
    // Create orange bar if only 20 characters left to type 
    else if (characterLimitDecimal >= (260 / 280)) {
        let bar = new ProgressBar.Circle(ID, {
            strokeWidth: 8,
            easing: 'easeInOut',
            duration: 1400,
            color: '#FFA500',
            trailColor: '#eee',
            trailWidth: 8,
            svgStyle: null,
        })

        bar.animate(characterLimitDecimal);  // Number from 0.0 to 1.0


    }


}

export { createProgressBar, createTweet, allTweets, focusMainText, focusModalText, windowScrollUp, updateLikeCount, updateRetweetCount };