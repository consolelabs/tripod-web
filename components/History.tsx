import Image from "next/image";
import React, { useMemo, useRef } from "react";
import { PieceEnum } from "triple-pod-game-engine";
import { mappings } from "../constants/mappings";
import { useGameContext } from "../contexts/game";

export const renderInlinePiece = (id: PieceEnum) => {
  const piece = mappings[id];

  return (
    <Image
      width={24}
      height={24}
      alt={piece.name}
      src={piece.image}
      className="inline-block w-6 h-6 object-contain"
    />
  );
};

export const History = () => {
  const { game, renderCount, playAudio } = useGameContext();
  const latestRoundIndex = useRef(0);

  const history = useMemo(() => {
    const _history = game.history.map((m, i) => {
      const events: any = game.state.events[i] || [];
      const currentRoundIndex = game.history.length - i;

      const condenses = events
        .filter((e: any) => e.type === "condense")
        .map((e: any, i: number) => {
          if (i === 0) {
            return (
              <React.Fragment key={`condense-${e.from}-${e.to}`}>
                {renderInlinePiece(e.from)} {"->"} {renderInlinePiece(e.to)}
              </React.Fragment>
            );
          }
          return (
            <React.Fragment key={`condense-${e.to}`}>
              {" "}
              {"->"} {renderInlinePiece(e.to)}
            </React.Fragment>
          );
        })
        .filter(Boolean);
      const destroy = events.filter(
        (e: any) => e.type === "destroy" || e.type === "transform"
      )[0];
      const isMiss = events.some((e: any) => e.type === "miss");
      const isCombo = condenses.length > 1;
      const isMatch = condenses.length > 0;

      console.log(game.state.events);
      switch (m.type) {
        case "put": {
          if (isMiss) {
            return `Unstable bomb missed!? (${[m.x, m.y]})`;
          } else if (destroy?.type === "destroy") {
            return `Boom, ${renderInlinePiece(
              destroy.pieces[0]
            )} was destroyed`;
          } else if (
            destroy?.type === "transform" &&
            (destroy.from === PieceEnum.BEAR ||
              destroy.from === PieceEnum.NINJA_BEAR) &&
            destroy.to === PieceEnum.TOMB
          ) {
            return `Bullseye! A droid was taken down`;
          }

          if (isMatch && currentRoundIndex > latestRoundIndex.current) {
            playAudio("merge");
          }

          return (
            <>
              {isCombo ? "Combo!!" : isMatch ? "Match!" : "Placed"}{" "}
              {[m.x, m.y].join(",")}
              {isMatch || isCombo ? <>, {condenses}</> : ""}
            </>
          );
        }
        case "buy":
          return `Bought ${mappings[m.piece.id].name}`;
        case "swap":
          return `Swap`;
        case "end":
          return "Game ended";
        case "use": {
          switch (m.pieceId) {
            case PieceEnum.AIRDROPPER:
              return `An airdrop lands on (${[
                m.params.dest[0],
                m.params.dest[1],
              ]}!)`;
            case PieceEnum.REROLL_BOX:
              return `You decided to try your luck, it turns out to be a ${
                mappings[game.state.currentPiece.id].name
              }`;
            case PieceEnum.TELEPORT_PORTAL:
              return `Switch place! (${[
                m.params.posA[0],
                m.params.posA[1],
              ]}) <-> (${[m.params.posB[0], m.params.posB[1]]})`;
            case PieceEnum.TERRAFORMER:
              return `The ground rumbles!! All marbles are destroyed`;
            case PieceEnum.MEGA_BOMB: {
              const [x, y] = m.params.pos;
              return `Used a Mega Bomb to wipe out ${[
                `(${x},${y})`,
                `(${x + 1},${y})`,
                `(${x},${y + 1})`,
                `(${x + 1},${y + 1})`,
              ].join(", ")}`;
            }
            case PieceEnum.BOMB:
              return `Used a Mini Bomb at (${[
                m.params.pos[0],
                m.params.pos[1],
              ]})`;
            default:
              return "";
          }
        }
        default:
          return "";
      }
    });

    latestRoundIndex.current = game.history.length;

    return _history;
  }, [game, renderCount]); // eslint-disable-line

  return (
    <div className="text-white h-full flex flex-col space-y-2 overflow-hidden">
      <div className="font-bold text-lg">History</div>
      <div className="rounded-md bg-tripod-900/70 flex-1 h-full text-white relative text-sm">
        <div className="flex flex-col space-y-2 absolute top-0 left-0 w-full h-full overflow-auto p-4">
          {history.length > 0
            ? history.map((e, index) => {
                return <div key={index}>- {e}</div>;
              })
            : "No history data."}
        </div>
      </div>
    </div>
  );
};
