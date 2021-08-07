import { AnimatePresence, motion } from "framer-motion";
import "../styles/globals.scss";

function MyApp({ Component, pageProps, router }) {
  return (
    <AnimatePresence onExitComplete={() => window.scrollTo(0, 0)} exitBeforeEnter>
      {/* <motion.div key={router.asPath}> */}
      <Component {...pageProps} />
      {/* </motion.div> */}
    </AnimatePresence>
  );
}

export default MyApp;
