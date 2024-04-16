// from my custom hook 'https://www.npmjs.com/package/@kushagra-aa/hooks-usedebounce'
import { useEffect, useState } from "react";

function useDebounce({
  callback,
  dependencies,
  timeoutDuration,
  shouldCallOnInitialRender = false,
}: {
  callback: () => void;
  dependencies: unknown[];
  timeoutDuration?: number;
  shouldCallOnInitialRender?: boolean;
}) {
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [debounceTimeout, setDebounceTimeout] = useState<
    string | number | NodeJS.Timeout | null
  >(null);
  useEffect(() => {
    let localDebounceTimeout = debounceTimeout;
    if (!isInitialRender || shouldCallOnInitialRender) {
      if (!timeoutDuration) {
        callback(); // Call immediately if no timeout
      } else {
        if (debounceTimeout) clearTimeout(debounceTimeout); // Clear any existing timeout

        localDebounceTimeout = setTimeout(callback, timeoutDuration); // Set new timeout
        setDebounceTimeout(localDebounceTimeout);
      }
    }

    setIsInitialRender(false); // Mark as not initial Render

    // Cleanup the timeout when the component unmounts
    return () => {
      if (localDebounceTimeout) {
        clearTimeout(localDebounceTimeout);
      } // Cleanup localDebounce on unmount
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      } // Cleanup debounce on unmount
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, timeoutDuration]);
}

export default useDebounce;
