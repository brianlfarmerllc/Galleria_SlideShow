import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Layout from "../../components/layout";
import { getAllPostIds, getOnePostData, useMediaQuery } from "../../utils/photos";
import styles from "./Gallery.module.scss";
import viewSVG from "../../public/assets/shared/icon-view-image.svg";
import iconBack from "../../public/assets/shared/icon-back-button.svg";
import iconNext from "../../public/assets/shared/icon-next-button.svg";

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
  const [isOpen, setIsOpen] = useState(false);

  const is760 = useMediaQuery(760);
  const index = parseInt(postData.id);
  const next = index === 14 ? 0 : index + 1;
  const previous = index > 0 ? index - 1 : 14;

  const percent = Math.floor(((index + 1) / 15) * 100);

  function toggleGallery() {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  }

  return (
    <Layout>
      <Head>
        <title>{postData.name}</title>
      </Head>
      <article className={styles.galleryContent}>
        <div className={styles.imageContainer}>
          <Image
            className={styles.heroImage}
            src={is760 ? postData.images.hero.small : postData.images.hero.large}
            alt={postData.name}
            width={is760 ? postData.images.smallwidth : postData.images.bigwidth}
            height={is760 ? postData.images.smallheight : postData.images.bigheight}
            blurDataURL={postData.images.thumbnail}
            layout="responsive"
            placeholder="blur"
            priority="true"
            key={postData.name}
          />
          <div onClick={toggleGallery} className={styles.viewImage}>
            <Image className={styles.viewsvg} src={viewSVG} alt="icon-view-image" />
            <p className={styles.viewText}>View Image</p>
          </div>
          <div className={styles.artistImage}>
            <Image
              className={styles.artistImage}
              src={postData.artist.image}
              alt={postData.artist.name}
              width={postData.artist.artistwidth}
              height={postData.artist.artistheight}
              blurDataURL={postData.artist.image}
              placeholder="blur"
              priority="true"
              key={postData.artist.name}
            />
          </div>
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
          <Link href={`/gallery/${previous}`} passHref>
            <a>
              <Image className={styles.controlBtn} src={iconBack} alt="icon-back-button" />
            </a>
          </Link>
          <Link href={`/gallery/${next}`} passHref>
            <a>
              <Image className={styles.controlBtn} src={iconNext} alt="icon-next-button" />
            </a>
          </Link>
        </div>
      </div>

      {isOpen ? (
        <div className={styles.modal}>
          <div className={styles.modalContainer}>
            <h4 onClick={toggleGallery} className={styles.close}>
              close
            </h4>
            <Image
              className={styles.galleryImage}
              src={postData.images.gallery}
              alt={postData.name}
              width={postData.images.gallerywidth}
              height={postData.images.galleryheight}
            />
          </div>
        </div>
      ) : null}
    </Layout>
  );
}
