import React, { useState } from "react";
import "./CSS/MediaViewer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const MediaViewer = ({ post, mediaUrl, postUrl, galleryData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // The current index of the image being shown

  console.log("galleryData:", galleryData?.items?.[0]); // Log the gallery data
  console.log("media-metadata:", post.data?.media_metadata); // Log the media metadata
  console.log("mediaUrl:", mediaUrl); // Log the media URL
  // Function to open the MediaViewer
  const openViewer = () => {
    setIsOpen(true);
    console.log("Opening MediaViewer isOpen:", isOpen);
    document.body.style.overflow = "hidden"; // Disable scrolling when the modal is open
  };

  // Function to close the MediaViewer
  const closeViewer = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto"; // Re-enable scrolling when the modal is closed
  };

  // Function to check if the mediaUrl is a fallback video
  const isVideoFallback = (url) => {
    if (!url) {
      return false; // or handle the case when url is null or undefined
    }
    const isFallback = url.toLowerCase().endsWith("fallback");
    return isFallback;
  };

  const galleryItems = post.data.gallery_data?.items; // Get the gallery items
  const mediaMetadata = post.data.media_metadata; // Get the media metadata
  const mediaId = galleryItems?.[currentIndex]?.media_id; // Get the media_id of the current item
  const currentImageUrl = mediaId ? mediaMetadata[mediaId]?.s?.u : null; // Get the URL of the current image

  // Function to handle "Next" button click of the carousel
  const goToNext = () => {
    if (galleryItems && galleryItems.length > 1) {
      setCurrentIndex((prevIndex) =>
        prevIndex === galleryItems.length - 1 ? 0 : prevIndex + 1
      );
      console.log("Current Index:", currentIndex);
    }
  };

  // Function to handle "Previous" button click of the carousel
  const goToPrevious = () => {
    if (galleryItems && galleryItems.length > 1) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? galleryItems.length - 1 : prevIndex - 1
      );
      console.log("Current Index:", currentIndex);
    }
  };

  return (
    <>
      <a
        // href={post.data.url}
        target="_blank"
        rel="noopener noreferrer"
        className="anchor-tag"
      >
        {/* {console.log("Post Preview Data:", post.data.preview)} */}
        {mediaUrl && !mediaUrl.startsWith("http") ? (
          <div className="text-content" onClick={openViewer}>
            {mediaUrl}
            {console.log("Media URL:", mediaUrl)}
          </div>
        ) : isVideoFallback(mediaUrl) ? (
          <video
            className="video"
            src={mediaUrl}
            controls
            onClick={openViewer}
          />
        ) : galleryData ? (
          // Show "Gallery" indicator if there are multiple images
          <div
            className={`gallery-indicator-container ${
              isOpen ? "hide-indicators" : ""
            }`}
          >
            <img
              className="image-indicator"
              src={mediaUrl}
              alt="Post Preview"
              onClick={openViewer}
            />
            <div className="gallery-indicator" onClick={openViewer}>Click for gallery</div>
          </div>
        ) : (
          <img
            className="image"
            src={mediaUrl}
            alt="Post Preview"
            onClick={openViewer}
          />
        )}
      </a>
      {/* Fullscreen MediaViewer when open */}
      {isOpen && (
        <div className="media-viewer-overlay">
          <div className="media-viewer-content">
            {typeof mediaUrl === "string" && !mediaUrl.startsWith("http") ? (
              <div className="text-content-fullscreen" onClick={openViewer}>
                {mediaUrl}
              </div>
            ) : isVideoFallback(mediaUrl) ? (
              <video
                className="video"
                src={mediaUrl}
                controls
                onClick={openViewer}
              />
            ) : galleryData ? (
              <div className="gallery-container">
                <button onClick={goToPrevious} className="arrow">
                  <FontAwesomeIcon icon={faArrowLeft} class="arrow-left" />
                </button>
                <img
                  className="gallery-image"
                  src={currentImageUrl}
                  alt="Post Preview"
                  onClick={openViewer}
                />
                <button onClick={goToNext} className="arrow">
                  <FontAwesomeIcon icon={faArrowRight} class="arrow-right" />
                </button>
              </div>
            ) : (
              <img
                className="image"
                src={mediaUrl}
                alt="Post Preview"
                onClick={openViewer}
              />
            )}
            <button className="close-btn" onClick={closeViewer}>
              X
            </button>
            <a
              href={postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="post-link"
            >
              View Original Post
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default MediaViewer;
