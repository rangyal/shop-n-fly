import { RefObject, useEffect } from "react";

const useResizeObserver = (
  ref: RefObject<Element>,
  onResize: (rect: DOMRectReadOnly) => void
) => {
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      return onResize(entries[0].contentRect);
    });

    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref, onResize]);
};

export default useResizeObserver;
