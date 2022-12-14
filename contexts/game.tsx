import { createContext } from "@dwarvesf/react-utils";
import { PropsWithChildren, useEffect, useState } from "react";
import { Game } from "triple-pod-game-engine";

interface GameContextValues {
  game: Game;
  renderCount: number;
  put: (x: number, y: number) => void;
}

const [Provider, useGameContext] = createContext<GameContextValues>({
  name: "game",
});

const GameContextProvider = ({ children }: PropsWithChildren) => {
  const [game, setGame] = useState<Game>();
  const [renderCount, setRenderCount] = useState(Date.now());

  const put = (x: number, y: number) => {
    game?.nextState({ type: "put", x, y });
    setRenderCount(Date.now());
  };

  useEffect(() => {
    const newGame = new Game();
    setGame(newGame);
    newGame.start();
  }, []);

  return (
    <Provider
      value={{
        game: game!,
        renderCount,
        put,
      }}
    >
      {children}
    </Provider>
  );
};

export { GameContextProvider, useGameContext };
