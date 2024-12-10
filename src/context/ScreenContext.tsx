import React, { createContext, useEffect, useState } from "react";

type Screen = "onboarding" | "videofeed" | "profile" | "market" | "upload";

interface ScreenContextType {
  currentScreen: Screen;
  setCurrentScreen: React.Dispatch<React.SetStateAction<Screen>>;
}

export const ScreenContext = createContext<ScreenContextType>({
  currentScreen: "onboarding",
  setCurrentScreen: () => {},
});

export const ScreenProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("onboarding");

  useEffect(() => { 
    if (typeof window !== "undefined") {
      const isStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        window.matchMedia('(display-mode: fullscreen)').matches ||
        window.matchMedia('(display-mode: minimal-ui)').matches ||
        (navigator as any).standalone === true; // For iOS Safari

      if (isStandalone) {
      setCurrentScreen("videofeed");
      }
    }
  }, []);

  return (
    <ScreenContext.Provider value={{ currentScreen, setCurrentScreen }}>
      {children}
    </ScreenContext.Provider>
  );
};
