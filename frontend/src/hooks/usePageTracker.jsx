import { useEffect, useRef } from "react";
import axios from "axios";

const usePageTracker = (page) => {
  const didSendRequest = useRef(false); // Persist flag across renders

  useEffect(() => {
    if (!didSendRequest.current) {
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/api/track-page`,
          { page },
          { withCredentials: true }
        ) // Send cookies with request
        .then((response) => {
        })
        .catch((error) => {
          console.error("Error tracking page view:", error);
        });

      didSendRequest.current = true; // Prevent further requests
    }
  }, [page]); // Re-run if 'page' changes
};

export default usePageTracker;
