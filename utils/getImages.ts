import type { ImageProps } from "../utils/types";
import data from "./data.json";

export const getImages = (count: number = 50, withImageId: number | null): ImageProps[] => {
    let reducedResults = getRandomImages(count);

    if (withImageId) {
        const image = getImageById(withImageId);
        if (image) {
            reducedResults.pop(); // Remove the last image if it exists
            reducedResults.push(image);
        }
    }

    return reducedResults;
}

export const getImageById = (id: number): ImageProps | undefined => {
    const name = `${process.env.IMAGE_PREFIX}_${id}.png`;

    const image = data.find((img: any) => img.file_name === name);

    if (!image) return undefined;

    return {
        id,
        height: "480",
        width: "720",
        public_id: image.file_name,
        format: "png",
        url: image.cdn_url ?? `${process.env.BASE_URL}/${process.env.BUCKET}/${process.env.IMAGE_PREFIX}_${id}.png`,
    } as ImageProps;
}

export const getRandomImages = (count: number): ImageProps[] => {
    const shuffled = data.sort(() => 0.5 - Math.random());

    const selected = shuffled.slice(0, count);

    let images: ImageProps[] = selected.map((img: any, idx: number) => ({
        id: img.id ?? idx,
        height: img.height ?? "480",
        width: img.width ?? "720",
        public_id: img.public_id ?? `mandelbrot_${img.id ?? idx}`,
        format: img.format ?? "png",
        url: img.cdn_url ?? `${process.env.BASE_URL}/${process.env.BUCKET}/${process.env.IMAGE_PREFIX}${img.id ?? idx}.png`,
    }));

    return images;
}
