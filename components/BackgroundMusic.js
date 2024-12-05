"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Create a single Audio instance outside the component
const music = new Audio("/sounds/game_loop.wav");
music.loop = true;

export function BackgroundMusic() {
  const pathname = usePathname();

  useEffect(() => {
    // Don't play music on game page
    if (pathname === "/game") {
      music.pause();
      return;
    }

    // Resume playing from where it was
    const playPromise = music.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log("Error playing music:", error);
      });
    }

    return () => {
      if (pathname === "/game") {
        music.pause();
      }
    };
  }, [pathname]);

  return null;
}