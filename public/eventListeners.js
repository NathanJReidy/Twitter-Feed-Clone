import { characterLimit } from './main.js';
import { createTweetCard, createTweetImage } from './dom.js';


// Dealing with status update text area height

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

// Monitors tweet input box for keystrokes 
textarea.addEventListener("keyup", () => {
    textarea.style = `display: flex; height: ${textarea.scrollHeight}px`;
    mainTweetBtn.className = "flex text-white py-2 px-4 bg-blue-500 cursor-default rounded-full hover:bg-blue-600 cursor-pointer";
    characterLimit(textarea.value, "#resize-ta");

    textarea.focus(); //sets focus to element
    let val = textarea.value; //store the value of the element
    textarea.value = ''; //clear the value of the element
    textarea.value = val; //set that value back.
});

// Monitors modal tweet input box for keystrokes
modalTextArea.addEventListener("keyup", () => {
    modalTextArea.style = `display: flex; height: ${textarea.scrollHeight}px`;
    modalTweetBtn.className = "flex text-white py-2 px-4 bg-blue-500 cursor-default rounded-full hover:bg-blue-600 cursor-pointer";
    characterLimit(modalTextArea.value, "#resize-ta-modal");

    modalTextArea.focus(); //sets focus to element
    let val = modalTextArea.value; //store the value of the element
    modalTextArea.value = ''; //clear the value of the element
    modalTextArea.value = val; //set that value back.
});


// 

// Monitors main tweet button and sends to the post a new tweet function on click 
mainTweetBtn.addEventListener("click", () => {
    createTweetCard(textarea.value);
    textarea.value = "";
});

// Display overlay and modal for new tweet on click of LHS tweet btn
leftTweetBtn.addEventListener("click", () => {
    overlay.className = "absolute z-10 bg-black opacity-50 h-full w-full";
    modal.className = "absolute z-20 h-1/3 w-1/2 bg-white rounded-lg mt-8";
    modalStatusCard.className = "flex flex-col relative px-5 py-2 border-gray-100 justify-center border h-full";

})

// Hide overlay on click 
overlay.addEventListener("click", () => {
    overlay.className="";
    modal.className="";
    modalStatusCard.className = "hidden px-5 py-2 border-gray-100 justify-center border h-full";
    modalTextArea.value = "";
})

// Monitors modal tweet button, sends the post to a new tweet function on click and hides the overlay and modal 
modalTweetBtn.addEventListener("click", () => {
    createTweetCard(modalTextArea.value);
    overlay.className="";
    modal.className="";
    modalStatusCard.className = "hidden px-5 py-2 border-gray-100 justify-center border rounded-lg h-full";
    modalTextArea.value = "";

});

modalExit.addEventListener("click", () => {
    overlay.className="";
    modal.className="";
    modalStatusCard.className = "hidden px-5 py-2 border-gray-100 justify-center border rounded-lg h-full";
    modalTextArea.value = "";

})

// add event listener for when user selects an image file to upload
file.addEventListener("change", (event) => {
    console.log("onchange handler ran!");
    let selectedFile = event.target.files[0];
    // console.log(selectedFile);

    let reader = new FileReader();
    let fileImgTitle = selectedFile.name;
    // let fileImage = "";
    reader.onload = function(event) {
        let fileImgSrc = event.target.result;
        console.log(`file image source is ${fileImgSrc}`);
        // fileImage = fileImgSrc;
        createTweetImage(fileImgSrc);

    }

    reader.readAsDataURL(selectedFile);

    // // create a function in dom.js that creates the image div
    // // and adds it below the tweet text. 
    // console.log("fileImage is " + fileImage);

    
})


//On image click, open user's local files
image.addEventListener("click", () => {
    console.log("CLICK IMAGE!");
    file.click(); 
})


// let fileHandle;
// image.addEventListener('click', async () => {
//   // Destructure the one-element array.
//   [fileHandle] = await window.showOpenFilePicker();
//   // Do something with the file handle.
//   const file = await fileHandle.getFile();
//   const contents = await file.arrayBuffer();
//   //console.log(contents);
 

// NEED TO FIX THIS. NEED TO READ THE IMAGE DATA AND
// CAPTURE THE IMG SRC SO I CAN THEN ADD IT TO A NEW IMAGE DOM UNDER THE
// TWEET STATUS. USE FILE SYSTEM ACCESS API???


//   function typedArrayToURL(typedArray, mimeType) {
//     return URL.createObjectURL(new Blob([typedArray.buffer], {type: mimeType}))
//   }

// //   const bytes = new Uint8Array(59);

// //   for(let i = 0; i < 59; i++) {
// //     bytes[i] = 32 + i;
// //   }

// //   const url = typedArrayToURL(contents, 'text/plain');
//   console.log(URL.createObjectURL(fileHandle));
//   //console.log(url);

//   //console.log(URL.createObjectURL(new Blob([file.buffer], {type: MimeType})));

// });
//   // test: 
//   function printFile(thefile) {
//     var reader = new FileReader();
//     reader.onload = function(evt) {
//       console.log(evt.target.result);
//     };
//     reader.readAsArray(thefile);
//   }

//   printFile(file);



// function typedArrayToURL(typedArray, mimeType) {
//     return URL.createObjectURL(new Blob([typedArray.buffer], {type: mimeType}));
// }