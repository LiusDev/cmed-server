import * as sharp from "sharp";

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
