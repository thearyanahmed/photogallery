import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";

const cache = new Map();

export default async function getBase64ImageUrl(
  image: { url: string }, // now using direct image URL from DigitalOcean Spaces CDN
): Promise<string> {
  const cached = cache.get(image.url);
  if (cached) return cached;

  try {
    const response = await fetch(image.url);
    const buffer = await response.arrayBuffer();

    const minified = await imagemin.buffer(Buffer.from(buffer), {
      plugins: [imageminJpegtran({ quality: 10 })], // very low quality = blur
    });

    const url = `data:image/jpeg;base64,${Buffer.from(minified).toString("base64")}`;
    cache.set(image.url, url);
    return url;
  } catch {
    // fallback: blurred black 1x1 JPEG
    return `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDABALDA4MChAODxARDxYTFBYWFxYdHR8hJSQiIycnKywsKjFHR0ZDPk5XRUZhbGlXb2RraHdzfYB+goiSkJWWlpef/2wBDARARERUUHxgfICAhKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDAREAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAECBf/EABcBAQEBAQAAAAAAAAAAAAAAAAIBAwT/2gAMAwEAAhADEAAAAIv/AP/EABYRAQEBAAAAAAAAAAAAAAAAAAEQEf/aAAgBAQABBQKsf//EABURAQEAAAAAAAAAAAAAAAAAABAR/9oACAEDAQE/Aaf/xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAECAQE/AV//xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAY/Ah//xAAcEAACAgIDAAAAAAAAAAAAAAABEQAhMUEQgfD/2gAIAQEAAT8hr4mL9ihkEZ2zT4kYr/9oADAMBAAIAAwAAABDz/8QAFxEBAQEBAAAAAAAAAAAAAAAAAQAxEf/aAAgBAwEBPxBM4//EABURAQEAAAAAAAAAAAAAAAAAABAR/9oACAEDAQE/EAn/xAAeEAEAAgICAwEAAAAAAAAAAAABABEhMUFRYYGR8f/aAAgBAQABPxC4dXU2TS+hd6AAUChOB4S2nYkJG2WyT//Z`;
  }
}


// export default async function getBase64ImageUrlBackup(
//   image: ImageProps,
// ): Promise<string> {
//   let url = cache.get(image);
//   if (url) {
//     return url;
//   }
//   const response = await fetch(
//     `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_jpg,w_8,q_70/${image.public_id}.${image.format}`,
//   );
//   const buffer = await response.arrayBuffer();
//   const minified = await imagemin.buffer(Buffer.from(buffer), {
//     plugins: [imageminJpegtran()],
//   });

//   url = `data:image/jpeg;base64,${Buffer.from(minified).toString("base64")}`;
//   cache.set(image, url);
//   return url;
// }
