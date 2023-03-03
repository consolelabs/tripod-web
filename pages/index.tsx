import { useEffect, useState } from "react";
import { SEO } from "../components/SEO";
import { TransitionScreen } from "../components/TransitionScreen";
import { WelcomeScreen } from "../components/WelcomeScreen";
import { useGameContext } from "../contexts/game";
import { Guides } from "../components/Guides";
import Postmate from "postmate";
import dynamic from "next/dynamic";

const Game = dynamic(() => import("../components/Game"));

export default function Home() {
  const [parent, setParent] = useState<Postmate.ChildAPI>();
  const [play, setPlay] = useState(false);
  const { game, isGameDone, playAudio, toggleBgAudio } = useGameContext();

  useEffect(() => {
    new Postmate.Model({}).then((parent) => {
      setParent(parent);
    });
  }, []);

  useEffect(() => {
    if (isGameDone) {
      parent?.emit("game-point", { point: game.state.points, game: "tripod" });
    }
  }, [isGameDone]); // eslint-disable-line

  if (!game) {
    return <SEO />;
  }

  return (
    <>
      <SEO />
      <TransitionScreen>
        {(anim) => {
          return play ? (
            <Game />
          ) : (
            <WelcomeScreen
              play={() => {
                playAudio("start");
                toggleBgAudio();
                anim.addEventListener(
                  "finish",
                  () => {
                    setPlay(true);
                    setTimeout(() => {
                      anim.reverse();
                    }, 500);
                  },
                  { once: true }
                );
                anim.play();
              }}
            />
          );
        }}
      </TransitionScreen>
      <Guides />
    </>
  );
}
