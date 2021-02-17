import { characterLimit } from './main.js';
import { createTweetCard, createTweetImage, createTweetImageCard, createModalTweetImage, deleteProgressBar, hideProgressBar, hideCharacterCountWatcher, hideModalProgressBar, hideModalCharacterCountWatcher, hideImageExitBtn, showImageExitBtn, showModalImageExitBtn, hideModalImageExitBtn } from './dom.js';


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
mainTweetBtn.addEventListener("click", () => {
    createTweetCard(textarea.value);
    createTweetImageCard(globalTweetImgSrc);
    textarea.value = "";
    hideProgressBar();
    hideCharacterCountWatcher();
    hideImageExitBtn();
    deleteBtnListener();
    deleteTweetImage();
});

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
    overlay.className="";
    modal.className="";
    modalStatusCard.className = "hidden px-5 py-2 border-gray-100 justify-center border h-full";
    modalTextArea.value = "";
    hideModalProgressBar();
    hideModalCharacterCountWatcher();
    hideModalImageExitBtn();
    deleteModalTweetImage();
})

// Monitors modal tweet button, sends the post to a new tweet function on click and hides the overlay and modal 
modalTweetBtn.addEventListener("click", () => {
    createTweetCard(modalTextArea.value);
    overlay.className="";
    modal.className="";
    modalStatusCard.className = "hidden px-5 py-2 border-gray-100 justify-center border rounded-lg h-full";
    modalTextArea.value = "";
    hideModalProgressBar();
    hideModalCharacterCountWatcher();
    hideModalImageExitBtn();
    createTweetImageCard(modalGlobalTweetImgSrc);
    deleteBtnListener();
    deleteModalTweetImage();
});

modalExit.addEventListener("click", () => {
    overlay.className="";
    modal.className="";
    modalStatusCard.className = "hidden px-5 py-2 border-gray-100 justify-center border rounded-lg h-full";
    modalTextArea.value = "";
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


