import { DirectionContext } from "../../pages/_app";
import { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import logo from "../../public/assets/shared/logo.svg";

export default function Layout({ children, home }) {
  const { setExitDirection, setDirection } = useContext(DirectionContext);
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Frontend Mentor galleria slideshow site built with NextJs" />
        <meta name="og:title" content="NextJS Galleria" />
      </Head>
      <motion.header inital={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 1 }} className="mainHeader">
        <div>
          <Link href="/" passHref>
            <a onClick={() => setExitDirection(0)}>
              <Image className="logo" src={logo} alt="galleria-logo" priority />
            </a>
          </Link>
        </div>

        {home ? (
          <Link href="/gallery/0" passHref>
            <a onClick={() => setDirection(1000)} className="link1">
              start slideshow
            </a>
          </Link>
        ) : (
          <Link href="/" passHref>
            <a onClick={() => setExitDirection(0)} className="link1">
              stop slideshow
            </a>
          </Link>
        )}
      </motion.header>

      <main className="mainView">{children}</main>

      <style>{`
       .mainHeader {
        margin: auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        max-width: 1360px;
        min-height: 120px;
        height: 14.2vh;
        border-bottom: solid #e5e5e5 1px;
      }
      
      .logo {
        cursor: pointer;
      }
      
      .link1 {
        font-size: 12px;
        letter-spacing: 2.5px;
        line-height: 15px;
        font-family: "Libre Baskerville", serif;
        color: #7d7d7d;
        text-transform: uppercase;
      }
      
      .link1:hover {
        color: black;
      }
      
      .mainView {
        margin: auto;
        max-width: 1360px;
      }
      
      @media screen and (max-width: 1375px) {
        .mainHeader,
        .mainView {
          padding: 0 30px;
        }
      }
      
      @media screen and (max-width: 1024px) {
        .mainHeader {
          min-height: unset;
          height: 90px;
        }
        .logo {
          width: 75%;
        }
      }
      
      @media screen and (max-width: 660px) {
        .mainHeader {
          height: 80px;
        }
      
        .logo {
          width: 65%;
        }
        .link1 {
          font-size: 0.9rem;
        }
      }
      `}</style>
    </>
  );
}
