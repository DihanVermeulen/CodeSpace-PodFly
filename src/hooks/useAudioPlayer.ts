import { useEffect, useRef, useState } from "react";

export const useAudioPlayer = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  /* If the audio is playing and the user tries to exit the page,
   * a confirmation message is given.
   */
  useEffect(() => {
    const giveConfirmationMessageBeforeClosing = (event: any) => {
      if (isPlaying) {
        // Cancel the event
        event.preventDefault();
        return "Are you sure you want to leave? Your audio will stop playing.";
      }
    };
    // Check if audio is playing

    window.addEventListener(
      "beforeunload",
      giveConfirmationMessageBeforeClosing
    );
    return () =>
      window.removeEventListener(
        "beforeunload",
        giveConfirmationMessageBeforeClosing
      );
  }, [isPlaying]);

  // Handles the time update
  useEffect(() => {
    const audioElement = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audioElement?.currentTime || 0);
      setDuration(audioElement?.duration || 0);
    };

    audioElement?.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audioElement?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audioRef]);

  // Handles the dragging of the progress
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging && audioRef.current && !audioRef.current.paused) {
        setCurrentTime(audioRef.current.currentTime);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [isDragging, audioRef]);

  const handleProgressChange = (_event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setCurrentTime(newValue);
      if (audioRef.current) audioRef.current.currentTime = newValue;
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (audioRef.current) audioRef.current.currentTime = currentTime;
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return {
    audioRef,
    currentTime,
    duration,
    isDragging,
    isPlaying,
    setIsPlaying,
    handleProgressChange,
    handleDragStart,
    handleDragEnd,
    handlePlayPause,
  };
};

export default useAudioPlayer;
