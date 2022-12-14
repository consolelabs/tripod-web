import { PieceEnum } from "triple-pod-game-engine";
import empty from "../public/pieces/empty.png";
import glitterootBud from "../public/pieces/glitteroot-bud.png";
import glitterootShrub from "../public/pieces/glitteroot-shrub.png";
import glitterootShrubEnhanced from "../public/pieces/glitteroot-shrub-enhanced.png";
import glitteroot from "../public/pieces/glitteroot.png";
import glitterootEnhanced from "../public/pieces/glitteroot-enhanced.png";
import pod from "../public/pieces/pod.png";
import podEnhanced from "../public/pieces/pod-enhanced.png";
import shelter from "../public/pieces/shelter.png";
import shelterEnhanced from "../public/pieces/shelter-enhanced.png";
import condo from "../public/pieces/condo.png";
import condoEnhanced from "../public/pieces/condo-enhanced.png";
import apartment from "../public/pieces/apartment.png";
import apartmentEnhanced from "../public/pieces/apartment-enhanced.png";
import soaringTower from "../public/pieces/soaring-tower.png";
import soaringTowerEnhanced from "../public/pieces/soaring-tower-enhanced.png";
import galaxyFortress from "../public/pieces/galaxy-fortress.png";
import droid from "../public/pieces/droid.png";
import rocketDroid from "../public/pieces/rocket-droid.png";
import scarletShard from "../public/pieces/scarlet-shard.png";
import energyStone from "../public/pieces/energy-stone.png";
import energyReactor from "../public/pieces/energy-reactor.png";
import mimicSlime from "../public/pieces/mimic-slime.png";
import marblePiece from "../public/pieces/marble-piece.png";
import marbleChunk from "../public/pieces/marble-chunk.png";
import lootChest from "../public/pieces/loot-chest.png";
import cybercoreCrate from "../public/pieces/cybercore-crate.png";
import unstableBomb from "../public/pieces/unstable-bomb.png";
import airdropper from "../public/pieces/airdropper.png";
import rerollBox from "../public/pieces/reroll-box.png";
import teleportPortal from "../public/pieces/teleport-portal.png";
import terraformer from "../public/pieces/terraformer.png";
import megaBomb from "../public/pieces/mega-bomb.png";
import miniBomb from "../public/pieces/mini-bomb.png";
import { StaticImageData } from "next/image";

export const mappings: Record<
  PieceEnum,
  {
    name: string;
    noHighlight?: boolean;
    emojiName: string;
    image: StaticImageData;
  }
> = {
  [PieceEnum.EMPTY]: {
    name: "Empty",
    image: empty,
    emojiName: "blank",
  },
  [PieceEnum.GRASS]: {
    name: "Glitteroot Bud",
    image: glitterootBud,
    emojiName: "glitteroot_bud",
  },
  [PieceEnum.BUSH]: {
    name: "Glitteroot Shrub",
    image: glitterootShrub,
    emojiName: "glitteroot_shrub",
  },
  [PieceEnum.SUPER_BUSH]: {
    name: "Glitteroot Shrub Enhanced",
    image: glitterootShrubEnhanced,
    emojiName: "glitteroot_shrub_enhanced",
  },
  [PieceEnum.TREE]: {
    name: "Glitteroot",
    image: glitteroot,
    emojiName: "glitteroot",
  },
  [PieceEnum.SUPER_TREE]: {
    name: "Glitteroot Enhanced",
    image: glitterootEnhanced,
    emojiName: "glitteroot_enhanced",
  },
  [PieceEnum.HUT]: {
    name: "Pod",
    image: pod,
    emojiName: "pod",
  },
  [PieceEnum.SUPER_HUT]: {
    name: "Pod Enhanced",
    image: podEnhanced,
    emojiName: "pod_enhanced",
  },
  [PieceEnum.HOUSE]: {
    name: "Shelter",
    image: shelter,
    emojiName: "shelter",
  },
  [PieceEnum.SUPER_HOUSE]: {
    name: "Shelter Enhanced",
    image: shelterEnhanced,
    emojiName: "shelter_enhanced",
  },
  [PieceEnum.MANSION]: {
    name: "Condo",
    image: condo,
    emojiName: "condo",
  },
  [PieceEnum.SUPER_MANSION]: {
    name: "Condo Enhanced",
    image: condoEnhanced,
    emojiName: "condo_enhanced",
  },
  [PieceEnum.CASTLE]: {
    name: "Apartment",
    image: apartment,
    emojiName: "apartment",
  },
  [PieceEnum.SUPER_CASTLE]: {
    name: "Apartment Enhanced",
    image: apartmentEnhanced,
    emojiName: "apartment_enhanced",
  },
  [PieceEnum.FLOATING_CASTLE]: {
    name: "Soaring Tower",
    image: soaringTower,
    emojiName: "soaring_tower",
  },
  [PieceEnum.SUPER_FLOATING_CASTLE]: {
    name: "Soaring Tower Enhanced",
    image: soaringTowerEnhanced,
    emojiName: "soaring_tower_enhanced",
  },
  [PieceEnum.TRIPLE_CASTLE]: {
    name: "Galaxy Fortress",
    image: galaxyFortress,
    emojiName: "galaxy_fortress",
  },
  [PieceEnum.BEAR]: {
    name: "Droid",
    image: droid,
    emojiName: "droid",
  },
  [PieceEnum.NINJA_BEAR]: {
    name: "Rocket Droid",
    image: rocketDroid,
    emojiName: "rocket_droid",
  },
  [PieceEnum.TOMB]: {
    name: "Scarlet Shard",
    image: scarletShard,
    emojiName: "scarlet_shard",
  },
  [PieceEnum.CHURCH]: {
    name: "Energy Stone",
    image: energyStone,
    emojiName: "energy_stone",
  },
  [PieceEnum.CATHEDRAL]: {
    name: "Energy Reactor",
    image: energyReactor,
    emojiName: "energy_reactor",
  },
  [PieceEnum.CRYSTAL]: {
    name: "Mimic Slime",
    image: mimicSlime,
    emojiName: "mimic_slime",
  },
  [PieceEnum.ROCK]: {
    name: "Marble Piece",
    image: marblePiece,
    emojiName: "marble_piece",
  },
  [PieceEnum.MOUNTAIN]: {
    name: "Marble Chunk",
    image: marbleChunk,
    emojiName: "marble_chunk",
  },
  [PieceEnum.TREASURE]: {
    name: "Loot Chest",
    image: lootChest,
    emojiName: "loot_chest",
  },
  [PieceEnum.LARGE_TREASURE]: {
    name: "Cybercore Crate",
    image: cybercoreCrate,
    emojiName: "cybercore_crate",
  },
  [PieceEnum.ROBOT]: {
    name: "Unstable Bomb",
    image: unstableBomb,
    emojiName: "unstable_bomb",
  },
  [PieceEnum.AIRDROPPER]: {
    name: "Airdropper",
    image: airdropper,
    noHighlight: true,
    emojiName: "airdropper",
  },
  [PieceEnum.REROLL_BOX]: {
    name: "Reroll Box",
    image: rerollBox,
    noHighlight: true,
    emojiName: "reroll_box",
  },
  [PieceEnum.TELEPORT_PORTAL]: {
    name: "Teleport Portal",
    image: teleportPortal,
    noHighlight: true,
    emojiName: "teleport_portal",
  },
  [PieceEnum.TERRAFORMER]: {
    name: "Terraformer",
    image: terraformer,
    noHighlight: true,
    emojiName: "terraformer",
  },
  [PieceEnum.MEGA_BOMB]: {
    name: "Mega Bomb",
    image: megaBomb,
    noHighlight: true,
    emojiName: "mega_bomb",
  },
  [PieceEnum.BOMB]: {
    name: "Mini Bomb",
    image: miniBomb,
    noHighlight: true,
    emojiName: "mini_bomb",
  },
};
