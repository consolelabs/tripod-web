import Image from "next/image";
import { mappings } from "../constants/mappings";
import { shopItems } from "../constants/shopItems";
import coins from "../public/coins.png";

const pointFormat = new Intl.NumberFormat().format;

export const Shop = () => {
  return (
    <div className="text-white h-full flex flex-col space-y-2">
      <div className="font-bold text-xl">Shop</div>
      <div className="rounded-md bg-tripod-900/70 flex-1 overflow-auto p-4 h-full text-white">
        <div className="flex flex-col justify-between h-full">
          {shopItems.map((item, index) => {
            return (
              <div className="w-full flex items-start gap-x-1.5" key={index}>
                <Image
                  width={64}
                  height={64}
                  alt={item.name}
                  src={mappings[item.id].image}
                />
                <div className="flex-1 flex flex-col">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm">{item.desc}</div>
                  <div className="flex items-center space-x-1 text-sm">
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
