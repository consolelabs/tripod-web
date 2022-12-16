import Lottie, { LottieRefCurrentProps } from "lottie-react";
import smokeAnimation from "../assets/animations/smoke.json";
import explosionAnimation from "../assets/animations/explosion.json";
import Image from "next/image";
import { BearPiece, useBearPieces } from "../hooks/useBearPieces";
import { mappings } from "../constants/mappings";
import { useEffect, useRef, useState } from "react";

const GRID_SIZE = 6;

const Bear = ({
  bear,
  onAfterDestroy,
}: {
  bear: BearPiece;
  onAfterDestroy: () => void;
}) => {
  const previousPosition = useRef<any>({});
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rocketRef = useRef<HTMLImageElement | null>(null);
  const smokeRef = useRef<LottieRefCurrentProps>(null);
  const [initialSmokeAnimationSegment, setInitialSmokeAnimationSegment] =
    useState([25, 26]);

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
        duration: 700,
        fill: "forwards",
      });
      rocketRef.current.animate(jumpAnimation, {
        duration: 700,
        fill: "forwards",
      });

      if (previousPosition.current.top && previousPosition.current.left) {
        // Trigger smoke animation on rocket land
        setTimeout(() => {
          smokeRef.current?.goToAndPlay(0);
        }, 450);
      } else {
        setInitialSmokeAnimationSegment([0, 26]);
      }

      previousPosition.current.top = top;
      previousPosition.current.left = left;
    }
  }, [left, top]); // eslint-disable-line

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
        initialSegment={initialSmokeAnimationSegment}
      />
      <Image
        ref={rocketRef}
        src={mappings[bear.pieceId].image}
        width={200}
        height={200}
        alt=""
        className="origin-bottom relative"
      />
      {bear?.destroyed && (
        <Lottie
          animationData={explosionAnimation}
          className="scale-[1.25] absolute bottom-0 mb-[25%]"
          loop={false}
          onComplete={onAfterDestroy}
        />
      )}
    </div>
  );
};

export const Bears = () => {
  const { bearPieces, setBearPieces } = useBearPieces();

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {bearPieces.map((bear, index) => {
        if (!bear) {
          return null;
        }

        return (
          <Bear
            bear={bear}
            key={`${index}-${bear.id}`}
            onAfterDestroy={() => {
              setBearPieces((o) => {
                const newO = JSON.parse(JSON.stringify(o));
                const index = o.findIndex((p) => p?.id === bear.id);

                if (index >= 0) {
                  newO[index] = null;
                }

                return newO;
              });
            }}
          />
        );
      })}
    </div>
  );
};
