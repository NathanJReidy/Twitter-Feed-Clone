// Dealing with status update text area height

let textarea = document.querySelector("#resize-ta");
let statusWrapper = document.querySelector("#statusWrapper");


textarea.addEventListener("click", () => {
    statusWrapper.className = "flex h-40 space-x-6 items-center";
    textarea.className = "w-full mt-4 h-full flex flex-wrap break-words text-gray-500 text-sm placeholder-gray-500 focus:outline-none";
});



