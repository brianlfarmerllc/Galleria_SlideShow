import { AnimatePresence } from "framer-motion";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} />;
    </AnimatePresence>
  );
}

export default MyApp;
