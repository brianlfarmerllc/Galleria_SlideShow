import Head from "next/head";
import Link from "next/link";
import styles from "./Layout.module.scss";

export default function Layout({ children, home }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Frontend Mentor galleria slideshow site built with NextJs"
        />
        <meta name="og:title" content="NextJS Galleria" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <header className={styles.mainHeader}>
        <div>
          <Link href="/" passHref>
            <img className={styles.logo} src="/assets/shared/logo.svg" alt="galleria-logo" />
          </Link>
        </div>

        {home ? (
          <Link href="/gallery/0" passHref>
            <a className={styles.link1}>start slideshow</a>
          </Link>
        ) : (
          <Link href="/" passHref>
            <a className={styles.link1}>stop slideshow</a>
          </Link>
        )}
      </header>
      <main className={styles.mainView}>{children}</main>
    </>
  );
}
