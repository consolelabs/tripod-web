import Image from "next/image";
import React from "react";
import cln from "classnames";

const ratio = 1280 / 1300;
const chars = ["a", "b", "c", "d", "e", "f"];

type Props = {
  showGridText?: boolean;
};

export const Board = ({ showGridText = false }: Props) => {
  return (
    <div className="relative">
      <div style={{ paddingTop: `calc(100% * ${ratio})` }}>
        <Image
          src="/background.png"
          fill
          style={{ objectFit: "contain" }}
          alt=""
        />
      </div>
      <div
        style={{}}
        className="font-medium p-[7%] text-white/30 absolute top-0 left-0 h-full w-full grid grid-cols-6 grid-rows-6"
      >
        {Array(36)
          .fill(0)
          .map((_, i) => {
            const text = `${chars[i % 6]}${6 - Math.floor(i / 6)}`;
            return (
              <div
                key={`grid-${text}`}
                className={cln(
                  "relative py-0.5 px-1 w-full h-full flex items-start justify-end",
                  {
                    "border-b border-tripod-900/70": 36 - i > 6,
                    "border-r border-tripod-900/70": i % 6 !== 5,
                  }
                )}
              >
                {i === 0 && (
                  <Image src="/disk.png" width={200} height={200} alt="" />
                )}
                {showGridText && <span>{text}</span>}
              </div>
            );
          })}
      </div>
    </div>
  );
};
