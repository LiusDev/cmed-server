import * as sharp from "sharp";

export async function toWebp(data: string) {
    const imgData = data.substring(data.lastIndexOf(',') + 1);
    const featuredImageBuffer = await sharp(Buffer.from(imgData, "base64")).webp().toBuffer();
    return 'data:image/webp;base64,' + featuredImageBuffer.toString('base64');
}