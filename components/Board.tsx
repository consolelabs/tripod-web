import Image from "next/image";
import React, { useEffect, useState } from "react";

const scale = 0.8;
const initialW = 1280;
const initialH = 1300;
const ratio = initialW / initialH;

export const Board = (props: {}) => {
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    let w = ((window.innerWidth * scale) / initialW) * initialW;
    w = Math.max(Math.min(w, 700), 0);
    const h = w * ratio;
    setSize({
      w,
      h,
    });
  }, []);

  return (
    <div>
      <Image src="/background.png" width={size.w} height={size.h} alt="" />
    </div>
  );
};
