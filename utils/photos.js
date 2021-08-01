import { useState, useCallback, useEffect } from "react";
import data from "../db/data.json";

export function getPostData() {
  const allPostData = [];

  data.map((image, index) => {
    const id = index;

    allPostData.push({
      id,
      ...image,
    });
  });

  return allPostData;
}

export function getAllPostIds() {
  return data.map((data, index) => {
    const id = index;
    return {
      params: {
        id: id.toString(),
      },
    };
  });
}

export function getOnePostData(id) {
  const filtered = data[id];

  return { id, ...filtered };
}

export function useMediaQuery(width) {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addListener(updateTarget);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeListener(updateTarget);
  }, []);

  return targetReached;
}
