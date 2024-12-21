import React, { useEffect, useRef } from "react";
import { Disclosure } from "@headlessui/react";
import "./CSS/Title.css";

const Title = ({ post }) => {
  const titleRef = useRef(null); // Ref for the title element

  // Determine the length of the truncated title
  const titleText = post.data.title;
  const truncatedLength = 60; // Number of characters to show initially

  let displayedTitle = titleText;
  let remainingTitle = "";

  // Check if the title is overflowing
  if (titleText.length > truncatedLength) {
    // Find the last space within the truncated length
    let endIndex = titleText.lastIndexOf(" ", truncatedLength);
    displayedTitle = titleText.substring(0, endIndex);
    remainingTitle = titleText.substring(endIndex).trim(); // Remaining part of the title
  }

  useEffect(() => {
    if (titleText.length > truncatedLength) {
      // Set the style of the cursor of the dislosure button to be pointer
      titleRef.current.style.cursor = "pointer";
    }
  });

  return (
    <div className="disclosure-container">
      <Disclosure>
        <>
          <div className="title-wrapper">
            {/* Truncated title with ellipsis */}
            <Disclosure.Button
              ref={titleRef}
              className="disclosure-button"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {displayedTitle}
              {remainingTitle && "..."}{" "}
              {/* Show ellipsis if there is remaining title */}
            </Disclosure.Button>

            {/* Show down-pointing arrow only if overflowing */}
            {remainingTitle && (
              <Disclosure.Button className="arrow-button">▼</Disclosure.Button>
            )}
          </div>

          {/* Full title revealed in the Disclosure.Panel */}
          <Disclosure.Panel className="disclosure-panel">
            {remainingTitle} {/* Show only the remaining part of the title */}
          </Disclosure.Panel>
        </>
      </Disclosure>
    </div>
  );
};

export default Title;
