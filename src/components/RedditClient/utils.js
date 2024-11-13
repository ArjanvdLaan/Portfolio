export const extractMediaUrl = (post) => {
  // 0. Check if there is a reddit video and return its fallback_url
  const redditVideoUrl = post?.data?.secure_media?.reddit_video?.fallback_url;
  if (redditVideoUrl) {
    console.log(redditVideoUrl);
    return redditVideoUrl; // If a video exists, return the video URL
  }

  // 1. Try to get the URL from the gallery data using media_id
  const galleryItem = post?.data?.gallery_data?.items?.[0];
  const galleryUrl = galleryItem
    ? post?.data?.media_metadata?.[galleryItem.media_id]?.s?.u
    : null;

  // 2. If the gallery URL fails, try to get the highest resolution image URL from the preview
  let previewUrl = null;
  const resolutions = post?.data?.preview?.images?.[0]?.resolutions;
  if (resolutions) {
    for (let i = Math.min(5, resolutions.length - 1); i >= 0; i--) {
      if (resolutions[i]?.url) {
        previewUrl = resolutions[i].url;
        break;
      }
    }
  }
  // 3. If the preview URL fails, try to get the selftext
  const selftext = post?.data?.selftext;

  // 4. As a last fallback, use the thumbnail URL if it's a valid URL
  const thumbnailUrl = post?.data?.thumbnail;
  const validThumbnailUrl =
    thumbnailUrl && thumbnailUrl.startsWith("http") ? thumbnailUrl : null;

  // Return the first available URL in the order of preference
  return redditVideoUrl || galleryUrl || previewUrl || selftext || validThumbnailUrl;
};

export const calculateHoursSincePost = (createdUtc) => {
  const postDate = new Date(createdUtc * 1000); // Convert Unix timestamp to JavaScript Date object
  const currentDate = new Date();
  const diffInHours = Math.floor((currentDate - postDate) / (1000 * 60 * 60)); // Calculate difference in hours
  return diffInHours;
};
