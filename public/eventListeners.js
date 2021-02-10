// Dealing with status update text area height

let textarea = document.querySelector("#resize-ta");
let statusWrapper = document.querySelector("#statusWrapper");
let mainTweetBtn = document.querySelector("#mainTweetBtn");


textarea.addEventListener("keyup", () => {
    textarea.style = `display: flex; height: ${textarea.scrollHeight}px`;
    console.log(textarea.scrollHeight);

    // statusWrapper.className = "flex h-40 space-x-6 items-center";
    // textarea.className = "w-full mt-4 h-full flex flex-wrap break-words text-gray-500 text-sm placeholder-gray-500 focus:outline-none";
    // mainTweetBtn.className = "flex text-white py-2 px-4 bg-blue-500 cursor-default rounded-full hover:bg-blue-600 cursor:pointer";


});


mainTweetBtn.addEventListener("click", () => {
    console.log(textarea.value);
});


// textarea.addEventListener("keyup", () => {
//     if (textarea.value.length > 0) {
//         mainTweetBtn.className = "flex text-white py-2 px-4 bg-blue-400 cursor-default rounded-full hover:bg-blue-500";
//     }
// }
