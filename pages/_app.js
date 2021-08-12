import React, { createContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../styles/globals.css";

export const DirectionContext = createContext();

function MyApp({ Component, pageProps, router }) {
  const [direction, setDirection] = useState(1000);
  const [exitDirection, setExitDirection] = useState(0);

  return (
    <AnimatePresence onExitComplete={() => window.scrollTo(0, 0)} exitBeforeEnter>
      <motion.div key={router.asPath}>
        <DirectionContext.Provider value={{ direction, setDirection, exitDirection, setExitDirection }}>
          <Component {...pageProps} />
        </DirectionContext.Provider>
      </motion.div>
    </AnimatePresence>
  );
}

export default MyApp;
