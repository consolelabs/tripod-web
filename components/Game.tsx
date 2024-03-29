import Tippy from "@tippyjs/react";
import Image from "next/image";
import React, { useMemo } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { PieceEnum, robot } from "triple-pod-game-engine";
import { mappings } from "../constants/mappings";
import { shopItems } from "../constants/shopItems";
import { useGameContext } from "../contexts/game";
import { Hint } from "./Hint";
import coins from "../public/coins.png";
import { History } from "./History";
import { Board } from "./Board";
import { Shop } from "./Shop";

const pointFormat = new Intl.NumberFormat().format;

export default function Game() {
  const { game, renderCount } = useGameContext();

  const {
    isBoardFull = false,
    isPurchasingAvailable = false,
    isSwappingAvailable = false,
  } = useMemo(() => {
    if (!game) {
      return {};
    }

    let isBoardFull = true;
    for (let i = 0; i < game.state.board.length; i++) {
      for (let j = 0; j < game.state.board[0].length; j++) {
        if (i === 0 && j === 0) {
          continue;
        }

        if (game.state.board[i][j].id === PieceEnum.EMPTY) {
          isBoardFull = false;
        }
      }
    }

    const itemsThatWillAffectGameEnd = shopItems.filter(
      (item) => item.willAffectGameEnd
    );
    const isPurchasingAvailable = itemsThatWillAffectGameEnd.some(
      (item) => item.price <= game.state.coins
    );
    const isSwappingAvailable = [...itemsThatWillAffectGameEnd, robot].some(
      (item) => game.state.swapPiece?.id === item.id
    );

    return { isBoardFull, isPurchasingAvailable, isSwappingAvailable };
  }, [renderCount]); // eslint-disable-line

  return (
    <div className="min-h-screen min-w-screen relative bg-map">
      <div className="absolute w-full h-full px-4 py-16 overflow-auto flex">
        <div className="grid grid-cols-10 max-w-[1200px] w-full m-auto gap-4">
          <div className="col-span-10 text-white text-xs lg:text-base grid grid-cols-2 lg:grid-cols-4 gap-2">
            <div className="px-3 py-2 rounded-md bg-tripod-900/70 h-12">
              <div className="flex items-center justify-between h-full">
                <span>Points</span>
                <span key={renderCount}>{pointFormat(game.state.points)}</span>
              </div>
            </div>
            <div className="rounded-md bg-tripod-900/70">
              <div className="px-3 py-2 flex items-center justify-between h-12">
                <span>Current</span>
                <Image
                  key={
                    (mappings[game.state.currentPiece.id].image as any) ||
                    renderCount
                  }
                  src={mappings[game.state.currentPiece.id].image}
                  width={32}
                  height={32}
                  alt="next piece"
                />
              </div>
            </div>
            <div className="rounded-md bg-tripod-900/70">
              <div className="px-3 py-2 flex items-center justify-between h-12">
                <span>Next Tier</span>
                <span className="flex items-center space-x-2 justify-center">
                  {game.state.currentPiece &&
                  game.state.currentPiece.nextTierPiece ? (
                    <Image
                      key={
                        (mappings[game.state.currentPiece.nextTierPiece.id]
                          .image as any) || renderCount
                      }
                      src={
                        mappings[game.state.currentPiece.nextTierPiece.id].image
                      }
                      width={32}
                      height={32}
                      alt="next piece"
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
            <Hint
              enabled={isBoardFull && isPurchasingAvailable}
              hint="You still have coins left! Buy an item to keep fighting!"
              className="px-3 py-2 rounded-md bg-tripod-900/70 h-12"
            >
              <div className="flex items-center justify-between h-full">
                <span>Coins</span>
                <span className="flex items-center space-x-2">
                  <Image src={coins} width={20} height={20} alt="coins" />
                  <span key={renderCount}>{pointFormat(game.state.coins)}</span>
                </span>
              </div>
            </Hint>
          </div>
          <div className="col-span-10 lg:col-span-3 order-3 lg:order-none min-h-[320px]">
            <History />
          </div>
          <div className="col-span-10 lg:col-span-4">
            <Hint
              className="max-w-[320px] lg:max-w-[unset] mx-auto"
              enabled={isBoardFull && isSwappingAvailable}
              hint="You still have one trick up your storage! Don't give up too soon!"
              placement="bottom"
            >
              <Board />
            </Hint>
          </div>
          <div className="col-span-10 lg:col-span-3">
            <Shop />
          </div>
        </div>
      </div>
    </div>
  );
}
