import { useEffect } from "react";

export function useAplyFocus(input) {
  useEffect(
    function () {
      const inputEl = input.current;
      inputEl.focus();
    },
    [input]
  );
}
