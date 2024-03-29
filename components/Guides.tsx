/* eslint-disable */

import { useDisclosure } from "@dwarvesf/react-hooks";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import ReactModal from "react-modal";
import { PieceEnum } from "triple-pod-game-engine";
import { useGameContext } from "../contexts/game";
import { renderInlinePiece } from "./History";

ReactModal.setAppElement("body");

export const Guides = () => {
  const { isBgAudioEnabled, toggleBgAudio, playAudio } = useGameContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const objectRender = (
    <>
      <div className="font-bold text-2xl uppercase">The Objects</div>
      <div>
        Before learning the game, let's learn how to call each object like a
        true sophisticated aristoCAT as you are.
      </div>
      <div className="font-bold text-xl">The Plants</div>
      <div>
        <ul className="list-disc ml-4">
          <li>Glitter Bud: {renderInlinePiece(PieceEnum.GRASS)}</li>
          <li>Glitter Shrub: {renderInlinePiece(PieceEnum.BUSH)}</li>
          <ul className="ml-4 list-disc">
            <li>Glowing Shrub: {renderInlinePiece(PieceEnum.SUPER_BUSH)}</li>
          </ul>
          <li>Glitter Hedge: {renderInlinePiece(PieceEnum.TREE)}</li>
          <ul className="ml-4 list-disc">
            <li>Glowing Shrub: {renderInlinePiece(PieceEnum.SUPER_TREE)}</li>
          </ul>
        </ul>
      </div>
      <div className="font-bold text-xl">The Buildings</div>
      <div>
        <ul className="list-disc ml-4">
          <li>Pod: {renderInlinePiece(PieceEnum.HOUSE)}</li>
          <ul className="ml-4 list-disc">
            <li>Wealthy Pod: {renderInlinePiece(PieceEnum.SUPER_HOUSE)}</li>
          </ul>
          <li>???</li>
          <ul className="ml-4 list-disc">
            <li>???</li>
          </ul>
          <li>???</li>
          <ul className="ml-4 list-disc">
            <li>???</li>
          </ul>
          <li>???</li>
          <ul className="ml-4 list-disc">
            <li>???</li>
          </ul>
          <li>???</li>
          <ul className="ml-4 list-disc">
            <li>???</li>
          </ul>
          <li>
            <b>???</b>
          </li>
        </ul>
      </div>
      <div className="font-bold text-xl">The Enemies</div>
      <div>Blocking you from placing your objects.</div>
      <ul className="list-disc ml-4">
        <li>
          Droid (Black Droid): {renderInlinePiece(PieceEnum.BEAR)} moves
          randomly one step to an adjacent empty tile.
        </li>
        <li>
          Rocket Droid (White Droid): {renderInlinePiece(PieceEnum.NINJA_BEAR)}{" "}
          jumps randomly to any empty tile on the board.
        </li>
      </ul>
      <div className="font-bold text-xl">The Treasures</div>
      <ul className="list-disc ml-4">
        <li>
          Scarlet Shard: {renderInlinePiece(PieceEnum.TOMB)} - Left behind by a
          destroyed Droid/Rocket Droid
        </li>
        <li>Energy Stone: {renderInlinePiece(PieceEnum.CHURCH)}</li>
        <li>
          Energy Reactor: {renderInlinePiece(PieceEnum.CATHEDRAL)} - See if you
          can try stacing these bad boys 😉
        </li>
        <li>
          Mimic Slime: {renderInlinePiece(PieceEnum.CRYSTAL)} clones an adjacent
          object on the board to make a new combination. If there is no possible
          combination, it will become a Marble Piece. For example:
          <div>
            {renderInlinePiece(PieceEnum.TOMB)} +{" "}
            {renderInlinePiece(PieceEnum.TOMB)} +{" "}
            {renderInlinePiece(PieceEnum.CRYSTAL)} ={" "}
            {renderInlinePiece(PieceEnum.CHURCH)}
          </div>
          <div>
            {renderInlinePiece(PieceEnum.TOMB)} +{" "}
            {renderInlinePiece(PieceEnum.GRASS)} +{" "}
            {renderInlinePiece(PieceEnum.CRYSTAL)} ={" "}
            {renderInlinePiece(PieceEnum.ROCK)}
          </div>
        </li>
        <li>Marble Piece: {renderInlinePiece(PieceEnum.ROCK)}</li>
        <li>Marble Chunk: {renderInlinePiece(PieceEnum.MOUNTAIN)}</li>
        <li>Loot Chest: {renderInlinePiece(PieceEnum.TREASURE)}</li>
        <li>Cybercore Chest: {renderInlinePiece(PieceEnum.LARGE_TREASURE)}</li>
        <li>
          Unstable Bomb: {renderInlinePiece(PieceEnum.ROBOT)} blows up a 1x1
          tile with a 50% chance that it will miss.
        </li>
      </ul>
      <div className="font-bold text-xl">Power-Ups</div>
      <div>Buy in Shop.</div>
    </>
  );

  const howToPlayRender = (
    <>
      <div className="font-bold text-2xl uppercase">How to play?</div>
      <div>TBD.</div>
    </>
  );

  return (
    <>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => {
          playAudio("click");
          onClose();
        }}
        overlayClassName="fixed top-0 left-0 w-full h-full bg-black/70 flex p-4 py-16 overflow-auto lg:overflow-hidden"
        className="m-auto w-full h-full max-w-[1280px] max-h-[800px] text-white"
      >
        <div className="grid grid-cols-2 gap-4 lg:h-full lg:overflow-hidden">
          <div className="col-span-2 lg:col-span-1 flex flex-col space-y-4 px-4 py-8 lg:px-8 bg-tripod-900/70 rounded backdrop-blur lg:overflow-auto">
            {objectRender}
          </div>
          <div className="col-span-2 lg:col-span-1 flex flex-col space-y-4 px-4 py-8 lg:px-8 bg-tripod-900/70 rounded backdrop-blur lg:overflow-auto">
            {howToPlayRender}
          </div>
        </div>
      </ReactModal>
      <div className="flex items-center space-x-4 justify-center fixed top-0 right-0 m-4 z-10">
        <button
          type="button"
          onClick={() => {
            playAudio("click");
            isOpen ? onClose() : onOpen();
          }}
          className="flex space-x-2 items-center justify-center rounded bg-tripod-900 text-white text-xs px-2 py-2"
        >
          {isOpen ? (
            "Close"
          ) : (
            <>
              <AiOutlineInfoCircle />
              <span>Guides</span>
            </>
          )}
        </button>
        <button
          type="button"
          className="text-white !shadow-none w-8 h-8 flex items-center justify-center"
          onClick={toggleBgAudio}
        >
          {isBgAudioEnabled ? (
            <HiSpeakerWave size={24} />
          ) : (
            <HiSpeakerXMark size={24} />
          )}
        </button>
      </div>
    </>
  );
};
