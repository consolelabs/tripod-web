import Lottie, { LottieRef, LottieRefCurrentProps } from "lottie-react";
import smokeAnimation from "../assets/animations/smoke.json";
import Image from "next/image";
import { BearPiece, useBearPieces } from "../hooks/useBearPieces";
import { mappings } from "../constants/mappings";
import { useEffect, useRef, useState } from "react";

const GRID_SIZE = 6;

const Bear = ({ bear }: { bear: BearPiece }) => {
  const previousPosition = useRef<any>({});
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rocketRef = useRef<HTMLImageElement | null>(null);
  const smokeRef = useRef<LottieRefCurrentProps>(null);
  const [initialSegment, setInitialSegment] = useState([25, 26]);

  const left = `${(bear.coord.x / GRID_SIZE) * 100}%`;
  const top = `${(bear.coord.y / GRID_SIZE) * 100}%`;

  useEffect(() => {
    if (containerRef.current && rocketRef.current && smokeRef.current) {
      const moveAnimation = [
        {
          offset: 0,
          top: previousPosition.current?.top,
          left: previousPosition.current?.left,
        },
        {
          transform: "translateY(-10%) scale(1, 1)",
          offset: 0.35,
          top: previousPosition.current?.top,
          left: previousPosition.current?.left,
        },
        {
          offset: 0.65,
          top,
          left,
        },
        {
          offset: 1,
          top,
          left,
        },
      ];

      const jumpAnimation = [
        {
          transform: "translateY(0) scale(1, 1)",
        },
        {
          transform: "translateY(0) scale(1.25, 0.75)",
          offset: 0.3,
        },
        {
          transform: "translateY(-10%) scale(1, 1)",
          offset: 0.35,
        },
        {
          transform: "translateY(-50%) scale(1, 1)",
          offset: 0.5,
        },
        {
          transform: "translateY(-10%) scale(1, 1)",
          offset: 0.65,
        },
        {
          transform: "translateY(0) scale(1.25, 0.75)",
          offset: 0.7,
        },
        {
          transform: "translateY(0) scale(1, 1)",
        },
      ];

      containerRef.current.animate(moveAnimation, {
        duration: 1000,
        fill: "forwards",
      });
      rocketRef.current.animate(jumpAnimation, {
        duration: 1000,
        fill: "forwards",
      });

      if (previousPosition.current.top && previousPosition.current.left) {
        // Trigger smoke animation on rocket land
        setTimeout(() => {
          smokeRef.current?.goToAndPlay(0);
        }, 650);
      } else {
        setInitialSegment([0, 26]);
      }

      previousPosition.current.top = top;
      previousPosition.current.left = left;
    }
  }, [left, top]);

  useEffect(() => {
    smokeRef.current?.setSpeed(2);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute w-1/6 h-1/6"
      style={{
        top,
        left,
      }}
    >
      <Lottie
        lottieRef={smokeRef}
        animationData={smokeAnimation}
        className="scale-[2] absolute bottom-0 mb-[25%]"
        autoplay={false}
        loop={false}
        // @ts-ignore
        initialSegment={initialSegment}
      />
      <Image
        ref={rocketRef}
        src={mappings[bear.id].image}
        width={200}
        height={200}
        alt=""
        className="origin-bottom relative"
      />
    </div>
  );
};

export const Bears = () => {
  const { bearPieces } = useBearPieces();

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {bearPieces.map((bear, index) => {
        if (!bear) {
          return null;
        }

        return <Bear bear={bear} key={`${index}-${bear.id}`} />;
      })}
    </div>
  );
};
