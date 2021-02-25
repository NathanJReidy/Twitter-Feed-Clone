import { globalTweetImgSrc, overlay, modal, modalStatusCard, modalTextArea, deleteBtnListener, deleteTweetImage, mobileMenu, mobileMenuCard, exitMobileMenuCard, mobileFooterNav, modalTweetFooterBarWrapper, modalTweetFooterBar } from './eventListeners.js';
import { allTweets, createTweet } from './logic.js';
import { createTweetCard, createTweetImageCard, createInteractiveBar } from './DOMmain.js';



// Hides modal overlay card
function hideModalOverlayCard() {
    overlay.className="";
    modal.className="transform translate-y-full transition duration-300";
    modalStatusCard.className = "hidden px-5 py-2 border-gray-100 justify-center border rounded-lg h-full";
    modalTextArea.value = "";
    modalTextArea.style = ""; // Resets the size of the modal text area to the default size
}

// Hide delete icon
function hideDeleteIcon(index) {
    let selectedDeleteBtn = document.querySelector(`#deleteBtn${index}`);
    selectedDeleteBtn.style.display = 'none';
}

// Display delete card 
function showDeleteCard(index) {
    let selectedDeletedCard = document.querySelector(`#deleteCard${index}`);
    selectedDeletedCard.style.display = 'flex';

}

// Hide delete card
function hideDeleteCard(index) {
    let selectedDeletedCard = document.querySelector(`#deleteCard${index}`);
    selectedDeletedCard.style.display = 'none';
}

// Display delete icon 
function showDeleteIcon(index) {
    let selectedDeleteBtn = document.querySelector(`#deleteBtn${index}`);
    selectedDeleteBtn.style.display = 'flex';
}

// Creates a blocker overlay 
function showBlockerLayer(index) {
    const blocker = document.querySelector("#blockerLayer");
    blocker.className = "absolute z-10 h-full w-full";
}

// Hides the blocker overlay 
function hideBlocker(index) {
    const blocker = document.querySelector("#blockerLayer");
    blocker.className = "hidden absolute z-10 h-full w-full";
}

// Hides the entire selected Tweet card 
function hideTweetCard(index) {
    const selectedCard = document.querySelector(`#tweetCard${index}`);
    selectedCard.style.display = 'none';
}

// Make three default horizonal dots disappear for default delete icon
function hideDefaultDeleteIcon(index) {
    let selectedDefaultDeleteBtn = document.querySelector(`#deleteDefaultBtn${index}`);
    selectedDefaultDeleteBtn.style.display = 'none';
}

function showDefaultDeleteIcon(index) {
    let selectedDefaultDeleteBtn = document.querySelector(`#deleteDefaultBtn${index}`);
    selectedDefaultDeleteBtn.style.display = 'flex';
}

// Display delete card for default delete button 
function showDefaultDeleteCard(index) {
    let selectedDefaultDeleteCard = document.querySelector(`#TweetDeleteCard${index}`);
    selectedDefaultDeleteCard.style.display = 'flex';
}

function hideDefaultDeleteCard(index) {
    let selectedDefaultDeleteCard = document.querySelector(`#TweetDeleteCard${index}`);
    selectedDefaultDeleteCard.style.display = 'none';
}

function hideDefaultTweetCard(index) {
    const selectedFeedCard = document.querySelector(`#feedCard${index}`);
    selectedFeedCard.style.display = 'none';
}

// Displays number of likes on the tweet 
function displayLikeCount(index) {
    // Change colour of like icon on selected like card
    let selectedLikeIcon = document.querySelector(`#likeIcon${index}`);
    selectedLikeIcon.setAttribute("class", "p-2 h-10 w-10 text-red-500 rounded-full hover:text-red-400 hover:bg-red-100");

    // Change display of like count on selected like card, except when like count is 0
    let selectedLikeNumber = document.querySelector(`#likeNumber${index}`);
    if (allTweets[index].likes != 0) {
        selectedLikeNumber.textContent = allTweets[index].likes;
    }
}

// Displays number of retweets on the tweet 
function displayRetweetCount(index) {
    // Change colour of retweet on selected retweet card 
    let selectedRetweetIcon = document.querySelector(`#retweetIcon${index}`);
    selectedRetweetIcon.setAttribute("class", "p-2 h-10 w-10 text-green-500 rounded-full hover:text-green-400 hover:bg-green-100");

    // Change display of retweet count on selected retweet card
    let selectedRetweetNumber = document.querySelector(`#retweetNumber${index}`);
    selectedRetweetNumber.textContent = allTweets[index].retweets;
}

// Creates a retweeted card and adds it to the feed
function createRetweetCard(index) {
    let retweetedText = allTweets[index].text;
    let retweetedImage = allTweets[index].image;
    let retweetedLikes = allTweets[index].likes;
    let retweetedRetweets = allTweets[index].retweets;

    createTweet(retweetedText, retweetedImage, retweetedLikes, retweetedRetweets);
    createTweetCard(retweetedText);
    createTweetImageCard(retweetedImage);
    createInteractiveBar();

    // Display the retweeted card's retweets and likes
    let retweetedCardIndex = allTweets.length - 1;
    displayLikeCount(retweetedCardIndex);
    displayRetweetCount(retweetedCardIndex);

    deleteBtnListener();
    deleteTweetImage();
}

// Mobile changes

function showMobileOverlay() {
    overlay.className = "fixed z-20 bg-black opacity-50 h-full w-full ";
}

function hideMobileOverlay() {
    overlay.className="";
}

// Add animation to mobile menu card by transition between left to right positions
// using transform / translate. Note that we can't use hidden to hide the card, 
// because it messes up the translations/transformations. Therefore, we hide
// the card by using -translate-x-full instead.

function showMobileMenuCard() {
    mobileMenuCard.className = "fixed z-30 top-0 left-0 w-3/4 h-full bg-white lg:hidden p-2 border transform translate-x-0 transition duration-300";
}

function hideMobileMenuCard() {
    mobileMenuCard.className = "fixed opacity-0 top-0 left-0 w-3/4 h-full bg-white lg:hidden p-2 border transform -translate-x-full transition duration-300";
}

// Function to show fixed footer nav on tweet click submit button
function showMobileFooterNav() {
    mobileFooterNav.className = "fixed bottom-0 w-full lg:hidden z-50 bg-white";
}

// Function to hide fixed footer nav bar when mobile tweet button is clicked
function hideMobileFooterNav() {
    mobileFooterNav.className = "hidden fixed bottom-0 w-full lg:hidden z-50 bg-white";
}

// Change the layout of the footer bar on the mobile version
function showMobileTweetFooter() {
    modalTweetFooterBarWrapper.className = "flex w-full pt-2 justify-between h-full items-end flex-wrap mb-2 ";
    modalTweetFooterBar.className = "flex justify-between space-x-4 items-center flex-wrap";
}

// Hide the mobile layout settings after the mobile/modal tweet submit button is clicked
function hideMobileTweetFooter() {
    modalTweetFooterBarWrapper.className = "flex pt-2 ml-16 justify-between items-center flex-wrap mb-2 border-gray-100 border-t-2";
    modalTweetFooterBar.className = "flex justify-around space-x-4 items-center flex-wrap";
}

// Makes the Modal tweet screen occupy the entire screen
function showModalLayout() {
    modal.className = "fixed z-20 h-full w-full bg-white rounded-lg transform translate-y-0 transition duration-300";
}



export { hideModalOverlayCard, hideDeleteIcon, showDeleteCard, hideDeleteCard, showDeleteIcon, showBlockerLayer, hideBlocker, hideTweetCard, hideDefaultDeleteIcon, showDefaultDeleteCard, showDefaultDeleteIcon, hideDefaultDeleteCard, hideDefaultTweetCard, displayLikeCount, displayRetweetCount, createRetweetCard, showMobileOverlay, hideMobileOverlay, showMobileMenuCard, hideMobileMenuCard, showMobileFooterNav, hideMobileFooterNav, showMobileTweetFooter, hideMobileTweetFooter, showModalLayout }