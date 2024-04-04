import * as sharp from "sharp";
import type { ImagesService } from "./images/images.service";

export async function toWebpString(data: string) {

    return 'data:image/webp;base64,' + (await toWebp(data)).toString('base64');
}

export async function toWebp(data: string) {
    const imgData = data.substring(data.lastIndexOf(',') + 1);
    const featuredImageBuffer = await sharp(Buffer.from(imgData, "base64"), { failOnError: false }).webp().toBuffer();
    return featuredImageBuffer;
}

export function areArraysDifferent(arr1: string[], arr2: string[]): boolean {
    if (arr1.length !== arr2.length) {
        return true;
    }

    const sortedArr1 = arr1.slice().sort();
    const sortedArr2 = arr2.slice().sort();

    for (let i = 0; i < sortedArr1.length; i++) {
        if (sortedArr1[i] !== sortedArr2[i]) {
            return true;
        }
    }

    return false;
}

export function deleteImages<T extends Object>(images: Array<keyof T>, object: T, imagesService: ImagesService) {
    const filtedImages = images.filter(i => (object[i] as string).startsWith("https://res.cloudinary.com/"))
    if (filtedImages.length == 0) return Promise.resolve();
    return imagesService.deleteImage(...filtedImages.map(i => object[i] as string));
}

export function updateImage<T extends Object>(images: { [key in keyof T]?: string }, object: T, imagesService: ImagesService) {
    const deleteImages = Array<string>();
    const tasks = Array<Promise<void>>();
    for (const key in images) {
        const image = images[key];
        if (image.startsWith("data:image/")) {
            deleteImages.push(object[key] as string);
            tasks.push(imagesService.uploadBase64Image("images", image).then(r => {
                object[key] = r.secure_url as any;
            }))
        }
    }
    if (deleteImages.length > 0)
        tasks.push(imagesService.deleteImage(...deleteImages));
    return Promise.all(tasks);
}
