import { useState, useEffect } from "react";
import { useAppContext } from "@/ui/globalState/ContextHook/contextHook";

const useScrollHandler = () => {
  const [visible, setVisible] = useState<boolean>(true);

  const { state } = useAppContext();

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? false : true;
      setVisible(direction);
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    if (!state.isMenuOpen) {
      window.addEventListener("scroll", updateScrollDirection);
    } else {
      setVisible(true);
    }
    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, [state.isMenuOpen]);

  return visible;
};

export default useScrollHandler;
