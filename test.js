const usetube = require('usetube');

// Replace with your search query
const searchQuery = 'Node.js tutorial';

// Function to search for YouTube videos and print the results
async function searchVideos(query) {
  try {
    const results = await usetube.searchVideo(query);

    // Extract relevant data from the search results
    console.log(results.videos)
    // Print the video data
    // console.log('Video Data:');
    // videoData.forEach(data => {
    //   console.log('Title:', data.title);
    //   console.log('URL:', data.url);
    //   console.log('Thumbnail:', data.thumbnail);
    //   console.log('---');
    // });
  } catch (error) {
    console.error('Error searching for videos:', error);
  }
}

// Call the search function with your query
searchVideos('asake');
