import { useEffect, useRef, useState } from "react";

const useMediaStream = () => {
  const [state, setState] = useState<MediaStream | null>(null);
  const isStreamSet = useRef(false);

  useEffect(() => {
    if (isStreamSet.current) return;
    isStreamSet.current = true;
    (async function initStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        console.log("Setting your Stream");
        setState(stream);
      } catch (error) {
        console.log("Error in media Navigator", error);
      }
    })();
  }, []);

  return {
    stream: state,
  };
};

export default useMediaStream;
