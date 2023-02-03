import { useDisclosure } from "@dwarvesf/react-hooks";
import classNames from "classnames";
import Image from "next/image";
import { useRef } from "react";
import ReactModal from "react-modal";
import { toast } from "react-toastify";
import { PieceEnum } from "triple-pod-game-engine";
import { mappings } from "../constants/mappings";
import { shopItems } from "../constants/shopItems";
import { useGameContext } from "../contexts/game";
import coins from "../public/coins.png";

const pointFormat = new Intl.NumberFormat().format;

export const Shop = () => {
  const { game, isUpdating, buy, use, playAudio } = useGameContext();
  const {
    isOpen: isConfirmationModalOpen,
    onOpen: openConfirmationModal,
    onClose: closeConfirmationModal,
  } = useDisclosure();
  const selectedItemId = useRef<number>();

  const onBuy = () => {
    const id = selectedItemId.current;
    selectedItemId.current = undefined;

    if (!id) {
      return;
    }

    const itemToBuy = shopItems.find((item) => item.id === id);
    if (!itemToBuy) {
      return;
    }

    if (game.state.coins < itemToBuy.price) {
      toast("Not enough coin!");
      playAudio("error");
      return;
    }

    playAudio("buy");
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
    <>
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
                  onClick={() => {
                    if (!isUpdating) {
                      selectedItemId.current = item.id;
                      openConfirmationModal();
                      playAudio("click");
                    }
                  }}
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
      <ReactModal
        isOpen={isConfirmationModalOpen}
        onRequestClose={() => {
          closeConfirmationModal();
          playAudio("click");
        }}
        overlayClassName="fixed top-0 left-0 w-full h-full bg-black/70 flex"
        className="m-auto px-8 py-4 w-full max-w-[300px] bg-tripod-900 rounded-lg text-white"
      >
        <div className="flex flex-col space-y-6 text-center">
          <div>Are you sure you want to use this item?</div>
          <div className="flex items-center justify-end space-x-2">
            <button
              type="button"
              className="px-2 py-1 text-sm !shadow-none"
              onClick={() => {
                closeConfirmationModal();
                playAudio("click");
              }}
            >
              Cancel
            </button>
            <button
              className="px-2 py-1 bg-tripod text-sm"
              onClick={() => {
                onBuy();
                closeConfirmationModal();
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </ReactModal>
    </>
  );
};
