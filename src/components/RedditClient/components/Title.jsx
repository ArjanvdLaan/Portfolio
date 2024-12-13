import React, { useState, useEffect, useRef } from "react";
import { Disclosure } from "@headlessui/react";
import "./CSS/Title.css";

const Title = ({ post }) => {
  const [isOverflowing, setIsOverflowing] = useState(false); // State to track if the title is overflowing
  const titleRef = useRef(null); // Ref for the title element


  // Determine the length of the truncated title
  const titleText = post.data.title;
  const truncatedLength = 50; // Number of characters to show initially
  const displayedTitle = titleText.substring(0, truncatedLength);
  const remainingTitle = titleText.substring(truncatedLength); // Remaining part of the title

  console.log("isOverflowing:", isOverflowing);

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
              {remainingTitle && '...'} {/* Show ellipsis if there is remaining title */}
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
