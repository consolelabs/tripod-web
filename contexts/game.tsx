import { createContext } from "@dwarvesf/react-utils";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";
import { Data, Game } from "triple-pod-game-engine";
import { shopItems } from "../constants/shopItems";
import { useAudio } from "../hooks/useAudio";

// Delay between each move
const DELAY = 300;

type GameContextValues = {
  game: Game;
  renderCount: number;
  selectedCells: number[][];
  hoveredCell: number[];
  isUpdating: boolean;
  isGameDone: boolean;
  put: (x: number, y: number) => void;
  buy: (itemIndex: number) => void;
  use: (pieceId: number, params?: Record<string, any>) => void;
  swap: () => void;
  setSelectedCells: Dispatch<SetStateAction<number[][]>>;
  setHoveredCell: Dispatch<SetStateAction<number[]>>;
  putPreview: (x: number, y: number) => void;
  setIsGameDone: Dispatch<SetStateAction<boolean>>;
  newGame: () => void;
} & ReturnType<typeof useAudio>;

const [Provider, useGameContext] = createContext<GameContextValues>({
  name: "game",
});

const GameContextProvider = ({ children }: PropsWithChildren) => {
  const [game, setGame] = useState<Game>();
  const [renderCount, setRenderCount] = useState(Date.now());
  const [selectedCells, setSelectedCells] = useState<number[][]>([]);
  const [hoveredCell, setHoveredCell] = useState<number[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isGameDone, setIsGameDone] = useState(false);
  const overclickCount = useRef(0);

  const useAudioProps = useAudio();

  const rerender = () => {
    setRenderCount(Date.now());
  };

  const updateGameState = (data: Data, delay = true) => {
    if (isUpdating) {
      overclickCount.current += 1;

      if (overclickCount.current > 2) {
        toast("You are clicking too fast! Please slow down a bit!");
        overclickCount.current = 0;
      }

      return;
    }

    const res = game!.nextState(data);

    if (res.valid) {
      setIsUpdating(true);

      setTimeout(
        () => {
          setIsUpdating(false);
        },
        delay ? DELAY : 0
      );
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
      updateGameState({ type: "buy", piece: shopItem }, false);
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

  const newGame = () => {
    const newGame = new Game();
    setGame(newGame);
    newGame.start();
    rerender();
    setIsGameDone(false);
  };

  useEffect(() => {
    newGame();
  }, []); // eslint-disable-line

  return (
    <Provider
      value={{
        renderCount,
        game: game!,
        selectedCells,
        hoveredCell,
        isUpdating,
        isGameDone,
        put,
        buy,
        use,
        swap,
        setSelectedCells,
        setHoveredCell,
        putPreview,
        setIsGameDone,
        newGame,
        ...useAudioProps,
      }}
    >
      {children}
    </Provider>
  );
};

export { GameContextProvider, useGameContext };
