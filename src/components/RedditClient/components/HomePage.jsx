import React from "react";
import Icons from "./Icons";
import Vote from "./Vote";
import MediaViewer from "./MediaViewer";
import LoadingPlaceholder from "./LoadingPlaceholder";
import { extractMediaUrl, calculateHoursSincePost } from "../utils";
import "./CSS/HomePage.css";

const HomePage = ({
  posts,
  setPosts,
  loadMoreRef,
  isLoading,
  accessToken,
  initialLoad,
}) => {
  return (
    <div className="homepage-container">
      <div className="space-div"></div>
      <div>
        <ul className="posts-container">
          {console.log("Homepage gets rendered!")}
          {posts.map((post) => {
            const mediaUrl = extractMediaUrl(post); // Get the media URL or fallback image
            const author = post.data.author; // Access the author's username
            const galleryData = post.data.gallery_data
              ? post.data.gallery_data
              : null;
            const hoursSincePost = calculateHoursSincePost(
              post.data.created_utc
            ); // Calculate hours since posting
            const postUrl = post.data.url; // Access the URL of the post
            const numComments = post.data.num_comments; // Access the number of comments
            return (
              <React.Fragment key={post.data.id}>
                <div className="post">
                  <li className="title" key={post.data.id}>
                    {post.data.title}
                  </li>
                  <div className="vote-container">
                    <Vote post={post} accessToken={accessToken} />
                  </div>
                  <MediaViewer
                    post={post}
                    mediaUrl={mediaUrl}
                    postUrl={postUrl}
                    galleryData={galleryData}
                  />
                  <li className="nada"></li> {/*for styling purposes */}
                  <li className="info">
                    <p>
                      Posted by {author} • {hoursSincePost} hours ago •{" "}
                      {numComments} comments
                    </p>
                  </li>
                </div>
              </React.Fragment>
            );
          })}
        </ul>
        {/* This element is observed to trigger loading more posts */}
        <div ref={loadMoreRef} style={{ height: "350px" }}>
          {/* Show loading placeholders while fetching new posts */}
          {isLoading && !initialLoad && 
          <LoadingPlaceholder />}
        </div>
      </div>
      <div className="title-container">
        <Icons />
      </div>
    </div>
  );
};

export default HomePage;
