import axios from 'axios';

// Function to handle voting on a post
export const voteOnPost = async (postId, direction, accessToken) => {
  try {
    // Make the API request to your backend server
    const response = await axios.post(
      'http://localhost:3001/vote',
      {
        postId,
        direction,
        accessToken
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Vote successful:', response.data);
  } catch (error) {
    console.error('Failed to vote on post:', error);
    if (error.response?.status === 401) {
      console.error('Unauthorized. Please reauthenticate.');
    }
  }
};
