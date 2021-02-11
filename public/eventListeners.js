import { characterLimit } from './main.js';
import { createTweetCard } from './dom.js';


// Dealing with status update text area height

let textarea = document.querySelector("#resize-ta");
let statusWrapper = document.querySelector("#statusWrapper");
let mainTweetBtn = document.querySelector("#mainTweetBtn");



textarea.addEventListener("keyup", () => {
    textarea.style = `display: flex; height: ${textarea.scrollHeight}px`;
    mainTweetBtn.className = "flex text-white py-2 px-4 bg-blue-500 cursor-default rounded-full hover:bg-blue-600 cursor-pointer";
    characterLimit(textarea.value);

    textarea.focus(); //sets focus to element
    let val = textarea.value; //store the value of the element
    textarea.value = ''; //clear the value of the element
    textarea.value = val; //set that value back.
});


mainTweetBtn.addEventListener("click", () => {
    console.log(textarea.value);
    createTweetCard(textarea.value);
});


