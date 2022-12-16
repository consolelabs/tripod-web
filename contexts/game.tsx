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

// Delay between each move
const DELAY = 1000;

interface GameContextValues {
  game: Game;
  renderCount: number;
  selectedCells: number[][];
  hoveredCell: number[];
  isUpdating: boolean;
  put: (x: number, y: number) => void;
  buy: (itemIndex: number) => void;
  use: (pieceId: number, params?: Record<string, any>) => void;
  swap: () => void;
  setSelectedCells: Dispatch<SetStateAction<number[][]>>;
  setHoveredCell: Dispatch<SetStateAction<number[]>>;
  putPreview: (x: number, y: number) => void;
}

const [Provider, useGameContext] = createContext<GameContextValues>({
  name: "game",
});

const GameContextProvider = ({ children }: PropsWithChildren) => {
  const [game, setGame] = useState<Game>();
  const [renderCount, setRenderCount] = useState(Date.now());
  const [selectedCells, setSelectedCells] = useState<number[][]>([]);
  const [hoveredCell, setHoveredCell] = useState<number[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const rerender = () => {
    setRenderCount(Date.now());
  };

  const updateGameState = (data: Data) => {
    if (isUpdating) {
      return;
    }

    const res = game!.nextState(data);

    if (res.valid) {
      setIsUpdating(true);
      setTimeout(() => {
        setIsUpdating(false);
      }, DELAY);
    } else {
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

  const putPreview = (x: number, y: number) => {
    game?.nextState({ type: "scan", x, y });
    rerender();
  };

  useEffect(() => {
    const newGame = new Game({ id: "open-plants-play" });
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
        isUpdating,
        put,
        buy,
        use,
        swap,
        setSelectedCells,
        setHoveredCell,
        putPreview,
      }}
    >
      {children}
    </Provider>
  );
};

export { GameContextProvider, useGameContext };
