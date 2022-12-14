import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import cln from "classnames";
import { clamp } from "../utils";
import { useGameContext } from "../contexts/game";
import { mappings } from "../constants/mappings";
import background from "../public/background.png";
import disk from "../public/disk.png";
import { PieceEnum } from "triple-pod-game-engine";

const size = 6;
const ratio = 1280 / 1300;
const chars = ["a", "b", "c", "d", "e", "f"];

type Props = {
  showGridText?: boolean;
};

export const Board = ({ showGridText = false }: Props) => {
  const { game, renderCount, put } = useGameContext();

  const [selectedCell, setSelectedCell] = useState([0, 0]);
  const selectedCellRef = useRef(selectedCell);

  const onCellClick = (rowIndex: number, colIndex: number) => {
    selectedCellRef.current = [rowIndex, colIndex];
    put(selectedCellRef.current[1], selectedCellRef.current[0]);
  };

  useEffect(() => {
    selectedCellRef.current = selectedCell;
  }, [selectedCell]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp": {
          setSelectedCell((o) => [
            clamp(0, size - 1, o[0] - 1),
            clamp(0, size - 1, o[1]),
          ]);
          break;
        }
        case "ArrowDown": {
          setSelectedCell((o) => [
            clamp(0, size - 1, o[0] + 1),
            clamp(0, size - 1, o[1]),
          ]);
          break;
        }
        case "ArrowLeft": {
          setSelectedCell((o) => [
            clamp(0, size - 1, o[0]),
            clamp(0, size - 1, o[1] - 1),
          ]);
          break;
        }
        case "ArrowRight": {
          setSelectedCell((o) => [
            clamp(0, size - 1, o[0]),
            clamp(0, size - 1, o[1] + 1),
          ]);
          break;
        }
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6": {
        }
        case "Enter":
        case " ": {
          put(selectedCellRef.current[1], selectedCellRef.current[0]);
          break;
        }
        default: {
          break;
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [put]);

  return (
    <div className="relative aspect-square">
      <div style={{ paddingTop: `calc(100% * ${ratio})` }}>
        <Image
          src={background}
          fill
          style={{ objectFit: "contain" }}
          alt=""
          priority
        />
      </div>
      <div className="font-medium p-[7%] text-white/30 absolute top-0 left-0 h-full w-full grid grid-cols-6 grid-rows-6">
        {game.state.board.map((row, rowIndex) => {
          return row.map((col, colIndex) => {
            const text = `${chars[colIndex]}${rowIndex + 1}`;
            const isEmpty = col.id === PieceEnum.EMPTY;
            return (
              <div
                key={`grid-${text}-${renderCount}`}
                className={cln(
                  "cell relative w-full h-full flex items-start justify-end",
                  {
                    "border-b border-tripod-900/70": rowIndex !== 5,
                    "border-r border-tripod-900/70": colIndex !== 5,
                    // selected:
                    //   selectedCell[0] === rowIndex &&
                    //   selectedCell[1] === colIndex,
                  }
                )}
                onClick={() => onCellClick(rowIndex, colIndex)}
              >
                {rowIndex === 0 && colIndex === 0 && (
                  <Image src={disk} width={200} height={200} alt="" />
                )}
                {col.id > 0 && (
                  <Image
                    src={mappings[col.id].image}
                    width={200}
                    height={200}
                    alt=""
                  />
                )}
                {isEmpty && (
                  <Image
                    className="absolute opacity-0 transition-opacity duration-75 ease-out"
                    width={200}
                    height={200}
                    src={mappings[game.state.currentPiece.id].image}
                    id="currentPiece"
                    alt="current piece"
                  />
                )}
                {showGridText && (
                  <span className="absolute top-0 right-0 m-2 rounded-full text-xs flex items-center justify-center">
                    {text}
                  </span>
                )}
              </div>
            );
          });
        })}
      </div>
    </div>
  );
};
