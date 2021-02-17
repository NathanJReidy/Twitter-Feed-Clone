

// allTweets = [];

// function createTweet(name) {
//     allTweets.push({
//         tweetText
//     })
// }


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

export { createProgressBar };