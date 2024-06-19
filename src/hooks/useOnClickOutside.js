import { useEffect } from "react";

export default function useOnClickOutside(ref, handler) {
  useEffect(() => {
    //define event funtion to be called on click event
    const listener = (event) => {
      //if click event is from inside ref container then do nothing
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      //else call the handler (this is passed from the the dropDown component , it simply setopen to false)
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
