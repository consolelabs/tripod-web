import Image from "next/image";
import { useMemo, useState } from "react";
import { Board } from "../components/Board";
import { History } from "../components/History";
import { SEO } from "../components/SEO";
import { Shop } from "../components/Shop";
import { TransitionScreen } from "../components/TransitionScreen";
import { WelcomeScreen } from "../components/WelcomeScreen";
import { mappings } from "../constants/mappings";
import { useGameContext } from "../contexts/game";
import coins from "../public/coins.png";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Tippy from "@tippyjs/react";
import { Guides } from "../components/Guides";

const pointFormat = new Intl.NumberFormat().format;

export default function Home() {
  const [play, setPlay] = useState(true);
  const { game, renderCount, hoveredCell } = useGameContext();

  const hoveredPiece = useMemo(() => {
    if (hoveredCell.length === 0) {
      return;
    }

    return game?.state.board[hoveredCell[1]][hoveredCell[0]];
  }, [game, hoveredCell]);

  if (!game) {
    return <SEO />;
  }

  return (
    <>
      <SEO />
      <TransitionScreen>
        {(anim) => {
          return play ? (
            <div className="min-h-screen min-w-screen relative bg-map">
              <div className="absolute w-full h-full px-4 py-16 overflow-auto flex">
                <div className="grid grid-cols-4 max-w-[1280px] w-full m-auto gap-4">
                  <div className="col-span-4 text-white text-xs xl:text-xl grid grid-cols-2 xl:grid-cols-4 gap-2">
                    <div className="px-3 py-2 rounded-md bg-tripod-900/70 h-12">
                      <div className="flex items-center justify-between h-full">
                        <span>Points</span>
                        <span key={renderCount}>
                          {pointFormat(game.state.points)}
                        </span>
                      </div>
                    </div>
                    <div className="rounded-md bg-tripod-900/70">
                      <div className="px-3 py-2 flex items-center justify-between h-12">
                        <span>Current</span>
                        <Image
                          src={mappings[game.state.currentPiece.id].image}
                          width={32}
                          height={32}
                          alt="next piece"
                          key={renderCount}
                        />
                      </div>
                    </div>
                    <div className="rounded-md bg-tripod-900/70">
                      <div className="px-3 py-2 flex items-center justify-between h-12">
                        <span>Next Tier</span>
                        <span className="flex items-center space-x-2 justify-center">
                          {hoveredPiece && hoveredPiece.nextTierPiece ? (
                            <Image
                              src={
                                mappings[hoveredPiece.nextTierPiece.id].image
                              }
                              width={32}
                              height={32}
                              alt="next piece"
                              key={renderCount}
                            />
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                          <Tippy content="Hover a piece to see its next tier!">
                            <span>
                              <AiOutlineInfoCircle />
                            </span>
                          </Tippy>
                        </span>
                      </div>
                    </div>
                    <div className="px-3 py-2 rounded-md bg-tripod-900/70 h-12">
                      <div className="flex items-center justify-between h-full">
                        <span>Coins</span>
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
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4 xl:col-span-1 order-3 xl:order-none min-h-[320px]">
                    <History />
                  </div>
                  <div className="col-span-4 xl:col-span-2">
                    <div className="max-w-[320px] xl:max-w-[unset] mx-auto">
                      <Board />
                    </div>
                  </div>
                  <div className="col-span-4 xl:col-span-1">
                    <Shop />
                  </div>
                </div>
              </div>
              <Guides />
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
