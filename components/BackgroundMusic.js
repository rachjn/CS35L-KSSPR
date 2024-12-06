"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

let music = null;

export function BackgroundMusic() {
  const pathname = usePathname();
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        music = new Audio("/sounds/game_loop.wav");
        music.loop = true;
        music.play();
      }
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [hasInteracted]);


  useEffect(() => {
    if (!music) return;
    
    if (pathname === "/game") {
      music.pause();
    } else {
      music.play();
    }
  }, [pathname]);

  return null;
}
