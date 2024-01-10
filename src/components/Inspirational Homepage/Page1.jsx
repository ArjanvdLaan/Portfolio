import { useState, useEffect } from "react";
import axios from "axios";
import "./Page1.css";
import { InspirationalHomepage } from "./components/InspirationalHomepage/InspirationalHomepage";

const Page1 = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // every time component mounts, fetch images
  useEffect(() => {
    fetchImages();
  }, []);

  // preload images to show them faster
  useEffect(() => {
    imageUrls.forEach((imageUrl) => {
      const img = document.createElement("img");
      img.src = imageUrl;
      img.style.display = "none"; // make the image hidden
      document.body.appendChild(img); // append the image to the body
    });
  }, [imageUrls]);

  // fetch images from unsplash
  const fetchImages = async () => {
    try {
      const cachedImages = localStorage.getItem("images");
      if (cachedImages) {
        setImageUrls(JSON.parse(cachedImages));
      } else {
        const responses = await Promise.all(
          Array(5)
            .fill()
            .map(() =>
              axios.get(
                "https://api.unsplash.com/photos/random?query=nature&w=1920",
                {
                  headers: {
                    Authorization: `Client-ID ${
                      import.meta.env.VITE_IMAGES_API_KEY
                    }`,
                  },
                }
              )
            )
        );

        const urls = responses.map((response) => response.data.urls.full);
        setImageUrls(urls);

        // Cache the images
        localStorage.setItem("images", JSON.stringify(urls));
      }
    } catch (error) {
      if (error.response) {
        // checking different error responses
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // Request made, no response received
        console.log(error.request);
      } else {
        // Something happened in setting up the request
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };
  // clear images from local storage
  // function clearImages() {
  //   localStorage.removeItem("images");
  // }
  // clearImages();

  // cycle through images
  const cycleImages = (direction) => {
    if (direction === "left") {
      setCurrentImageIndex(
        (oldIndex) => (oldIndex - 1 + imageUrls.length) % imageUrls.length
      );
    } else if (direction === "right") {
      setCurrentImageIndex((oldIndex) => (oldIndex + 1) % imageUrls.length);
    }
  };

  return (
    <>
      <div className="App">
        <div className="background">
          {imageUrls.length > 0 && (
            <img
              src={imageUrls[currentImageIndex]}
              loading="lazy"
              alt="background image"
            />
          )}
        </div>
        <div className="inspirational-homepage">
          <InspirationalHomepage />
        </div>
      </div>
      <i
        className="fas fa-chevron-left arrow-left"
        onClick={() => cycleImages("left")}
      ></i>
      <i
        className="fas fa-chevron-right arrow-right"
        onClick={() => cycleImages("right")}
      ></i>
    </>
  );
};

export default Page1;
