import type { ImageProps } from "../utils/types";

export const getImages = (): ImageProps[] => {
    const reducedResults: ImageProps[] = [];
    for (let i = 0; i < 50; i++) {
        reducedResults.push({
            id: i,
            height: "480", // Set to actual image height if known
            width: "720",  // Set to actual image width if known
            public_id: `mandelbrot_${i}`,
            format: "png",
            url: `${process.env.BASE_URL}/${process.env.BUCKET}/${process.env.IMAGE_PREFIX}${i}.png`,
        });
    }
    return reducedResults;
}
