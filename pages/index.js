import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import Layout from "../components/layout";
import Image from "next/image";
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
  const variants = {
    inital: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 1.5, type: "tween" } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <Layout home>
        <Head>
          <title>NextJs Galleria</title>
        </Head>
        <motion.section variants={variants} exit="exit" initial="inital" animate="animate" className="mainGallery">
          <div className="imageList">
            {allPostsData.map(({ id, images, name, artist }) => (
              <div key={id} className="listItem">
                <Link scroll={false} href={`/gallery/${id}`} passHref>
                  <a className="anchor">
                    <Image
                      className="imageItem"
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
                <div className="overlay"></div>
                <Link href={`/gallery/${id}`} passHref>
                  <div className="imageText">
                    <h2 className="paintingName">{name}</h2>
                    <p className="artistName header5">{artist.name}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </motion.section>
      </Layout>
      <style>{`
        .imageList {
          padding-top: 40px;
          display: column;
          column-count: 4;
          gap: 40px;
        }
        
        .imageList > * {
          break-inside: avoid;
        }
        
        .listItem {
          padding-bottom: 40px;
          position: relative;
        }
        
        .anchor:hover + .overlay {
            background: rgba(245,245,245,0.2);
          }
        
        
        .imageItem {
          align-self: start;
          width: 100%;
        }
        
        .overlay {
          pointer-events: none;
          position: absolute;
          top: 0;
          bottom: 40px;
          left: 0;
          right: 0;
          background: rgba(0,0,0,0.3);
        }
        
        .imageText {
          position: absolute;
          bottom: 70px;
          left: 40px;
          width: 80%;
          cursor: pointer;
        }
        
        .paintingName {
          color: white;
          padding-bottom: 8px;
        }
        
        .artistName {
          color: #e5e5e5;
        }
        
        .header5 {
          font-size: 1.3rem;
          font-family: "Libre Baskerville", serif;
          font-weight: 400;
          line-height: 17px;
        }
        
        @media screen and (max-width: 1280px) {
          .imageList {
            column-count: 3;
          }
        }
        @media screen and (max-width: 960px) {
          .imageList {
            column-count: 2;
          }
        }
        @media screen and (max-width: 660px) {
          .imageList {
            column-count: 1;
          }
        }
      `}</style>
    </>
  );
}
