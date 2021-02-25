import { createTweetCard, createTweetImage, createTweetImageCard, createModalTweetImage, deleteProgressBar, hideProgressBar, hideCharacterCountWatcher, hideModalProgressBar, hideModalCharacterCountWatcher, hideImageExitBtn, showImageExitBtn, showModalImageExitBtn, hideModalImageExitBtn, createInteractiveBar } from './DOMmain.js';
import { createTweet, allTweets, focusMainText, focusModalText, windowScrollUp, updateLikeCount, updateRetweetCount, characterLimit } from './logic.js';
import { hideModalOverlayCard, hideDeleteIcon, showDeleteCard, hideDeleteCard, showDeleteIcon, showBlockerLayer, hideBlocker, hideTweetCard, hideDefaultDeleteIcon, showDefaultDeleteCard, showDefaultDeleteIcon, hideDefaultDeleteCard, hideDefaultTweetCard, displayLikeCount, displayRetweetCount, createRetweetCard, showMobileOverlay, hideMobileOverlay, showMobileMenuCard, hideMobileMenuCard, showMobileFooterNav, hideMobileFooterNav, showMobileTweetFooter, hideMobileTweetFooter, showModalLayout } from './DOMchanges.js';

// Declare variables that will be needed

let textarea = document.querySelector("#resize-ta");
let mainTweetBtn = document.querySelector("#mainTweetBtn");
let leftTweetBtn = document.querySelector("#leftTweetBtn");
let overlay = document.querySelector("#overlay");
let modal = document.querySelector("#modal");
let modalStatusCard = document.querySelector("#modalStatusCard");
let modalTweetBtn = document.querySelector("#modalTweetBtn");
let mobileTweetSubmitBtn = document.querySelector("#mobileTweetSubmitBtn");
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
    focusMainText();
});

// Monitors modal tweet input box for keystrokes
modalTextArea.addEventListener("keyup", () => {
    modalTextArea.style = `display: flex; height: ${modalTextArea.scrollHeight}px`;
    modalTweetBtn.className = "lg:flex hidden text-white py-2 px-4 bg-blue-500 cursor-default rounded-full hover:bg-blue-600 cursor-pointer";
    mobileTweetSubmitBtn.className = "lg:hidden flex text-white items-center text-sm py-1 px-4 bg-blue-500 hover:bg-blue-600 cursor-default rounded-full";
    characterLimit(modalTextArea.value, "#resize-ta-modal", "modal");
    focusModalText();

});

// Listens for main tweet button being clicked and creates new tweet if number of characters does not exceed 280
function mainTweetBtnListener() {
    mainTweetBtn.addEventListener("click", () => {
        if (textarea.value.length <= 280) {
            createTweet(textarea.value, globalTweetImgSrc, 0, 0);
            createTweetCard(textarea.value);
            createTweetImageCard(globalTweetImgSrc);
            createInteractiveBar();
            textarea.value = "";
            textarea.style = ""; // Resets the size of the text area to the default size
            hideProgressBar();
            hideCharacterCountWatcher();
            hideImageExitBtn();
            deleteBtnListener();
            deleteTweetImage();
        } else {
            return;
        }

    });
}

// Run mainTweetBtnListener globally
mainTweetBtnListener();


// Display overlay and modal for new tweet on click of LHS tweet btn
leftTweetBtn.addEventListener("click", () => {
    overlay.className = "fixed z-10 bg-black opacity-50 h-full w-full";
    modal.className = "fixed z-20 h-1/2 w-1/2 bg-white rounded-lg mt-8";
    modalStatusCard.className = "flex flex-col relative px-5 py-2 border-gray-100 justify-center border h-full";
    focusModalText();
})

// Hide overlay on click 
overlay.addEventListener("click", () => {
    hideModalOverlayCard();
    hideModalProgressBar();
    showMobileFooterNav();
    hideModalCharacterCountWatcher();
    hideModalImageExitBtn();
    deleteModalTweetImage();
    modalTextArea.style = ""; // Resets the size of the text area to the default size
})

// MODAL TWEET BTN EVENT LISTENER
function modalTweetBtnListener() {
    modalTweetBtn.addEventListener("click", () => {
        if (modalTextArea.value.length <= 280) {
            createTweet(modalTextArea.value, modalGlobalTweetImgSrc, 0, 0);
            createTweetCard(modalTextArea.value);
            hideModalOverlayCard();
            hideModalProgressBar();
            hideModalCharacterCountWatcher();
            hideModalImageExitBtn();
            createTweetImageCard(modalGlobalTweetImgSrc);
            createInteractiveBar();
            

            deleteBtnListener();
            deleteModalTweetImage();
        } else {
            return;
        }

    });
}

// Run modalTweetBtnListener globally
modalTweetBtnListener();


// Hide modal card and components upon clicking modal card exit button 
modalExit.addEventListener("click", () => {
    hideModalOverlayCard();
    hideModalProgressBar();
    showMobileFooterNav();
    hideModalCharacterCountWatcher();
    hideModalImageExitBtn();
    deleteModalTweetImage();
})

// Add event listener for when user selects an image file to upload
let globalTweetImgSrc = "";
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

// On image click, open user's local files
image.addEventListener("click", () => {
    file.click(); 
})


// Add event listener for when user selects a modal image file to upload
let modalGlobalTweetImgSrc = "";
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
        modalTweetBtn.className = "lg:flex hidden text-white py-2 px-4 bg-blue-500 cursor-default rounded-full hover:bg-blue-600 cursor-pointer";
        // Change mobileTweetSubmitBtn to blue when image is uploaded
        mobileTweetSubmitBtn.className = "lg:hidden flex text-white items-center text-sm py-1 px-4 bg-blue-500 hover:bg-blue-600 cursor-default rounded-full";

        modalGlobalTweetImgSrc = modalFileImgSrc;
    }

    modalReader.readAsDataURL(selectedModalFile);

})

// On modal image click, open user's local files
modalImage.addEventListener("click", () => {
    modalFile.click(); 
})


// Deletes tweet image from main tweet screen
function deleteTweetImage() {
    let tweetImage = document.querySelector("#tweetImageID");
    tweetImage.style.display = "none";
    globalTweetImgSrc = "";
};

// Deletes tweet image from modal tweet screen
function deleteModalTweetImage() {
    let modalTweetImage = document.querySelector("#modalTweetImageID");
    modalTweetImage.style.display = "none";
    console.log(`modalGlobalTweetImgSrc is ${modalGlobalTweetImgSrc}`);
    modalGlobalTweetImgSrc = "";
};

// Create event listeners to delete each card when horizonal delete button is clicked
function deleteBtnListener() {
    let deleteBtns = document.querySelectorAll('[id^="deleteBtn"]');
    deleteBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            let datasetValue = e.target.dataset.value;

            // Make three horizonal dots disappear
            hideDeleteIcon(datasetValue);

            // Display card for delete button 
            showDeleteCard(datasetValue);

            // Send datasetValue to function to listen for if
            // user clicks the specific delete card button
            deleteCardListener(datasetValue);
        })
    })
}


// If user clicks anywhere except the delete button,
// the delete button disappears and the three dots delete button icon reappears
function hideBlockerLayer(index) {
    const blocker = document.querySelector("#blockerLayer");

    blocker.addEventListener('click', () => {
        hideDeleteCard(index);
        showDeleteIcon(index);
        hideBlocker(index);
    })

}

// If user clicks the delete card button, 
// both the delete card button and the tweet card itself disappear
function deleteTweet(index) {
    const selectedDeleteCard = document.querySelector(`#deleteCard${index}`);

    selectedDeleteCard.addEventListener('click', () => {
        hideDeleteCard(index);
        hideTweetCard(index);
        hideBlocker(index);
    })
}

// If user clicks the delete card button, then both the delete card button
// and the tweet card itself disappears 
function deleteCardListener(index) {
    showBlockerLayer(index);
    hideBlockerLayer(index);
    deleteTweet(index);
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

// Event listeners for delete buttons and cards that are from the default tweet placeholders
function deleteDefaultBtnListener() {
    let deleteDefaultBtns = document.querySelectorAll('[id^="deleteDefaultBtn"]');
    deleteDefaultBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            let datasetValue = e.target.dataset.value;

            // Make three default horizonal dots disappear for default delete icon
            hideDefaultDeleteIcon(datasetValue);

            // Display delete card for default delete button 
            showDefaultDeleteCard(datasetValue);

            // Send datasetValue to function to listen for if
            // user clicks the specific delete card button
            deleteDefaultCardListener(datasetValue);
        })
    })
}

// Run the above function in the global space
deleteDefaultBtnListener();


// If user clicks the delete card button on the default placeholder tweets, 
// both the default delete card button and the default tweet card itself disappear
function deleteDefaultTweet(index) {
    const selectedDefaultDeleteCard = document.querySelector(`#TweetDeleteCard${index}`);

    selectedDefaultDeleteCard.addEventListener('click', () => {
        hideDefaultDeleteCard(index);
        hideDefaultTweetCard(index);
        hideBlocker(index);
    })
}

// If user clicks anywhere except the default delete button,
// the default delete button disappears and the three dots default delete button icon reappears
function hideDefaultBlockerLayer(index) {
    const blocker = document.querySelector("#blockerLayer");

    blocker.addEventListener('click', () => {
        hideDefaultDeleteCard(index);
        showDefaultDeleteIcon(index);
        hideBlocker(index);
    })
}

// Listens for deleting default card
function deleteDefaultCardListener(index) {
    showBlockerLayer(index);
    hideDefaultBlockerLayer(index);
    deleteDefaultTweet(index);
}


// Use event bubbling to listen to retweet and like events so that it is more computationally efficient
document.addEventListener('click', event => {

  // Event listener for likes
  if (event.target.matches('[id^="likeIcon"]')) {
      let datasetValue = event.target.dataset.value;

      // Update like count in array of objects
      updateLikeCount(datasetValue);

      // Change like display and colour
      displayLikeCount(datasetValue);
  }

  // Event listener for retweets

  if (event.target.matches('[id^="retweetIcon"]')) {
    let datasetValue = event.target.dataset.value;

    // Update retweet count in array of objects
    updateRetweetCount(datasetValue);

    // Change retweet display and colour
    displayRetweetCount(datasetValue);

    // Create the retweeted card
    createRetweetCard(datasetValue);

  }

});



// NB: The placeholder tweet cards CANNOT be retweeted or liked, because they are deliberately 
// not included/pushed to the array of tweet objects. HOWEVER, they can be deleted if the user doesn't
// want to see them. 



// Event handler for sliding nav bar on mobile
let mobileMenu = document.querySelector("#mobileMenu");
let mobileMenuCard = document.querySelector("#mobileMenuCard");
let exitMobileMenuCard = document.querySelector("#exitMobileMenuCard");

mobileMenu.addEventListener("click", () => {
    // Open mobile menu on screen
    showMobileMenuCard();

    // Display black overlay 
    showMobileOverlay();

    // Run event listener overlay so that if user clicks the overlay it makes the menu disappear
    closeMobileOverlays();
})

function closeMobileOverlays() {
    overlay.addEventListener("click", () => {
        hideMobileOverlay();
        hideMobileMenuCard();
    })

    exitMobileMenuCard.addEventListener("click", () => {
        hideMobileOverlay();
        hideMobileMenuCard();
    })
}

// Event listener for mobile tweet button

let mobileFooterNav = document.querySelector("#mobileFooterNav");

// Change the layout of the mobile tweet card 
let modalTweetFooterBarWrapper = document.querySelector("#modalTweetFooterBarWrapper");
let modalTweetFooterBar = document.querySelector("#modalTweetFooterBar");

// Listens to mobile tweet button 
mobileTweetBtn.addEventListener("click", () => {
    // Show mobile (same as modal) tweet screen 
    overlay.className = "fixed z-10 bg-black opacity-50 h-full w-full";
    
    showModalLayout();
    
    modalStatusCard.className = "flex flex-col relative px-5 pt-2 pb-2 border-gray-100 border h-full";

    hideMobileFooterNav();
    showMobileTweetFooter();

    // Focus modal text so user is ready to type straight away 
    focusModalText();

})

// Event listener for submitting a mobile tweet 
mobileTweetSubmitBtn.addEventListener("click", () => {
    // Mimick clicking the modalTweetBtn so I don't need to re-write the code for mobile tweet submit btn
    modalTweetBtn.click();

    // Exit full screen layout
    showMobileFooterNav();
    hideMobileTweetFooter();
})


// Scroll page to top of screen when footer home icon is clicked
let footerHomeIcon = document.querySelector("#footerHomeIcon");
footerHomeIcon.addEventListener("click", () => {
    windowScrollUp();
});

// Scroll page to top of screen when main home icon is clicked
let mainHomeIcon = document.querySelector("#mainHomeIcon");
mainHomeIcon.addEventListener("click", () => {
    windowScrollUp();
});





export { mainTweetBtn, modalTweetBtn, mobileTweetSubmitBtn, textarea, modalTextArea, globalTweetImgSrc, modalGlobalTweetImgSrc, overlay, modal, modalStatusCard, deleteBtnListener, deleteTweetImage, mobileMenu, mobileMenuCard, exitMobileMenuCard, mobileFooterNav, modalTweetFooterBarWrapper, modalTweetFooterBar };

