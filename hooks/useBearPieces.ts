import { useEffect, useState } from "react";
import { PieceEnum } from "triple-pod-game-engine";
import { v4 as uuidv4 } from "uuid";
import { useGameContext } from "../contexts/game";

const GRID_SIZE = 6;

export class BearPiece {
  id: string;
  pieceId: PieceEnum;
  initialCoord?: { x: number; y: number };
  coord: { x: number; y: number };
  destroyed = false;

  constructor(
    pieceId: PieceEnum,
    x: number,
    y: number,
    initialX?: number,
    initialY?: number
  ) {
    this.id = uuidv4();
    this.pieceId = pieceId;
    if (typeof initialX === "number" && typeof initialY === "number") {
      this.initialCoord = {
        x: initialX,
        y: initialY,
      };
    }
    this.coord = {
      x,
      y,
    };
  }
}

export const useBearPieces = () => {
  const { game } = useGameContext();

  // Extend the Piece type
  // 1. coord as the identifier & dictates where to render the bear
  // 2. Array length fixed at GRID_SIZE * GRID_SIZE to avoid element shifting in array when we add/remove a bear
  const [bearPieces, setBearPieces] = useState<(null | BearPiece)[]>(
    new Array(GRID_SIZE * GRID_SIZE).fill(null)
  );

  // Evaluate the board & get list of bears
  // We aim to keep this list incremental & prone to coord update only, so that animation works
  useEffect(() => {
    if (game) {
      const newBearPieces: typeof bearPieces = JSON.parse(
        JSON.stringify(bearPieces)
      );

      // Checks to see if all existing bears have moved
      const bearMoveChecks = new Array(newBearPieces.length).fill(false);

      // Get latest bear move events
      const bearMoveEvents =
        game.state.events[0]?.filter((event) => event.type === "bear-move") ||
        [];

      game.state.board.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
          // Do nothing if tile is not bear
          if (![PieceEnum.BEAR, PieceEnum.NINJA_BEAR].includes(col.id)) {
            return;
          }

          // Check if this bear is already accounted for, by getting the LATEST move event attached to it.
          // We have the current pos & the prev pos, so we can use the prev pos as an identifier
          const bearMoveEvent = bearMoveEvents.find(
            // @ts-ignore
            (event) => event.to.x === colIndex && event.to.y === rowIndex
          );

          // If we cannot find a move event attached to this bear,
          // it's a new bear on the 1st turn of the game
          if (!bearMoveEvent) {
            // Get the nearest null position in the bearPieces array
            const nullIndex = newBearPieces.findIndex((piece) => !piece);

            newBearPieces[nullIndex] = new BearPiece(
              col.id,
              colIndex,
              rowIndex
            );
            bearMoveChecks[nullIndex] = true;
          } else if (bearMoveEvent && bearMoveEvent.type === "bear-move") {
            // Else find its index in the bearPieces array
            // We CANNOT use newBearPieces here, because it'll mess up the original coord of the bear
            // in case there are many of them clustering together
            const index = bearPieces.findIndex(
              (piece) =>
                piece &&
                piece.coord.x === bearMoveEvent.from.x &&
                piece.coord.y === bearMoveEvent.from.y
            );

            // If we found it, update its new coord
            if (index >= 0) {
              newBearPieces[index]!.coord.x = bearMoveEvent.to.x;
              newBearPieces[index]!.coord.y = bearMoveEvent.to.y;
              delete newBearPieces[index]?.initialCoord;
              bearMoveChecks[index] = true;
            } else {
              // this is also a new bear, but we are already in the middle of the game,
              // so this bear has just been placed by the player

              // Get the nearest null position in the bearPieces array
              const nullIndex = newBearPieces.findIndex((piece) => !piece);

              newBearPieces[nullIndex] = new BearPiece(
                col.id,
                bearMoveEvent.to.x,
                bearMoveEvent.to.y,
                bearMoveEvent.from.x,
                bearMoveEvent.from.y
              );
              bearMoveChecks[nullIndex] = true;
            }
          }
        });
      });

      // See if there's any bear that didn't move, meaning it's dead and we should not render it anymore
      // out of the bearPieces list
      bearMoveChecks.forEach((check, index) => {
        if (!check && newBearPieces[index]) {
          newBearPieces[index]!.pieceId = PieceEnum.EMPTY;
          newBearPieces[index]!.destroyed = true;
        }
      });

      setBearPieces(newBearPieces);
    }
  }, [JSON.stringify(game?.state.board)]); // eslint-disable-line

  return { bearPieces, setBearPieces };
};
