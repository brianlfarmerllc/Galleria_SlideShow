import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import Layout from "../../components/layout";
import { getAllPostIds, getOnePostData, useMediaQuery } from "../../utils/photos";
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
  const [direction, setDirection] = useState(0);
  const exitDirection = direction === 1000 ? -1000 : 1000;

  const is760 = useMediaQuery(760);
  const index = parseInt(postData.id);
  const next = index === 14 ? 0 : index + 1;
  const previous = index > 0 ? index - 1 : 14;

  const percent = Math.floor(((index + 1) / 15) * 100);

  function toggleGallery() {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  }

  const variants = {
    inital: { opacity: 0, x: direction },
    animate: { opacity: 1, x: 0, transition: { delay: 0.2, duration: 1.3, type: "tween" } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <Layout>
        <Head>
          <title>{postData.name}</title>
        </Head>
        <motion.article
          key={postData.name}
          variants={variants}
          initial="inital"
          animate="animate"
          exit="exit"
          className="galleryContent"
        >
          <div className="imageContainer">
            <Image
              className="heroImage"
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
            <button onClick={toggleGallery} className="viewImage">
              <Image className="viewsvg" src={viewSVG} alt="icon-view-image" />
              <p className="viewText">View Image</p>
            </button>
            <div className="artistImage">
              <Image
                className="artistImage"
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
          <div className="titleContainer">
            <h1 className="paintingName">{postData.name}</h1>
            <h4 className="artistName">{postData.artist.name}</h4>
          </div>
          <div className="display">{postData.year}</div>
          <div className="copyContainer">
            <h6 className="bodyCopy">{postData.description}</h6>
            <a href={postData.source} className="sourceLink" target="blank">
              go to source
            </a>
          </div>
        </motion.article>
        <div
          className="controller"
          style={{ borderImageSource: `linear-gradient(to right, #000000 ${percent}%, #E5E5E5 1%)` }}
        >
          <div className="controllerText">
            <h3 className="controllerH3">{postData.name}</h3>
            <h5 className="controllerH5">{postData.artist.name}</h5>
          </div>
          <div className="controllerLinks">
            <Link scroll={false} href={`/gallery/${previous}`} passHref>
              <a
                onClick={() => {
                  console.log("-1000");
                  setDirection(-1000);
                }}
              >
                <Image className="controlBtn" src={iconBack} alt="icon-back-button" />
              </a>
            </Link>
            <Link scroll={false} href={`/gallery/${next}`} passHref>
              <a
                onClick={() => {
                  console.log("1000");
                  setDirection(1000);
                }}
              >
                <Image className="controlBtn" src={iconNext} alt="icon-next-button" />
              </a>
            </Link>
          </div>
        </div>

        {isOpen ? (
          <div className="modal">
            <div className="modalContainer">
              <div className="closeContainer">
                <button onClick={toggleGallery} className="close">
                  <h4 className="close">close</h4>
                </button>
              </div>
              <Image
                className="galleryImage"
                src={postData.images.gallery}
                alt={postData.name}
                width={postData.images.gallerywidth}
                height={postData.images.galleryheight}
              />
            </div>
          </div>
        ) : null}
      </Layout>
      <style>{`
       .galleryContent {
        min-height: 72vh;
        padding: 50px 0px;
        display: grid;
        grid-template-columns: repeat(24, 1fr);
        grid-template-rows: 1fr;
        position: relative;
      }
      
      .imageContainer {
        position: relative;
        grid-column: 1/9;
        grid-row-start: 1;
        height: fit-content;
      }
      
      .heroImage {
        width: 100%;
      }
      
      .viewImage {
        position: absolute;
        bottom: 30px;
        left: 30px;
        width: 152px;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        background: rgba(0, 0, 0, 0.9);
        border: none;
        cursor: pointer;
      }
      
      .viewImage:hover {
        background: rgba(143, 143, 143, 0.7);
      }
      
      .artistImage {
        position: absolute;
        right: -175px;
        bottom: -50px;
      }
      
      .viewText {
        color: white;
        letter-spacing: 2.14px;
        text-transform: uppercase;
        font-size: 10px;
        font-weight: 700;
        pointer-events: none;
      }
      
      .viewsvg {
        pointer-events: none;
      }
      
      .titleContainer {
        background-color: white;
        margin-top: -1px;
        padding-left: 50px;
        grid-column: 8/15;
        grid-row-start: 1;
        width: fit-content;
        min-height: 0;
        min-width: 0;
        height: max-content;
        z-index: 3;
      }
      
      .paintingName {
        padding-bottom: 30px;
      }
      
      .artistName {
        padding-bottom: 50px;
        color: #7d7d7d;
      }
      
      .display {
        font-size: 20rem;
        font-family: "Libre Baskerville", serif;
        color: #f3f3f3;
        font-weight: 700;
        line-height: 150px;
        width: fit-content;
        height: fit-content;
        position: absolute;
        top: 50px;
        right: 0%;
      }
      
      .copyContainer {
        position: relative;
        grid-column: 17/25;
        grid-row-start: 1;
        height: fit-content;
      }
      
      .bodyCopy {
        margin-top: 13rem;
        color: #7d7d7d;
        width: 85%;
      }
      
      .sourceLink {
        display: block;
        font-size: 0.9rem;
        letter-spacing: 1.93px;
        font-family: "Libre Baskerville", serif;
        font-weight: 700;
        color: #7d7d7d;
        text-decoration: underline;
        text-transform: uppercase;
        padding: 5rem 0rem 0rem 1rem;
      }
      
      .sourceLink:hover {
        color: black;
      }
      
      .controller {
        margin: auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        max-width: 1360px;
        height: 10.7vh;
        min-height: 96px;
        padding: 25px 0px;
        border-top: solid 2px;
        border-image-slice: 30 0 0;
        margin-top: 2rem;
      }
      
      .controllerH3 {
        padding-bottom: 5px;
      }
      
      .controllerH5 {
        padding-top: 5px;
      }
      
      .controllerLinks {
        width: 90px;
        display: flex;
        justify-content: space-between;
      }
      
      .controlBtn {
        cursor: pointer;
      }
      
      .controlBtn:hover {
        opacity: 0.4;
      }
      
      .modal {
        z-index: 100;
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      
      .modalContainer {
        margin: 4rem;
        width: 30%;
      }
      
      .closeContainer {
        width: 100%;
        display: flex;
        justify-content: flex-end;
      }
      
      .close {
        color: white;
        text-transform: uppercase;
        letter-spacing: 3px;
        cursor: pointer;
        text-align: end;
        padding-bottom: 1rem;
        background: none;
        border: none;
      }
      
      .close:hover {
        color: #7d7d7d;
      }
      
      @media screen and (max-width: 1280px) {
        .copyContainer {
          grid-column: 16/25;
        }
      }
      
      @media screen and (max-width: 1200px) {
        .copyContainer {
          grid-column: 15/25;
        }
      }
      
      @media screen and (max-width: 1140px) {
        .galleryContent {
          grid-template-columns: repeat(24, 1fr);
          grid-template-rows: 1fr 100%;
        }
        .imageContainer {
          grid-column: 3/16;
        }
        .artistImage {
          position: absolute;
          right: -175px;
          bottom: 170px;
        }
        .titleContainer {
          grid-column: 11 /24;
        }
        .display {
          display: unset;
          right: unset;
          grid-row-start: 2;
          grid-column-start: 4;
          margin-top: 2rem;
        }
        .copyContainer {
          grid-column: 6/20;
          grid-row-start: 2;
        }
        .bodyCopy {
          margin-top: 13rem;
          width: 100%;
        }
      
        .modal {
          grid-template-columns: 1.5fr 4fr 1.5fr;
        }
        .modalContainer {
          width: 40%;
        }
      }
      @media screen and (max-width: 990px) {
        .imageContainer {
          grid-column: 1/16;
        }
        .artistImage {
          position: absolute;
          right: -175px;
          bottom: 100px;
        }
        .titleContainer {
          grid-column: 9 /24;
        }
        .display {
          display: unset;
          right: unset;
          grid-row-start: 2;
          grid-column-start: 4;
          margin-top: 2rem;
        }
        .copyContainer {
          grid-column: 6/20;
          grid-row-start: 2;
        }
        .bodyCopy {
          margin-top: 13rem;
          width: 100%;
        }
        .modalContainer {
          width: 45%;
        }
      }
      
      @media screen and (max-width: 760px) {
        .imageContainer {
          grid-column: 1/25;
        }
        .artistImage {
          width: 64px;
          right: unset;
          left: 0;
          bottom: -90px;
          z-index: 4;
        }
        .viewImage {
          bottom: unset;
          top: 30px;
        }
        .titleContainer {
          grid-column: 1 /22;
          grid-row-start: 2;
          width: 100%;
          margin-left: -1px;
          margin-top: -90px;
          padding: 20px;
        }
        .paintingName {
          font-size: 2.4rem;
          line-height: 29px;
          padding: 0 0 1rem 0;
        }
        .artistName {
          font-size: 1.5rem;
          padding: 0;
        }
      
        .display {
          position: unset;
          font-size: 100px;
          grid-column-start: 1;
          grid-column-end: 25;
          justify-self: end;
          line-height: 100px;
          margin-top: 7rem;
        }
        .copyContainer {
          grid-column: 1/25;
        }
        .bodyCopy {
          margin-top: 14rem;
          width: 100%;
        }
      
        .modalContainer {
          width: 45%;
        }
      }
      `}</style>
    </>
  );
}
