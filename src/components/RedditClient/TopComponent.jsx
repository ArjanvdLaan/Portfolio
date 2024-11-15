import React, { useEffect, useState, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import SubredditSelector from "./components/SubredditSelector";
import { getRedditAuthUrl, getAccessToken } from "./auth";
import axios from "axios";

const TopComponent = () => {
  const [authCode, setAuthCode] = useState(null);
  // Retrieve access token from localStorage or set to null if not found
  const [accessToken, setAccessToken] = useState(() => {
    const storedToken = localStorage.getItem("accessToken");
    return storedToken ? storedToken : null;
  });
  const [posts, setPosts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken); // Track authentication state
  const [page, setPage] = useState(1); // State to keep track of which page (batch) of posts we are on
  const [isLoading, setIsLoading] = useState(false); // State to track if the next set of posts is being loaded
  const loadMoreRef = useRef(null); // Ref for the "Load More" element
  const [after, setAfter] = useState(null); // State to keep track of the last post ID
  const [initialLoad, setInitialLoad] = useState(true);
  const [subreddit, setSubreddit] = useState("pics");

  useEffect(() => {
    // Check if the URL has a code parameter (this happens after returning from Reddit login)
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    // If there's no access token and we have an auth code, use it to get an access token
    if (!accessToken && code) {
      console.log("Authorization Code Detected:", code);
      setAuthCode(code);
    } else if (!accessToken && !code) {
      console.log("No access token or auth code found, redirecting to login");
      window.location.href = getRedditAuthUrl(); // Trigger login flow if nothing is available
    }
  }, [accessToken]);

  useEffect(() => {
    if (authCode && !accessToken) {
      getAccessToken(authCode).then((token) => {
        if (token) {
          console.log("Access Token Retrieved:", token);
          setAccessToken(token);
          setIsAuthenticated(true); // Mark as authenticated
          localStorage.setItem("accessToken", token); // Save token to localStorage
          // Clean the URL to remove auth code after successful exchange
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
        } else {
          console.log("Failed to get access token. Redirecting to login...");
          setAuthCode(null);
          localStorage.removeItem("accessToken");
          window.location.href = getRedditAuthUrl();
        }
      });
    }
  }, [authCode, accessToken]);

  // Function to fetch posts from Reddit API
  const fetchPosts = async (pageNum, selectedSubreddit) => {
    console.log("Fetching posts for page:", pageNum); // Debug log
    if (!accessToken) return; // Exit if accessToken is not available

    try {
      setIsLoading(true); // Set loading state to true while fetching

      let validPosts = []; // Array to collect valid posts
      let currentAfter = after; // Initialize 'after' parameter with the last post ID

      // Keep fetching until 3 valid posts
      while (validPosts.length < 3) {
        // Fetch 10 posts in one go to increase the chances of getting 3 valid ones
        const response = await axios.get(
          `https://oauth.reddit.com/r/${selectedSubreddit}/hot?limit=10&raw_json=1${
            currentAfter ? `&after=${currentAfter}` : ""
          }`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        // Filter out the posts with a 'selftext' property
        const newPosts = response.data.data.children.filter(
          (post) => !post.data.selftext
        );

        // Create a new array by combining all elements from validPosts and newPosts.
        validPosts = [...validPosts, ...newPosts];

        // Update 'after' parameter to continue fetching from where we left off
        currentAfter = response.data.data.after;

        // If there's no more 'after' value from Reddit, break to prevent infinite loop
        if (!currentAfter) {
          break;
        }
      }

      // Limit to 3 valid posts if more than 3 were collected
      validPosts = validPosts.slice(0, 3);

      // Update the state with the valid posts
      setPosts((prevPosts) => [...prevPosts, ...validPosts]);
      setAfter(currentAfter); // Save the current 'after' parameter for the next fetch
      console.log("Valid Posts Retrieved:", validPosts);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      if (error.response?.status === 401) {
        console.log("Access Token expired or invalid. Re-authorizing...");
        localStorage.removeItem("accessToken");
        setAccessToken(null);
        window.location.href = getRedditAuthUrl(); // Redirect to reauthorize
      }
    } finally {
      setIsLoading(false); // Set loading state to false once fetching is complete
    }
  };

  // Update subreddit when the user selects a different one
  const handleSubredditChange = (newSubreddit) => {
    console.log("handleSubredditChange is run with:", newSubreddit);
    setSubreddit(newSubreddit); // Update the subreddit
    setPosts([]); // Clear old posts
    setPage(1); // Reset page number
    setAfter(null); // Reset the last post ID
    setInitialLoad(true); // Set initialLoad to true to skip fetching posts on initial render
  };

  // Fetch posts when the component mounts or when the page changes
  useEffect(() => {
    console.log("Current Page:", page);
    console.log("Third useEffect is run with:", subreddit);
    console.log("Dependencies: page =", page, ", subreddit =", subreddit);
    // Log the current page number
    if (initialLoad) {
      console.log(
        "Skipping fetchPosts due to initial load and setting initialLoad to false"
      );
      setInitialLoad(false);
    } else {
      console.log("not skipping initial load");
      fetchPosts(page, subreddit);
    }
  }, [page, subreddit]);

  // Intersection Observer to detect when the "Load More" element comes into view
  useEffect(() => {
    console.log("useEffect intersection observer is run");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setPage((prevPage) => prevPage + 1); // Increment page number to load the next batch
        }
      },
      { threshold: 1.0 } // Trigger when the element is fully in view
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [isLoading]);

  // Display login button if no auth code or access token is available
  if (!authCode && !accessToken) {
    console.log(authCode, accessToken);
    return (
      <div>
        <button onClick={() => (window.location.href = getRedditAuthUrl())}>
          Login with Reddit
        </button>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <div className="reddit-client-container">
              <SubredditSelector onSubredditChange={handleSubredditChange} />
              <HomePage
                posts={posts}
                accessToken={accessToken}
                setPosts={setPosts}
                loadMoreRef={loadMoreRef}
                isLoading={isLoading}
              />
            </div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/login"
        element={
          <LoginPage
            onClick={() => (window.location.href = getRedditAuthUrl())}
          />
        }
      />
    </Routes>
  );
};

export default TopComponent;
