

// allTweets = [];

// function createTweet(name) {
//     allTweets.push({
//         tweetText
//     })
// }


// import ProgressBar from 'progressbar.js';

// Add js script for progress bar that counts how close the tweet is to the 280 character limit

function createProgressBar(characterLimitDecimal) {
    let bar = new ProgressBar.Circle(progressBar, {
        strokeWidth: 6,
        easing: 'easeInOut',
        duration: 1400,
        color: '#FFEA82',
        trailColor: '#eee',
        trailWidth: 1,
        svgStyle: null,
    })

    
    bar.animate(0.8);  // Number from 0.0 to 1.0

}

export { createProgressBar };