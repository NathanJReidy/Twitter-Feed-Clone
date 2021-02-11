// The purpose of this js file is to manipulate the DOM.

function createTweetCard(tweet) {
    // Create wrapping div
    const newDiv = document.createElement("div");
    newDiv.className = "flex px-5 py-2 space-x-3 border hover:bg-gray-100 cursor-pointer";
    
    // Create img class
    const profileImg = document.createElement("img");
    profileImg.className = "w-12 h-12 rounded-full shadow-lg";
    profileImg.src = "data:image/jpeg;base64,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";

    // Create wrapping div for elements within card
    const elementsDiv = document.createElement("div");
    elementsDiv.className = "flex flex-col w-full";

    // Create another wrapping div for top of card info
    const topInfoDiv = document.createElement("div");
    topInfoDiv.className = "flex justify-between items-center px-2";

    // Create another div for info in the LHS of wrapper 
    const leftTopInfoDiv = document.createElement("div");
    leftTopInfoDiv.className = "flex space-x-3 items-center";

    // create paragraphs and divs within leftTopInfoDiv
    const fullName = document.createElement("p");
    fullName.className = "font-bold";
    fullName.textContent = "Nathan Reidy";

    const username = document.createElement("p");
    username.className = "text-gray-500";
    username.textContent = "@NathanReidy";

    const dot = document.createElement("div");
    dot.className = "flex h-1 w-1 bg-gray-500 rounded-full";

    const tweetTime = document.createElement("p");
    tweetTime.className = "text-gray-500";
    tweetTime.textContent = "Now";

    // Append these elements to leftTopInfoDiv
    leftTopInfoDiv.appendChild(fullName);
    leftTopInfoDiv.appendChild(username);
    leftTopInfoDiv.appendChild(dot);
    leftTopInfoDiv.appendChild(tweetTime);

    // FIX THIS: 
    // Create an SVG for info in the RHS of wrapper 
    // const horizontalBar = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    // horizontalBar.class = "w-6 h-6 text-gray-600";
    // horizontalBar.fill = "currentColor";
    // horizontalBar.viewBox = "0 0 20 20";
    // horizontalBar.xmlns = "http://www.w3.org/2000/svg";

    // // Create path tag within SVG element and append it to SVG 
    // pathTag = document.querySelector("#svgPath").cloneNode()
    // pathTag.appendTo(horizontalBar);

    // Append leftTopInfoDiv and SVG element to topInfoDiv
    topInfoDiv.appendChild(leftTopInfoDiv);
    
    // FIX THIS: 
    // topInfoDiv.appendChild(horizontalBar);

    // Create div for user's new tweet
    const newTweet = document.createElement("div");
    newTweet.className = "flex px-2 py-1 text-sm";
    newTweet.textContent = tweet; 

    // Append topInfoDiv and newTweet div to elementsDiv
    elementsDiv.appendChild(topInfoDiv);
    elementsDiv.appendChild(newTweet);

    // Append profileImg and elementsDiv to newDiv
    newDiv.appendChild(profileImg);
    newDiv.appendChild(elementsDiv);

    // Append entire newDiv tweet card after the status card in the feed
    const statusCard = document.querySelector("#statusCard");
    statusCard.after(newDiv);

}

export { createTweetCard };


