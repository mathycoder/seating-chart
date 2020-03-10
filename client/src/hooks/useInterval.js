import React, { useState, useEffect, useRef } from 'react';

// This custom hook was created by Dan Abramov
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
