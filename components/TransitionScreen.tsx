import React, { useEffect, useRef, useState } from "react";

const fadeIn = [
  {
    borderWidth: "0",
  },
  {
    borderWidth: "max(50vh, 50vw)",
  },
];

type Props = {
  children: (anim: Animation) => React.ReactNode;
};

export const TransitionScreen = ({ children }: Props) => {
  const [anim, setAnim] = useState<Animation>();
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (transitionRef.current) {
      const animation = transitionRef.current.animate(fadeIn, {
        duration: 700,
        fill: "forwards",
      });
      animation.pause();
      setAnim(animation);
    }
  }, [transitionRef]);

  return (
    <div className="w-screen h-screen">
      {anim ? children(anim) : null}
      <div
        style={{
          width: "max(100vw, 100vh)",
          height: "max(100vw, 100vh)",
        }}
        ref={transitionRef}
        className="z-10 pointer-events-none border-gray-900 fixed scale-[2] h-screen min-w-screen rounded-full aspect-square left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};
