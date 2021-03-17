# Twitter-Feed-Clone

This project uses html, Tailwind CSS and javascript to replicate the basic functionality of Twitter. It is a responsive design. 
Webpack has been used to bundle the javascript files. 

Features:

- Post a tweet from either the main tweet card at the top, or the tweet button on the left hand side.
- Access images from your computer that you would like to tweet, and they will be automatically fit to a certain size and border before posting.
- Once posted, tweets can be liked, retweeted, and deleted. Note that placeholder tweets cannot be liked or retweeted, but they can be deleted. This is deliberate. 
- The user can hover over the comment, retweet, like and share icons and an overlay description will appear.
- Posts cannot exceed 280 characters. 
- For each character that exceeds 280 characters, they will be highlighted in red and the user will be prevented from posting.
- When typing a tweet, a progress bar will appear to show how close to 280 characters the user is. Once 280 characters is crossed, the progress bar will turn into a counter of how many characters over the limit the user is.
- When images are tweeted, the user can click on them in the feed and it will show a close up, with the black background overlay also appearing to help focus the image.
- There is a different design for mobile. 
- When the user clicks the home button, it will automatically scroll them back to the top of their Twitter feed.
