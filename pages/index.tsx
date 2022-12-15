import Image from "next/image";
import { useState } from "react";
import { Board } from "../components/Board";
import { Guides } from "../components/Guides";
import { SEO } from "../components/SEO";
import { Shop } from "../components/Shop";
import { TransitionScreen } from "../components/TransitionScreen";
import { WelcomeScreen } from "../components/WelcomeScreen";
import { mappings } from "../constants/mappings";
import { useGameContext } from "../contexts/game";
import coins from "../public/coins.png";

const pointFormat = new Intl.NumberFormat().format;

export default function Home() {
  const [play, setPlay] = useState(false);
  const { game, renderCount } = useGameContext();

  if (!game) {
    return;
  }

  return (
    <>
      <SEO />
      <TransitionScreen>
        {(anim) => {
          return play ? (
            <div className="overflow-auto flex min-h-screen min-w-screen relative bg-map">
              <div className="absolute w-full h-full flex items-center">
                <div className="flex flex-wrap max-w-[960px] w-full mx-auto gap-y-5">
                  <div className="w-full text-white text-xs md:text-xl space-x-1 flex">
                    <div className="rounded-md bg-tripod-900/70 w-1/3">
                      <div className="px-3 py-2 flex items-center justify-between h-full">
                        <span>Next</span>
                        <Image
                          src={mappings[game.state.currentPiece.id].image}
                          width={28}
                          height={28}
                          alt="next piece"
                          key={renderCount}
                        />
                      </div>
                    </div>
                    <div className="px-3 py-2 rounded-md bg-tripod-900/70 w-1/3">
                      <div className="flex items-center justify-between h-full">
                        <span key={renderCount}>
                          {pointFormat(game.state.points)}
                        </span>
                        <span>Points</span>
                      </div>
                    </div>
                    <div className="px-3 py-2 rounded-md bg-tripod-900/70 w-1/3">
                      <div className="flex items-center justify-between h-full">
                        <span className="flex items-center space-x-2">
                          <Image
                            src={coins}
                            width={20}
                            height={20}
                            alt="coins"
                          />
                          <span key={renderCount}>
                            {pointFormat(game.state.coins)}
                          </span>
                        </span>
                        <span>Coins</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-2/3">
                    <Board />
                  </div>
                  <div className="w-full md:w-1/3 px-3">
                    <Shop />
                  </div>
                  <div className="w-full">
                    <Guides />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <WelcomeScreen
              play={() => {
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
    </>
  );
}
