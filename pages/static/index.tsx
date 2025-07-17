import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import Modal from "../../components/Modal";
import getBase64ImageUrl from "../../utils/generateBlurPlaceholder";
import type { ImageProps } from "../../utils/types";
import { useLastViewedPhoto } from "../../utils/useLastViewedPhoto";
import { getImages } from "../../utils/getImages";

const StaticPage: NextPage<{ images: ImageProps[] }> = ({ images }) => {
    const router = useRouter();
    const { photoId } = router.query;
    const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();
    const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        if (lastViewedPhoto && !photoId) {
            lastViewedPhotoRef.current?.scrollIntoView({ block: "center" });
            setLastViewedPhoto(null);
        }
    }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

    return (
        <>
            <Head>
                <title>Static Gallery View</title>
            </Head>
            <main className="mx-auto max-w-[1960px] p-4">
                {photoId && (
                    <Modal
                        images={images}
                        onClose={() => {
                            setLastViewedPhoto(photoId);
                        }}
                    />
                )}
                <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
                    {images.map(({ id, blurDataUrl, url }) => (
                        <Link
                            key={id}
                            href={`/p/${id}`}
                            as={`/p/${id}`}
                            ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
                            shallow
                            className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
                        >
                            <Image
                                alt="Gallery photo"
                                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                                style={{ transform: "translate3d(0, 0, 0)" }}
                                placeholder="blur"
                                blurDataURL={blurDataUrl}
                                src={url}
                                width={720}
                                height={480}
                                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
                            />
                        </Link>
                    ))}
                </div>
            </main>
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const images: ImageProps[] = getImages(50, null);

    const blurImagePromises = images.map((image) => getBase64ImageUrl(image));
    const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

    for (let i = 0; i < images.length; i++) {
        images[i].blurDataUrl = imagesWithBlurDataUrls[i];
    }

    return {
        props: {
            images,
        },
    };
};

export default StaticPage;
