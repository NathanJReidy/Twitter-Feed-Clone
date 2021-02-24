import { globalTweetImgSrc, modalGlobalTweetImgSrc, overlay, modal, modalStatusCard, modalTextArea } from './eventListeners.js';

// Deletes tweet image from main tweet screen
function deleteTweetImage() {
    const tweetImage = document.querySelector("#tweetImageID");
    tweetImage.style.display = "none";
    globalTweetImgSrc = "";
};

// Deletes tweet image from modal tweet screen
function deleteModalTweetImage() {
    const modalTweetImage = document.querySelector("#modalTweetImageID");
    modalTweetImage.style.display = "none";
    modalGlobalTweetImgSrc = "";
};

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




export { deleteTweetImage, deleteModalTweetImage, hideModalOverlayCard, hideDeleteIcon, showDeleteCard, hideDeleteCard, showDeleteIcon, showBlockerLayer, hideBlocker, hideTweetCard, hideDefaultDeleteIcon, showDefaultDeleteCard, showDefaultDeleteIcon, hideDefaultDeleteCard, hideDefaultTweetCard }