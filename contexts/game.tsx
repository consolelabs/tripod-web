import { createContext } from "@dwarvesf/react-utils";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { Data, Game } from "triple-pod-game-engine";
import { shopItems } from "../constants/shopItems";

interface GameContextValues {
  game: Game;
  renderCount: number;
  selectedCells: number[][];
  hoveredCell: number[];
  put: (x: number, y: number) => void;
  buy: (itemIndex: number) => void;
  use: (pieceId: number, params?: Record<string, any>) => void;
  swap: () => void;
  setSelectedCells: Dispatch<SetStateAction<number[][]>>;
  setHoveredCell: Dispatch<SetStateAction<number[]>>;
}

const [Provider, useGameContext] = createContext<GameContextValues>({
  name: "game",
});

const GameContextProvider = ({ children }: PropsWithChildren) => {
  const [game, setGame] = useState<Game>();
  const [renderCount, setRenderCount] = useState(Date.now());
  const [selectedCells, setSelectedCells] = useState<number[][]>([]);
  const [hoveredCell, setHoveredCell] = useState<number[]>([]);

  const rerender = () => {
    setRenderCount(Date.now());
  };

  const updateGameState = (data: Data) => {
    const res = game!.nextState(data);

    if (!res.valid) {
      toast(res.error);
    }
  };

  const put = (x: number, y: number) => {
    updateGameState({ type: "put", x, y });
    rerender();
  };

  const buy = (id: number) => {
    const shopItem = shopItems.find((item) => item.id === id);

    if (shopItem) {
      updateGameState({ type: "buy", piece: shopItem });
      rerender();
    }
  };

  const use = (pieceId: number, params: Record<string, any> = {}) => {
    updateGameState({
      type: "use",
      pieceId,
      params,
    });
    setSelectedCells([]);
    rerender();
  };

  const swap = () => {
    updateGameState({
      type: "swap",
    });
    rerender();
  };

  useEffect(() => {
    const newGame = new Game();
    setGame(newGame);
    newGame.start();
  }, []);

  return (
    <Provider
      value={{
        renderCount,
        game: game!,
        selectedCells,
        hoveredCell,
        put,
        buy,
        use,
        swap,
        setSelectedCells,
        setHoveredCell,
      }}
    >
      {children}
    </Provider>
  );
};

export { GameContextProvider, useGameContext };
