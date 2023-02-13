import Tippy, { TippyProps } from "@tippyjs/react";
import classNames from "classnames";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  enabled?: boolean;
  hint?: string;
  className?: string;
  placement?: TippyProps["placement"];
}

export const Hint = (props: Props) => {
  const {
    enabled = false,
    hint = "",
    className = "",
    placement,
    children,
  } = props;

  return (
    <Tippy
      content={hint}
      visible={enabled}
      className="animate-bounce text-center"
      placement={placement}
    >
      <div className={classNames("relative", className)}>{children}</div>
    </Tippy>
  ) as any;
};
