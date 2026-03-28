import { useEffect, useRef } from 'react';

const useScrollToEnd = (deps: React.DependencyList = []) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, deps);
  return containerRef;
};

export default useScrollToEnd;
