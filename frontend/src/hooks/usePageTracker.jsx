import { useEffect, useRef } from "react";
import axios from "axios";

const usePageTracker = (page) => {
  const didSendRequest = useRef({}); // Track requests for specific pages

  useEffect(() => {
    const handlePageLoad = () => {
      if (!didSendRequest.current[page]) {
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/api/track-page`,
            { page },
            { withCredentials: true }
          ) // Send cookies with request
          .then((response) => {
            console.log("Page tracked successfully:", response.data);
          })
          .catch((error) => {
            console.error("Error tracking page view:", error);
          });

        didSendRequest.current[page] = true; // Mark request as sent for this page
      }
    };

    // Attach event listener for page load
    window.addEventListener("load", handlePageLoad);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("load", handlePageLoad);
    };
  }, [page]); // Re-run if 'page' changes
};

export default usePageTracker;
