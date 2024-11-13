import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { voteOnPost } from "../vote.js";
import "./CSS/Vote.css";

const Vote = ({ post, accessToken }) => {
  const postId = post.data.id;
  const initialUpvotes = post.data.ups;

  // State to keep track of the current upvotes and vote direction
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [voteDirection, setVoteDirection] = useState(0); // 0: no vote, 1: upvote, -1: downvote

  // Function to handle upvote
  const handleUpvote = () => {
    if (voteDirection === 1) {
      // If already upvoted, do nothing
      return;
    } else if (voteDirection === -1) {
      // If currently downvoted, add 2 to upvotes
      setUpvotes(upvotes + 2);
    } else {
      // If no vote, add 1 to upvotes
      setUpvotes(upvotes + 1);
    }
    setVoteDirection(1); // Set vote direction to upvote
    voteOnPost(postId, 1, accessToken); // Call the vote API
  };

  // Function to handle downvote
  const handleDownvote = () => {
    if (voteDirection === -1) {
      // If already downvoted, do nothing
      return;
    } else if (voteDirection === 1) {
      // If currently upvoted, subtract 2 from upvotes
      setUpvotes(upvotes - 2);
    } else {
      // If no vote, subtract 1 from upvotes
      setUpvotes(upvotes - 1);
    }
    setVoteDirection(-1); // Set vote direction to downvote
    voteOnPost(postId, -1, accessToken); // Call the vote API
  };

  return (
    <div className="votes-container">
      <FontAwesomeIcon
        icon={faArrowUp}
        onClick={handleUpvote}
        className="upvote-button"
      />
      <p className="total-votes">{upvotes}</p>

      {/* Upvote and Downvote buttons */}

      <FontAwesomeIcon
        icon={faArrowDown}
        onClick={handleDownvote}
        className="downvote-button"
      />
    </div>
  );
};

export default Vote;
