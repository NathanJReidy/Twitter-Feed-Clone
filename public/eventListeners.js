import { characterLimit } from './main.js';
import { createTweetCard, createTweetImage, createTweetImageCard, createModalTweetImage, deleteProgressBar, hideProgressBar, hideCharacterCountWatcher, hideModalProgressBar, hideModalCharacterCountWatcher, hideImageExitBtn, showImageExitBtn, showModalImageExitBtn, hideModalImageExitBtn, createInteractiveBar } from './dom.js';
import { createTweet, allTweets } from './logic.js';

// Declare query selectors that will be needed

let textarea = document.querySelector("#resize-ta");
let mainTweetBtn = document.querySelector("#mainTweetBtn");
let leftTweetBtn = document.querySelector("#leftTweetBtn");
let overlay = document.querySelector("#overlay");
let modal = document.querySelector("#modal");
let modalStatusCard = document.querySelector("#modalStatusCard");
let modalTweetBtn = document.querySelector("#modalTweetBtn");
let modalTextArea = document.querySelector("#resize-ta-modal");
let modalExit = document.querySelector("#modalExit");
let image = document.querySelector("#image");
let file = document.querySelector("#file");
let modalFile = document.querySelector("#modalFile");
let modalImage = document.querySelector("#modalImage");

// Monitors tweet input box for keystrokes 
textarea.addEventListener("keyup", () => {
    textarea.style = `display: flex; height: ${textarea.scrollHeight}px`;
    mainTweetBtn.className = "flex text-white py-2 px-4 bg-blue-500 cursor-default rounded-full hover:bg-blue-600 cursor-pointer focus:outline-none";
    characterLimit(textarea.value, "#resize-ta", "main");

    textarea.focus(); //sets focus to element
    let val = textarea.value; //store the value of the element
    textarea.value = ''; //clear the value of the element
    textarea.value = val; //set that value back.
});

// Monitors modal tweet input box for keystrokes
modalTextArea.addEventListener("keyup", () => {
    modalTextArea.style = `display: flex; height: ${textarea.scrollHeight}px`;
    modalTweetBtn.className = "flex text-white py-2 px-4 bg-blue-500 cursor-default rounded-full hover:bg-blue-600 cursor-pointer";
    characterLimit(modalTextArea.value, "#resize-ta-modal", "modal");

    modalTextArea.focus(); //sets focus to element
    let val = modalTextArea.value; //store the value of the element
    modalTextArea.value = ''; //clear the value of the element
    modalTextArea.value = val; //set that value back.
});


// 

// Monitors main tweet button and sends to the post a new tweet function on click 
// OLD (WORKS):
// mainTweetBtn.addEventListener("click", () => {
//     createTweetCard(textarea.value);
//     createTweetImageCard(globalTweetImgSrc);
//     createInteractiveBar(false);
//     likeIconListener();
//     retweetIconListener();
//     textarea.value = "";
//     hideProgressBar();
//     hideCharacterCountWatcher();
//     hideImageExitBtn();
//     deleteBtnListener();
//     deleteTweetImage();
// });

let likeListenerTrigger = 0;

function mainTweetBtnListener() {
    mainTweetBtn.addEventListener("click", () => {
        createTweet(textarea.value, globalTweetImgSrc, 0, 0);

        createTweetCard(textarea.value);
        createTweetImageCard(globalTweetImgSrc);
        createInteractiveBar(false);

        retweetIconListener();
        textarea.value = "";
        hideProgressBar();
        hideCharacterCountWatcher();
        hideImageExitBtn();
        deleteBtnListener();
        deleteTweetImage();
    });
}
mainTweetBtnListener(); 

function deleteTweetImage() {
    const tweetImage = document.querySelector("#tweetImageID");
    tweetImage.style.display = "none";
    globalTweetImgSrc = "";
}

function deleteModalTweetImage() {
    const modalTweetImage = document.querySelector("#modalTweetImageID");
    modalTweetImage.style.display = "none";
    modalGlobalTweetImgSrc = "";
}

// Display overlay and modal for new tweet on click of LHS tweet btn
leftTweetBtn.addEventListener("click", () => {
    overlay.className = "absolute z-10 bg-black opacity-50 h-full w-full";
    modal.className = "absolute z-20 h-1/2 w-1/2 bg-white rounded-lg mt-8";
    modalStatusCard.className = "flex flex-col relative px-5 py-2 border-gray-100 justify-center border h-full";

})

// Hide overlay on click 
overlay.addEventListener("click", () => {

    hideModalOverlayCard();

    hideModalProgressBar();
    hideModalCharacterCountWatcher();
    hideModalImageExitBtn();
    deleteModalTweetImage();
})

// OLD (WORKS)
// Monitors modal tweet button, sends the post to a new tweet function on click and hides the overlay and modal 
// modalTweetBtn.addEventListener("click", () => {
//     createTweetCard(modalTextArea.value);
//     overlay.className="";
//     modal.className="";
//     modalStatusCard.className = "hidden px-5 py-2 border-gray-100 justify-center border rounded-lg h-full";
//     modalTextArea.value = "";
//     hideModalProgressBar();
//     hideModalCharacterCountWatcher();
//     hideModalImageExitBtn();
//     createTweetImageCard(modalGlobalTweetImgSrc);
//     createInteractiveBar(false);
//     retweetIconListener();
//     likeIconListener();
//     deleteBtnListener();
//     deleteModalTweetImage();
// });

// NEW, MODULAR MODAL TWEET BTN EVENT LISTENER
function modalTweetBtnListener() {
    modalTweetBtn.addEventListener("click", () => {
        createTweet(modalTextArea.value, modalGlobalTweetImgSrc, 0, 0);


        createTweetCard(modalTextArea.value);

        hideModalOverlayCard();

        hideModalProgressBar();
        hideModalCharacterCountWatcher();
        hideModalImageExitBtn();
        createTweetImageCard(modalGlobalTweetImgSrc);
        createInteractiveBar(false);
        retweetIconListener();

        deleteBtnListener();
        deleteModalTweetImage();
    });
}

modalTweetBtnListener();

function hideModalOverlayCard() {
    overlay.className="";
    modal.className="";
    modalStatusCard.className = "hidden px-5 py-2 border-gray-100 justify-center border rounded-lg h-full";
    modalTextArea.value = "";
}


modalExit.addEventListener("click", () => {

    hideModalOverlayCard();

    hideModalProgressBar();
    hideModalCharacterCountWatcher();
    hideModalImageExitBtn();
    deleteModalTweetImage();

})

let globalTweetImgSrc = "";
// add event listener for when user selects an image file to upload
file.addEventListener("change", (event) => {
    let selectedFile = event.target.files[0];
    let reader = new FileReader();

    reader.onload = function(event) {
        let fileImgSrc = event.target.result;
        // Send fileImgSrc to function to manipulate dom to create image
        createTweetImage(fileImgSrc);
        // Show image exit button;
        showImageExitBtn();
        // Change mainTweetBtn to blue when image is uploaded
        mainTweetBtn.className = "flex text-white py-2 px-4 bg-blue-500 cursor-default rounded-full hover:bg-blue-600 cursor-pointer focus:outline-none";
        globalTweetImgSrc = fileImgSrc;
    }

    reader.readAsDataURL(selectedFile);

})

//On image click, open user's local files
image.addEventListener("click", () => {
    file.click(); 
})



// Replicate the above with the modalFile image
let modalGlobalTweetImgSrc = "";
// add event listener for when user selects an image file to upload
modalFile.addEventListener("change", (event) => {
    let selectedModalFile = event.target.files[0];
    let modalReader = new FileReader();

    modalReader.onload = function(event) {
        let modalFileImgSrc = event.target.result;
        // Send modalFileImgSrc to function to manipulate dom to create image
        createModalTweetImage(modalFileImgSrc);
        // Show modal image exit button;
        showModalImageExitBtn();
        // Change modalTweetBtn to blue when image is uploaded
        modalTweetBtn.className = "flex text-white py-2 px-4 bg-blue-500 cursor-default rounded-full hover:bg-blue-600 cursor-pointer focus:outline-none";
        
        modalGlobalTweetImgSrc = modalFileImgSrc;
    }

    modalReader.readAsDataURL(selectedModalFile);

})

// On modal image click, open user's local files
modalImage.addEventListener("click", () => {
    modalFile.click(); 
})

// Create event listeners to delete each card when horizonal delete button is clicked
function deleteBtnListener() {
    let deleteBtns = document.querySelectorAll('[id^="deleteBtn"]');
    deleteBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            let datasetValue = e.target.dataset.value;

            // Make three horizonal dots disappear
            const selectedDeleteBtn = document.querySelector(`#deleteBtn${datasetValue}`);
            selectedDeleteBtn.style.display = 'none';

            // Display card for delete button 
            let selectedDeletedCard = document.querySelector(`#deleteCard${datasetValue}`);
            selectedDeletedCard.style.display = 'flex';

            // Send datasetValue to function to listen for if
            // user clicks the specific delete card button
            deleteCardListener(datasetValue);
        })
    })
}

// If user clicks the delete card button, then both the delete card button
// and the tweet card itself disappears 
function deleteCardListener(index) {
    const selectedDeleteCard = document.querySelector(`#deleteCard${index}`);
    const selectedCard = document.querySelector(`#tweetCard${index}`);
    
    // If user clicks anywhere except the delete button,
    // the delete button disappears and the three dots button reappears
    const blocker = document.querySelector("#blockerLayer");
    const selectedDeleteBtn = document.querySelector(`#deleteBtn${index}`);
    blocker.className = "absolute z-10 h-full w-full";
    blocker.addEventListener('click', () => {
        selectedDeleteCard.style.display = 'none';
        selectedDeleteBtn.style.display = 'flex';
        blocker.className = "hidden absolute z-10 h-full w-full";
    })
    
    
    // If user clicks the delete card button, 
    // both the delete card button and the tweet card itself disappear
    selectedDeleteCard.addEventListener('click', () => {
        selectedDeleteCard.style.display = 'none';
        selectedCard.style.display = 'none';
        blocker.className = "hidden absolute z-10 h-full w-full";
    })

}

// Event listener for the exit button on the user's uploaded image

// Removes the user's uploaded image on clicking the exit button 
let imageExitBtn = document.querySelector("#imageExitBtn");
imageExitBtn.addEventListener("click", () => {
    deleteTweetImage();
    hideImageExitBtn();
})


// Removes the user's uploaded modal image on clicking the exit button 
let modalImageExitBtn = document.querySelector("#modalImageExitBtn");
modalImageExitBtn.addEventListener("click", () => {
    deleteModalTweetImage();
    hideModalImageExitBtn();
})



// event listeners for delete buttons and cards that are default
function deleteDefaultBtnListener() {
    let deleteDefaultBtns = document.querySelectorAll('[id^="deleteDefaultBtn"]');
    deleteDefaultBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            let datasetValue = e.target.dataset.value;
            console.log(`THE DATASETVALE IS ${datasetValue}`)

            // Make three horizonal dots disappear
            const selectedDefaultDeleteBtn = document.querySelector(`#deleteDefaultBtn${datasetValue}`);
            selectedDefaultDeleteBtn.style.display = 'none';

            // Display card for delete button 
            let selectedDefaultDeleteCard = document.querySelector(`#TweetDeleteCard${datasetValue}`);
            selectedDefaultDeleteCard.style.display = 'flex';

            // Send datasetValue to function to listen for if
            // user clicks the specific delete card button
            deleteDefaultCardListener(datasetValue);
        })
    })
}

// Run the above function in the global space
deleteDefaultBtnListener();

// If user clicks the delete card button on the default cards, then both the delete card button
// and the tweet card itself disappears 
function deleteDefaultCardListener(index) {
    const selectedDefaultDeleteCard = document.querySelector(`#TweetDeleteCard${index}`);
    const selectedFeedCard = document.querySelector(`#feedCard${index}`);
    
    // If user clicks anywhere except the delete button,
    // the delete button disappears and the three dots button reappears
    const blocker = document.querySelector("#blockerLayer");
    const selectedDefaultDeleteBtn = document.querySelector(`#deleteDefaultBtn${index}`);
    blocker.className = "absolute z-10 h-full w-full";
    blocker.addEventListener('click', () => {
        selectedDefaultDeleteCard.style.display = 'none';
        selectedDefaultDeleteBtn.style.display = 'flex';
        blocker.className = "hidden absolute z-10 h-full w-full";
    })
    
    
    // If user clicks the delete card button, 
    // both the delete card button and the tweet card itself disappear
    selectedDefaultDeleteCard.addEventListener('click', () => {
        selectedDefaultDeleteCard.style.display = 'none';
        selectedFeedCard.style.display = 'none';
        blocker.className = "hidden absolute z-10 h-full w-full";
    })

}




// Create event listeners for retweetIcons
let dataValue = "";
let count = 0; 


function retweetIconListener() {
    console.log("retweetIconListener function runs!");
    let retweetIconBtns = document.querySelectorAll('[id^="retweetIcon"]');
    count = 0;

    retweetIconBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            let datasetValue = e.target.dataset.value;
            console.log(`DATASET VALUE FOR RETWEET ICON IS ${datasetValue}`);
            dataValue = datasetValue;
            console.log(`dataValue equals ${dataValue}`);
            //count = 0; 
            // RETWEET FUNCTION IS STILL BROKEN BECAUSE I HAVE A CLICK FUNCTION INSIDE OF A CLICK FUNCTION (IE NEED TWO CLICKS TO RETWEET).
            if (count === 0) {
                retweetIconBtnListener(dataValue);
                
                count = 1;
            }


        })
    

    })

}



function retweetIconBtnListener(dataValue) {
    console.log(`NEW FUNCTION RUNS AND dataValue is ${dataValue}`);
    // change the colour of the retweet text to green to show that it has been retweeted
    let selectedRetweetIcon = document.querySelector(`#retweetIcon${dataValue}`);

    // Add event listener for that specific retweet button so that it only runs and creates a new card (clone) once

    selectedRetweetIcon.addEventListener("click", () => {

        selectedRetweetIcon.setAttribute("class", "p-2 h-10 w-10 text-green-500 rounded-full hover:text-green-400 hover:bg-green-100");

        // Add 1 to the number of retweets 
        let selectedRetweetNumber = document.querySelector(`#retweetNumber${dataValue}`);
        let currentDatasetValue = parseInt(selectedRetweetNumber.dataset.value);
        currentDatasetValue = 1; 
        selectedRetweetNumber.dataset.value = currentDatasetValue;
        selectedRetweetNumber.textContent = currentDatasetValue;

        // Create clone of card on retweet
        // Append entire cloned tweet card after the status card in the feed
        let selectedTweetText = document.querySelector(`#tweetText${dataValue}`);
        console.log(`selectedTweetText.value is ${selectedTweetText.textContent}`);

        // Select image source of the clicked card and add it to the retweeted card
        let selectedTweetImageCardIDSrc = document.querySelector(`#tweetImageCardID${dataValue}`).src;

        
        
        createTweetCard(selectedTweetText.textContent);
        createTweetImageCard(selectedTweetImageCardIDSrc);
        createInteractiveBar(true);

        

        retweetIconListener();
        
        deleteBtnListener();
        deleteTweetImage();


    })
    
}


// Use event bubbling to listen to events so that it is more computationally efficient
document.addEventListener('click', event => {
  // Event listener for likes
  if (event.target.matches('[id^="likeIcon"]')) {
      console.log('NEW EVENT LISTENTER WORKS!');
      let datasetValue = event.target.dataset.value;
      console.log(`datasetValue is ${datasetValue}`);
    
      // Update like count in array of objects
      updateLikeCount(datasetValue);

      // Change like display and colour
      displayLikeCount(datasetValue);


  }

  // Event listener for retweets

  if (event.target.matches('[id^="retweetIcon"]')) {
    let datasetValue = event.target.dataset.value;
    console.log(`datasetValue is ${datasetValue}`);

    // Update retweet count in array of objects
    updateRetweetCount(datasetValue);

    // Change retweet display and colour
    displayRetweetCount(datasetValue);

  }


  
});



// NEW, BETTER, MODULAR FUNCTIONS
function updateLikeCount(index) {
    allTweets[index].likes += 1;
    console.log(`allTweets[index].likes equals ${allTweets[index].likes}`);
}

function displayLikeCount(index) {
    // Change colour of like icon on selected like card
    let selectedLikeIcon = document.querySelector(`#likeIcon${index}`);
    selectedLikeIcon.setAttribute("class", "p-2 h-10 w-10 text-red-500 rounded-full hover:text-red-400 hover:bg-red-100");
    // Change display of like count on selected like card
    let selectedLikeNumber = document.querySelector(`#likeNumber${index}`);
    selectedLikeNumber.textContent = allTweets[index].likes;
}


function updateRetweetCount(index) {
    allTweets[index].retweets += 1;
    console.log(`allTweets[index].retweets equals ${allTweets[index].retweets}`);
}

function displayRetweetCount(index) {
    // Change colour of retweet on selected retweet card 
    let selectedRetweetIcon = document.querySelector(`#retweetIcon${index}`);
    selectedRetweetIcon.setAttribute("class", "p-2 h-10 w-10 text-green-500 rounded-full hover:text-green-400 hover:bg-green-100");

    // Change display of retweet count on selected retweet card
    let selectedRetweetNumber = document.querySelector(`#retweetNumber${index}`);
    selectedRetweetNumber.textContent = allTweets[index].retweets;

}

function createRetweetCard(index) {
    createTweet(textarea.value, globalTweetImgSrc, 0, 0);

    createTweetCard(textarea.value);
    createTweetImageCard(globalTweetImgSrc);
    createInteractiveBar(false);


}



// This replaces the deleteDefaultCardListener function
function deleteTweet(index) {
    allTweets.splice(index, 1);
    
}



