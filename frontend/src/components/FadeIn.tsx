import React, {
  useEffect,
  useState,
} from "react";
import type { PropsWithChildren } from "react";
import type { JSXElementConstructor } from "react";

interface Props {
  delay?: number;
  transitionDuration?: number;
  wrapperTag?: JSXElementConstructor<any>;
  childTag?: JSXElementConstructor<any>;
  className?: string;
  childClassName?: string;
  visible?: boolean;
  onComplete?: () => void;
}

export default function FadeIn(props: PropsWithChildren<Props>) {
  const [maxVisible, setMaxVisible] = useState(0);
  const delay = props.delay || 50;
  const transitionDuration = props.transitionDuration || 400;
  const WrapperTag = props.wrapperTag || "div";
  const ChildTag = props.childTag || "div";
  const visible = typeof props.visible === "undefined" ? true : props.visible;

  useEffect(() => {
    let count = React.Children.count(props.children);
    if (!visible) count = 0;

    if (count === maxVisible) {
      const timeout = setTimeout(() => {
        props.onComplete?.();
      }, transitionDuration);
      return () => clearTimeout(timeout);
    }

    const increment = count > maxVisible ? 1 : -1;
    const timeout = setTimeout(() => {
      setMaxVisible(maxVisible + increment);
    }, delay);
    return () => clearTimeout(timeout);
  }, [React.Children.count(props.children), delay, maxVisible, visible, transitionDuration]);

  return (
    <WrapperTag className={props.className}>
      {React.Children.map(props.children, (child, i) => (
        <ChildTag
          className={props.childClassName}
          style={{
            transition: `opacity ${transitionDuration}ms, transform ${transitionDuration}ms`,
            transform: maxVisible > i ? "none" : "translateY(20px)",
            opacity: maxVisible > i ? 1 : 0,
          }}
        >
          {child}
        </ChildTag>
      ))}
    </WrapperTag>
  );
}
