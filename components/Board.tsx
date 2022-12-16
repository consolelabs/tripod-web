import React, { useEffect, useState } from "react";
import Image from "next/image";
import cln from "classnames";
import { useGameContext } from "../contexts/game";
import { mappings } from "../constants/mappings";
import background from "../public/background.webp";
import disk from "../public/disk.webp";
import {
  Piece,
  PieceEnum,
  levelByPiece,
  Position,
} from "triple-pod-game-engine";
import { useTransition, animated } from "@react-spring/web";

const chars = ["a", "b", "c", "d", "e", "f"];

type Props = {
  showGridText?: boolean;
};

const TripodPiece = ({
  id,
  x,
  y,
  lastActionPos,
}: {
  id: PieceEnum;
  x: number;
  y: number;
  lastActionPos: Position;
}) => {
  const transitions = useTransition(id, {
    from: {
      opacity: 1,
      scale: 1,
      x: "0%",
      y: "0%",
    },
    leave: (item) => {
      const pieceKeys = Object.keys(
        levelByPiece
      ) as unknown as Array<PieceEnum>;
      const isPiece =
        item === PieceEnum.EMPTY ||
        pieceKeys.some((p) => String(p) === String(item));

      const [lastX, lastY] = lastActionPos;
      let shift = {
        x: "0%",
        y: "0%",
      };

      if (isPiece) {
        if (lastX > x) {
          shift.x = "100%";
        } else if (lastX < x) {
          shift.x = "-100%";
        }

        if (lastY > y) {
          shift.y = "100%";
        } else if (lastY < y) {
          shift.y = "-100%";
        }
      }

      return {
        position: "absolute",
        opacity: isPiece ? 0 : 1,
        scale: isPiece ? 0.8 : 1,
        ...shift,
      };
    },
  });

  return transitions((style, id) => (
    <animated.div style={style}>
      <Image
        src={mappings[id].image}
        width={200}
        height={200}
        alt="piece item"
      />
    </animated.div>
  ));
};

export const Board = ({ showGridText = false }: Props) => {
  const {
    game,
    renderCount,
    selectedCells,
    hoveredCell,
    setHoveredCell,
    put,
    use,
    swap,
    setSelectedCells,
    putPreview,
  } = useGameContext();

  const [pieceToPut, setPieceToPut] = useState<Piece | undefined>();

  const onCellClick = ({
    x,
    y,
    isEmpty,
  }: {
    x: number;
    y: number;
    isEmpty: boolean;
  }) => {
    if (!game) {
      return;
    }

    const currentPos = [x, y];

    if (x === 0 && y === 0) {
      swap();

      return;
    }

    switch (game.state.currentPiece.id) {
      case PieceEnum.AIRDROPPER: {
        if (selectedCells.length === 0 && !isEmpty) {
          setSelectedCells([currentPos]);
          setPieceToPut(game.state.board[y][x]);
        }

        if (selectedCells.length === 1) {
          use(PieceEnum.AIRDROPPER, {
            target: selectedCells[0],
            dest: currentPos,
          });
        }

        break;
      }
      case PieceEnum.TELEPORT_PORTAL: {
        if (isEmpty) {
          break;
        }

        if (selectedCells.length === 0) {
          setSelectedCells([currentPos]);
        } else {
          use(PieceEnum.TELEPORT_PORTAL, {
            posA: selectedCells[0],
            posB: currentPos,
          });
        }

        break;
      }
      case PieceEnum.MEGA_BOMB: {
        use(PieceEnum.MEGA_BOMB, { pos: currentPos });
        break;
      }
      case PieceEnum.BOMB: {
        use(PieceEnum.BOMB, { pos: currentPos });
        break;
      }
      default: {
        if (isEmpty || pieceToPut?.id === PieceEnum.ROBOT) {
          put(currentPos[0], currentPos[1]);
        }
        break;
      }
    }
  };

  useEffect(() => {
    setPieceToPut(game.state.currentPiece);
  }, [renderCount]); // eslint-disable-line

  return (
    <div className="relative aspect-square">
      <Image
        className="rounded-xl"
        src={background}
        style={{ objectFit: "contain" }}
        alt=""
      />
      <div className="font-medium p-[7%] text-white/30 absolute top-0 left-0 h-full w-full grid grid-cols-6 grid-rows-6">
        {game.state.board.map((row, rowIndex) => {
          return row.map((col, colIndex) => {
            const text = `${chars[colIndex]}${rowIndex + 1}`;
            const isEmpty = col.id === PieceEnum.EMPTY;
            const swapPiece = game.state.swapPiece?.id
              ? mappings[game.state.swapPiece.id].image
              : null;

            const isTargeted =
              !(rowIndex === 0 && colIndex === 0) &&
              (selectedCells.some(([x, y]) => {
                return x === colIndex && y === rowIndex;
              }) ||
                (pieceToPut?.id === PieceEnum.MEGA_BOMB &&
                  rowIndex - hoveredCell[1] >= 0 &&
                  rowIndex - hoveredCell[1] <= 1 &&
                  colIndex - hoveredCell[0] >= 0 &&
                  colIndex - hoveredCell[0] <= 1) ||
                (pieceToPut?.id == PieceEnum.BOMB &&
                  rowIndex === hoveredCell[1] &&
                  colIndex === hoveredCell[0]));

            const shouldShowPreview =
              (rowIndex !== 0 || colIndex !== 0) &&
              isEmpty &&
              pieceToPut &&
              ![
                PieceEnum.TELEPORT_PORTAL,
                PieceEnum.MEGA_BOMB,
                PieceEnum.BOMB,
              ].includes(pieceToPut?.id);

            return (
              <div
                key={`grid-${text}`}
                className={cln(
                  "cell relative w-full h-full flex items-start justify-end",
                  {
                    "border-b border-tripod-900/70": rowIndex !== 5,
                    "border-r border-tripod-900/70": colIndex !== 5,
                  }
                )}
                onClick={() =>
                  onCellClick({ x: colIndex, y: rowIndex, isEmpty })
                }
              >
                {rowIndex === 0 && colIndex === 0 && (
                  <>
                    <Image src={disk} width={200} height={200} alt="" />
                    {swapPiece && (
                      <Image
                        src={swapPiece}
                        alt="swap piece"
                        className="absolute"
                      />
                    )}
                  </>
                )}
                <TripodPiece
                  id={col.id}
                  x={colIndex}
                  y={rowIndex}
                  lastActionPos={game.state.lastActionPos}
                />
                {shouldShowPreview && (
                  <Image
                    className="absolute opacity-0 transition-opacity duration-75 ease-out"
                    width={200}
                    height={200}
                    src={mappings[pieceToPut.id].image}
                    id="currentPiece"
                    alt="current piece"
                  />
                )}
                {showGridText && (
                  <span className="absolute top-0 right-0 m-2 rounded-full text-xs flex items-center justify-center">
                    {text}
                  </span>
                )}
                {isTargeted && (
                  <div className="absolute top-0 left-0 w-full h-full animate-pulse bg-green-500/50" />
                )}
              </div>
            );
          });
        })}
      </div>
    </div>
  );
};
