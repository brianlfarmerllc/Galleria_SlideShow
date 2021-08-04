import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "./Layout.module.scss";
import logo from "../../public/assets/shared/logo.svg";

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
      </Head>
      <header className={styles.mainHeader}>
        <div>
          <Link href="/" passHref>
            <Image className={styles.logo} src={logo} alt="galleria-logo" priority />
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
