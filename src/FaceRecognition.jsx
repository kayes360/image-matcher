import React, { useEffect, useState } from "react";
import * as faceapi from "face-api.js";

export default function FaceRecognition() {
  const [matches, setMatches] = useState([]);  
  const [currentImage, setCurrentImage] = useState(null);
  const [images, setImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [loadingComparison, setLoadingComparison] = useState(false);
  const [imageLoadProgress, setImageLoadProgress] = useState("0/0"); 
  const [comparisonProgress, setComparisonProgress] = useState("0/0");  

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    };

    const getImages = async () => {
      try {
        const response = await fetch("/imageList.json");  
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching image list:", error);
      }
    };

    const initialize = async () => {
      await loadModels();
      await getImages();
    };

    initialize();
  }, []);

  useEffect(() => {
    const loadAllImages = async () => {
      if (images.length === 0) return; // Prevent running if images are not loaded yet

      setLoadingImages(true);
      for (let i = 0; i < images.length; i++) {
        await faceapi.fetchImage(`/imagecollection/${images[i]}`);
        setImageLoadProgress(`Image Loaded: ${i + 1}/${images.length}`);
      }
      setLoadingImages(false);
      setLoadingComparison(true);
      compareFaces();
    };

    const compareFaces = async () => {
      if (images.length === 0) {
        console.error("No images to compare");
        return;
      }

      const myImage = await faceapi.fetchImage("/myimage/myphoto.png");
      const myDescriptor = await faceapi
        .detectSingleFace(myImage)
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!myDescriptor) {
        console.error("No face detected in myphoto.png");
        return;
      }

      const myFace = new faceapi.LabeledFaceDescriptors("MyFace", [
        myDescriptor.descriptor,
      ]);

      let matchResults = [];

      for (let i = 0; i < images.length; i++) {
        setCurrentImage(`/imagecollection/${images[i]}`);
        setComparisonProgress(`Comparing: ${i + 1}/${images.length}`); // Update comparison progress

        const image = await faceapi.fetchImage(`/imagecollection/${images[i]}`);
        const result = await faceapi
          .detectSingleFace(image)
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (result) {
          const distance = faceapi.euclideanDistance(
            myFace.descriptors[0],
            result.descriptor
          );
 
          if (distance < 0.6) {
            matchResults.push({ image: images[i], distance });
          }
        }

        await new Promise((resolve) => setTimeout(resolve, 500));  
      }
 
      matchResults.sort((a, b) => a.distance - b.distance);

      setMatches(matchResults);
      setLoadingComparison(false);
    };

    if (images.length > 0) {
      loadAllImages();
    }
  }, [images]); // Run after images are loaded

  return (
    <div className="flex flex-col p-10">
      <h2 className="text-lg font-bold">Real-Time Face Matching</h2>
      <div className="flex gap-8 mt-4">
        {/* My Image */}
        <div className="flex flex-col items-center">
          <h3>Your Image</h3>
          <img
            src="/myimage/myphoto.png"
            alt="Your Face"
            className="w-40 h-40 object-cover rounded"
          />
          {/* Show Image Load Progress */}
          {loadingImages && <p className="mt-2 text-gray-700">{imageLoadProgress}</p>}
          {/* Show Comparison Progress after images load */}
          {!loadingImages && loadingComparison && (
            <p className="mt-2 text-gray-700">{comparisonProgress}</p>
          )}
        </div>

        {/* Comparing Image */}
        <div className="flex flex-col items-center">
          <h3>Comparing with:</h3>
          {loadingImages ? (
            <p>Loading Images...</p>
          ) : loadingComparison ? (
            <img
              src={currentImage}
              alt="Comparing Face"
              className="h-96 w-[800px] object-contain rounded border-4 border-blue-500"
            />
          ) : (
            <p>Comparison Complete!</p>
          )}
        </div>
      </div>

      {/* Display All Matches */}
      <h2 className="mt-6 text-xl font-bold text-green-600">
        Matches Found: {matches.length}
      </h2>
      {matches.length > 0 && (
        <div className="flex flex-wrap mt-4 gap-4">
          {matches.map((match, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={`/imagecollection/${match.image}`}
                alt={`Match ${index + 1}`}
                className="w-32 h-32 object-cover rounded border-4 border-green-500"
              />
              <p className="text-gray-700 font-semibold">Matched: {match.image}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

