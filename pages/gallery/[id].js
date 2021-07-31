import Head from "next/head";
import Layout from "../../components/layout";
import { getAllPostIds, getOnePostData } from "../../utils/photos";
import styles from "./Gallery.module.scss";

export async function getStaticProps({ params }) {
  console.log(params.id);
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
  return (
    <Layout>
      <Head>
        <title>{postData[0].name}</title>
      </Head>
      <article className={styles.galleryContent}>
        <div className={styles.imageContainer}>
          <img
            className={styles.heroImage}
            src={postData[0].images.hero.large}
            alt={postData[0].name}
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
            src={postData[0].artist.image}
            alt={postData[0].artist.name}
          />
        </div>
        <div className={styles.titleContainer}>
          <h1 className={styles.paintingName}>{postData[0].name}</h1>
          <h4 className={styles.artistName}>{postData[0].artist.name}</h4>
        </div>
        <div className={styles.copyContainer}>
          <div className={styles.display}>{postData[0].year}</div>
          <h6 className={styles.bodyCopy}>{postData[0].description}</h6>
          <a href={postData[0].source} className={styles.sourceLink} target="blank">
            go to source
          </a>
        </div>
      </article>
      <div className={styles.controller}>
        <div className={styles.controllerText}></div>
        <div className={styles.controllerbuttons}></div>
      </div>
    </Layout>
  );
}
