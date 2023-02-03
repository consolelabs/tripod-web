import { useEffect, useMemo, useState } from "react";
import { isSSR } from "../consts";

type AudioType = "click" | "start" | "merge" | "explosion" | "buy" | "error";

export const useAudio = () => {
  const { click, start, merge, explosion, buy, error, bg } = useMemo(() => {
    if (isSSR()) {
      return {};
    }

    return {
      start: new Audio("audio/start.mp3"),
      click: new Audio("audio/click.mp3"),
      merge: new Audio("audio/merge.mp3"),
      explosion: new Audio("audio/explosion.mp3"),
      buy: new Audio("audio/buy.mp3"),
      error: new Audio("audio/error.mp3"),
      bg: new Audio("audio/bg.mp3"),
    };
  }, []);

  const playAudio = (type: AudioType) => {
    if (isSSR()) {
      return;
    }

    switch (type) {
      case "start": {
        start!.currentTime = 0;
        start!.play();
        break;
      }
      case "click": {
        click!.currentTime = 0;
        click!.play();
        break;
      }
      case "merge": {
        buy!.currentTime = 0;
        merge!.play();
        break;
      }
      case "explosion": {
        explosion!.currentTime = 0;
        explosion!.volume = 0.2;
        explosion!.play();
        break;
      }
      case "buy": {
        buy!.currentTime = 0.5;
        buy!.play();
        setTimeout(() => {
          buy!.pause();
          buy!.currentTime = 0;
        }, 1000);
        break;
      }
      case "error": {
        error!.currentTime = 0.3;
        error!.play();
        break;
      }
      default: {
        break;
      }
    }
  };

  const [isBgAudioEnabled, setIsBgAudioEnabled] = useState(false);
  const toggleBgAudio = () => {
    setIsBgAudioEnabled((o) => {
      if (o) {
        bg!.muted = true;
        return false;
      } else {
        bg!.play();
        bg!.muted = false;
        return true;
      }
    });
    playAudio("click");
  };

  return {
    isBgAudioEnabled,
    playAudio,
    toggleBgAudio,
  };
};
