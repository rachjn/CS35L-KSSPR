"use client";
import { useEffect } from "react";

export function ClickSound() {
  useEffect(() => {
    const playClickSound = () => {
      const click = new Audio("/sounds/keyboard_click.wav");
      click.currentTime = 0;
      click.play();
    };

    document.addEventListener('click', playClickSound);
    return () => document.removeEventListener('click', playClickSound);
  }, []);

  return null;
}