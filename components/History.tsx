import Image from "next/image";
import { useMemo } from "react";
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
  const { game, renderCount } = useGameContext();

  const history = useMemo(() => {
    return game.history.map((m, i) => {
      const events = game.state.events;
      const condenses = [...events[i]]
        .reverse()
        .map((e, i) => {
          if (e.type === "condense") {
            if (i === 0)
              return (
                <>
                  {renderInlinePiece(e.from)}
                  {" -> "}
                  {renderInlinePiece(e.to)}
                </>
              );
            return (
              <>
                {" -> "}
                {renderInlinePiece(e.to)}
              </>
            );
          }
          return;
        })
        .filter(Boolean);
      const destroy = [...events[i]]
        .reverse()
        .filter((e) => e.type === "destroy")[0];
      const isMiss = events[i].reverse().some((e) => e.type === "miss");
      const isCombo = condenses.length > 1;
      const isMatch = condenses.length > 0;
      const comboStr = condenses.map((e) => <>{e}</>);

      switch (m.type) {
        case "put": {
          if (isMiss) {
            return `Unstable bomb missed!? (${[m.x, m.y]})`;
          } else if (destroy && destroy.type === "destroy") {
            return (
              <>Boom, {renderInlinePiece(destroy.pieces[0])} was destroyed</>
            );
          }
          return (
            <>
              {isCombo ? "Combo!!" : isMatch ? "Match!" : "Placed"} (
              {[m.x, m.y].join(",")})
              {isMatch || isCombo ? (
                <>
                  {", "}
                  {comboStr}
                </>
              ) : (
                ""
              )}
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
  }, [game, renderCount]); // eslint-disable-line

  return (
    <div className="text-white h-full flex flex-col space-y-2 overflow-hidden">
      <div className="font-bold text-xl">History</div>
      <div className="rounded-md bg-tripod-900/70 flex-1 h-full text-white relative">
        <div className="flex flex-col h-full space-y-2 absolute top-0 left-0 w-full h-full overflow-auto p-4">
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
