import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import { getPostData } from "../utils/photos";

export async function getStaticProps() {
  const allPostsData = getPostData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <>
      <Layout home>
        <Head>
          <title>NextJs Galleria</title>
        </Head>
        <section className={styles.mainGallery}>
          <div className={styles.imageList}>
            {allPostsData.map(({ id, images, name, artist }) => (
              <div key={id} className={styles.listItem}>
                <Link href={`/gallery/${id}`} passHref>
                  <a className={styles.anchor}>
                    <Image
                      className={styles.imageItem}
                      src={images.thumbnail}
                      alt={id}
                      width={images.thumbwidth}
                      height={images.thumbheight}
                      blurDataURL={images.thumbnail}
                      layout="responsive"
                      placeholder="blur"
                      priority="true"
                    />
                  </a>
                </Link>
                <div className={styles.overlay}></div>
                <Link href={`/gallery/${id}`} passHref>
                  <div className={styles.imageText}>
                    <h2 className={styles.paintingName}>{name}</h2>
                    <p className={`${styles.artistName} ${styles.header5}`}>{artist.name}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
}
