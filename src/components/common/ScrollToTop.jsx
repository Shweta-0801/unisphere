import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop Component
 * 
 * In a React Router SPA, scroll position is preserved across route changes.
 * This component listens for pathname changes and resets the scroll position
 * of the window, document, and viewport to top (0, 0) immediately.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });

    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }

    const mainViewport = document.querySelector(".app-main-viewport");
    if (mainViewport) {
      mainViewport.scrollTop = 0;
    }
  }, [pathname]);

  return null;
}
