import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/layout";
import { getAllPostIds, getOnePostData, useMediaQuery } from "../../utils/photos";
import styles from "./Gallery.module.scss";

export async function getStaticProps({ params }) {
  const postData = await getOnePostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData }) {
  const is760 = useMediaQuery(760);
  const index = parseInt(postData.id);
  const next = index === 14 ? 0 : index + 1;
  const previous = index > 0 ? index - 1 : 14;

  const percent = Math.floor(((index + 1) / 15) * 100);

  return (
    <Layout>
      <Head>
        <title>{postData.name}</title>
      </Head>
      <article className={styles.galleryContent}>
        <div className={styles.imageContainer}>
          <img
            className={styles.heroImage}
            src={is760 ? postData.images.hero.small : postData.images.hero.large}
            alt={postData.name}
          />
          <div className={styles.viewImage}>
            <img
              className={styles.viewsvg}
              src="/assets/shared/icon-view-image.svg"
              alt="icon-view-image"
            />
            <p className={styles.viewText}>View Image</p>
          </div>
          <img
            className={styles.artistImage}
            src={postData.artist.image}
            alt={postData.artist.name}
          />
        </div>
        <div className={styles.titleContainer}>
          <h1 className={styles.paintingName}>{postData.name}</h1>
          <h4 className={styles.artistName}>{postData.artist.name}</h4>
        </div>
        <div className={styles.display}>{postData.year}</div>
        <div className={styles.copyContainer}>
          <h6 className={styles.bodyCopy}>{postData.description}</h6>
          <a href={postData.source} className={styles.sourceLink} target="blank">
            go to source
          </a>
        </div>
      </article>
      <div
        className={styles.controller}
        style={{ borderImageSource: `linear-gradient(to right, #000000 ${percent}%, #E5E5E5 1%)` }}
      >
        <div className={styles.controllerText}>
          <h3 className={styles.controllerH3}>{postData.name}</h3>
          <h5 className={styles.controllerH5}>{postData.artist.name}</h5>
        </div>
        <div className={styles.controllerLinks}>
          <Link href={`/gallery/${previous}`}>
            <img
              className={styles.controlBtn}
              src="/assets/shared/icon-back-button.svg"
              alt="icon-back-button"
            />
          </Link>
          <Link href={`/gallery/${next}`}>
            <img
              className={styles.controlBtn}
              src="/assets/shared/icon-next-button.svg"
              alt="icon-next-button"
            />
          </Link>
        </div>
      </div>
    </Layout>
  );
}
