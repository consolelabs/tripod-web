import classNames from "classnames";
import Image from "next/image";
import { toast } from "react-toastify";
import { PieceEnum } from "triple-pod-game-engine";
import { mappings } from "../constants/mappings";
import { shopItems } from "../constants/shopItems";
import { useGameContext } from "../contexts/game";
import coins from "../public/coins.png";

const pointFormat = new Intl.NumberFormat().format;

export const Shop = () => {
  const { game, isUpdating, buy, use } = useGameContext();

  const onClick = (id: number) => {
    const itemToBuy = shopItems.find((item) => item.id === id);
    if (!itemToBuy) {
      return;
    }

    if (game.state.coins < itemToBuy.price) {
      toast("Not enough coin!");
      return;
    }

    buy(id);

    switch (id) {
      case PieceEnum.REROLL_BOX:
      case PieceEnum.TERRAFORMER: {
        use(id);
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <div className="text-white h-full flex flex-col space-y-2">
      <div className="font-bold text-lg">Shop</div>
      <div className="rounded-md bg-tripod-900/70 flex-1 overflow-auto p-4 h-full text-white">
        <div className="flex flex-col justify-between h-full space-y-2">
          {shopItems.map((item, index) => {
            return (
              <div
                className={classNames(
                  "w-full flex items-start gap-x-1.5 cursor-pointer cell"
                )}
                key={index}
                onClick={() => !isUpdating && onClick(item.id)}
              >
                <Image
                  width={48}
                  height={48}
                  alt={item.name}
                  src={mappings[item.id].image}
                />
                <div className="flex-1 flex flex-col">
                  <div className="text-sm font-medium">{item.name}</div>
                  <div className="text-xs">{item.desc}</div>
                  <div className="flex items-center space-x-1 text-xs mt-1">
                    <Image src={coins} width={16} height={16} alt="coins" />
                    <span>{pointFormat(item.price)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
