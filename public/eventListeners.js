// Dealing with status update text area height

let textarea = document.querySelector("#resize-ta");
let statusWrapper = document.querySelector("#statusWrapper");
let mainTweetBtn = document.querySelector("#mainTweetBtn");


textarea.addEventListener("keyup", () => {
    textarea.style = `display: flex; height: ${textarea.scrollHeight}px`;
    console.log(textarea.scrollHeight);
    mainTweetBtn.className = "flex text-white py-2 px-4 bg-blue-500 cursor-default rounded-full hover:bg-blue-600 cursor-pointer";
//Need to align the photo of my face so 
//that it stays at the top of the box when I start writing.

});


mainTweetBtn.addEventListener("click", () => {
    console.log(textarea.value);
});


// textarea.addEventListener("keyup", () => {
//     if (textarea.value.length > 0) {
//         mainTweetBtn.className = "flex text-white py-2 px-4 bg-blue-400 cursor-default rounded-full hover:bg-blue-500";
//     }
// }
