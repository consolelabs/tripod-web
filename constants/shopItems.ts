import {
  airdropper,
  bomb,
  BuyablePiece,
  megaBomb,
  rerollBox,
  teleportPortal,
  terraformer,
} from "triple-pod-game-engine";

export const shopItems: Array<BuyablePiece & { desc: string }> = [
  {
    ...airdropper,
    desc: "Clone a piece on the board",
    price: 1000,
    isBuyable: true,
  },
  {
    ...rerollBox,
    desc: "Get another item randomly",
    price: 1000,
    isBuyable: true,
  },
  {
    ...teleportPortal,
    desc: "Swap 2 pieces on the board",
    price: 1000,
    isBuyable: true,
  },
  {
    ...terraformer,
    desc: "Destroy all marbles",
    price: 1000,
    isBuyable: true,
  },
  {
    ...megaBomb,
    desc: "Destroy a 2x2 area",
    price: 1000,
    isBuyable: true,
  },
  {
    ...bomb,
    desc: "Destroy a 1x1 area",
    price: 1000,
    isBuyable: true,
  },
];
