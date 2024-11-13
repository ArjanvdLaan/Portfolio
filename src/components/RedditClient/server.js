import express from 'express';
import axios from 'axios';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3001; // You can change the port if needed

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Vote endpoint
app.post("/vote", async (req, res) => {
  const { postId, direction, accessToken } = req.body;

  console.log("Vote request received with data: ", { accessToken, postId, direction });

  // Ensure the direction is valid: 1 (upvote), -1 (downvote), or 0 (remove vote)
  if (![1, -1, 0].includes(direction)) {
    return res
      .status(400)
      .json({
        error:
          "Invalid vote direction. Use 1 for upvote, -1 for downvote, 0 for remove.",
      });
  }

  try {
    // Make the API request to Reddit's vote endpoint
    const response = await axios.post(
      "https://oauth.reddit.com/api/vote",
      {
        dir: direction,
        id: `t3_${postId}`, // t3_ is the prefix for posts, followed by the actual post ID
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token in the headers
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log('Reddit API response:', response.data);

    res.json(response.data);
  } catch (error) {
    console.error('Error during Reddit API call:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      return res
        .status(401)
        .json({ error: "Unauthorized. Please reauthenticate." });
    }
    res.status(500).json({ error: "Failed to vote on post." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
