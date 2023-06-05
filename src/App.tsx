import { useEffect, useRef } from 'react';

import { Scene } from './scene';
import './App.scss';

function App() {
  const splendor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = splendor.current;
    if (!canvas) return;
    const scene = new Scene(canvas);

    return () => {
      scene.destroy();
    };
  }, []);

  return (
    <>
      <div className="splendor-container" ref={splendor} />
    </>
  );
}

export default App;
