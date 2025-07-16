import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Carousel from "../../components/Carousel";
import getResults from "../../utils/cachedImages";
import cloudinary from "../../utils/cloudinary";
import getBase64ImageUrl from "../../utils/generateBlurPlaceholder";
import type { ImageProps } from "../../utils/types";

const Home: NextPage = ({ currentPhoto }: { currentPhoto: ImageProps }) => {
  const router = useRouter();
  const { photoId } = router.query;
  let index = Number(photoId);

  const currentPhotoUrl = currentPhoto.url;

  return (
    <>
      <Head>
        <title>Next.js Conf 2022 Photos</title>
        <meta property="og:image" content={currentPhotoUrl} />
        <meta name="twitter:image" content={currentPhotoUrl} />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        <Carousel currentPhoto={currentPhoto} index={index} />
      </main>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {

  const reducedResults: ImageProps[] = [];
  for (let i = 0; i < 5; i++) {
    reducedResults.push({
      id: i,
      height: "480", // Set to actual image height if known
      width: "720",  // Set to actual image width if known
      public_id: `mandelbrot_default_${i}`,
      format: "png",
      url: `${process.env.BASE_URL}/${process.env.BUCKET}/${process.env.IMAGE_PREFIX}${i}.png`,
    });
  }

  console.log("Reduced Results:", reducedResults);

  const currentPhoto = reducedResults.find(
    (img) => img.id === Number(context.params.photoId),
  );

  console.log("Current Photo:", currentPhoto);
  currentPhoto.blurDataUrl = await getBase64ImageUrl(currentPhoto);

  return {
    props: {
      currentPhoto: currentPhoto,
    },
  };
};

export async function getStaticPaths() {
  const reducedResults: ImageProps[] = [];
  for (let i = 0; i < 5; i++) {
    reducedResults.push({
      id: i,
      height: "480", // Set to actual image height if known
      width: "720",  // Set to actual image width if known
      public_id: `mandelbrot_default_${i}`,
      format: "png",
      url: `${process.env.BASE_URL}/${process.env.BUCKET}/${process.env.IMAGE_PREFIX}${i}.png`,
    });
  }

  const fullPaths = reducedResults.map((img) => ({
    params: { photoId: img.id.toString() },
  }));

  return {
    paths: fullPaths,
    fallback: false,
  };
}
